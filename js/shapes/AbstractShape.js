// Copyright 2002-2014, University of Colorado Boulder

/**
 * Abstract shape for the 'Build a Fraction' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  "use strict";

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var FILL_TYPE = require( 'FRACTION_COMMON/FillType' );

  function AbstractShape( options ) {
    options = _.extend( {
        fillType: FILL_TYPE.SEQUENTIAL
      },
      options );
    HBox.call( this, {resize: false, x: options.x, y: options.y} );
    this.options = options;

    //created all paths from pattern, fill with colors and add to container
    this.arrayToShapes( options.createdPaths.shapes, options.createdPaths.margin, options.createdPaths.outlines );

  }

  return inherit( HBox, AbstractShape, {
    // fill shapes depending on fillType value
    fillShapes: function( arrays ) {
      if ( arrays.length ) {
        var filled = 0, i = 0, j = 0, len1 = arrays.length, len2 = arrays[0].length;

        while ( filled < this.options.numerator ) {
          if ( this.options.fillType === FILL_TYPE.SEQUENTIAL ) {
            arrays[Math.floor( i / len2 ) % len1][i++ % len2].fill = this.options.fill;
            filled++;
          }
          else if ( this.options.fillType === FILL_TYPE.MIXED ) {
            if ( filled < len2 ) {
              arrays[Math.floor( i / len2 ) % len1][i++ % len2].fill = this.options.fill;
              filled++;
            }
            else {
              i = _.random( 1, len1 - 1 );
              j = _.random( len2 - 1 );
              if ( arrays[i][j].fill === 'white' ) {
                arrays[i][j].fill = this.options.fill;
                filled++;
              }
            }
          }
          else if ( this.options.fillType === FILL_TYPE.RANDOM ) {
            i = _.random( len1 - 1 );
            j = _.random( len2 - 1 );
            if ( arrays[i][j].fill === 'white' ) {
              arrays[i][j].fill = this.options.fill;
              filled++;
            }
          }
        }
      }
    },
    // convert array to shapes and add them to main container
    arrayToShapes: function( array, offset, outlines ) {
      this.fillShapes( array );
      var nodes = this.getNodesFromArray( array, outlines );
      this.addNodes( nodes, offset );
    },
    // add nodes to main container
    addNodes: function( nodes, offset ) {
      var self = this,
        scaleFactor;

      // set spacing
      self.options.spacing = function() { return offset; };

      // add nodes
      nodes.forEach( function( node ) {
        self.addChild( node );
      } );

      // update layout
      self.updateLayout();

      // fit the size of shapes
      scaleFactor = Math.min( this.options.width / this.getWidth(), this.options.height / this.getHeight() );
      this.scale( scaleFactor );
      this.centerX = 0;
      this.centerY = 0;
    },
    // convert array to nodes
    getNodesFromArray: function( array, outlines ) {
      var nodes = [];
      for ( var i = 0, j; i < array.length; i++ ) {
        nodes[i] = new Node();
        for ( j = 0; j < array[i].length; j++ ) {
          nodes[i].addChild( array[i][j] );
        }
        if ( outlines ) {
          nodes[i].addChild( outlines[i] );
        }
      }
      return nodes;
    }
  } );
} );
