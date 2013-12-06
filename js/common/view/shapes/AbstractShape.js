// Copyright 2002-2013, University of Colorado Boulder

/**
 * Abstract shape for the 'Fraction Matcher' screen.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' );

  function AbstractShape( options ) {
    options = _.extend( {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        numerator: 1,  // numerator / denominator
        denominator: 1, // numerator <= denominator
        fill: "#F00",
        freeFill: "#FFF",
        fillType: 'SEQUENTIAL',
        stroke: "#000"
      },
      options );
    Node.call( this, {x: options.x, y: options.y} );
    this.options = options;
  }

  return inherit( Node, AbstractShape, {
    // function for drawing shapes
    pointsToShape: function( s, array, size ) {
      size = size || 1;
      for ( var i = 0; i < array.length; i++ ) {
        s.lineTo( array[i].x * size, array[i].y * size );
      }
      s.close();
      return s;
    },
    // fill shapes depending on fillType value
    fillShapes: function( arrays ) {
      var filled = 0, i = 0, j = 0, len1 = arrays.length, len2 = arrays[0].length;

      while ( filled < this.options.numerator ) {
        if ( this.options.fillType === 'SEQUENTIAL' ) {
          arrays[Math.floor( i / len2 ) % len1][i++ % len2].fill = this.options.fill;
          filled++;
        }
        else if ( this.options.fillType === 'MIXED' ) {
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
        else if ( this.options.fillType === 'RANDOM' ) {
          i = _.random( len1 - 1 );
          j = _.random( len2 - 1 );
          if ( arrays[i][j].fill === 'white' ) {
            arrays[i][j].fill = this.options.fill;
            filled++;
          }
        }
      }
    },
    // convert array to shapes and add them to main container
    arrayToShapes: function( array, offset ) {
      var nodes = this.getNodesFromArray( array );
      this.fillShapes( array );
      this.addNodes( nodes, offset );
    },
    // add nodes to main container
    addNodes: function( nodes, offset ) {
      var self = this;
      nodes.forEach( function( node, i ) {
        node.setX( (i ? i * nodes[i - 1].getWidth() : 0) + (nodes.length === 2 ? (i - 0.5) * offset : 0) );
        self.addChild( node );
      } );

      this.scale( 1 / nodes.length, 1 / nodes.length );
    },
    // convert array to nodes
    getNodesFromArray: function( array ) {
      var nodes = [];
      for ( var i = 0, j; i < array.length; i++ ) {
        nodes[i] = new Node();
        for ( j = 0; j < array[i].length; j++ ) {
          nodes[i].addChild( array[i][j] );
        }
      }
      return nodes;
    }
  } );
} );
