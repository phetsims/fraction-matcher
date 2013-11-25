// Copyright 2002-2013, University of Colorado Boulder

/**
 * Abstract shape for the 'Fraction Matcher' screen.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  "use strict";

  // imports
  var inherit = require( "PHET_CORE/inherit" );
  var Node = require( "SCENERY/nodes/Node" );

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
    // function for painting shapes
    pointsToShape: function( s, array, size ) {
      size = size || 1;
      for ( var i = 0; i < array.length; i++ ) {
        s.lineTo( array[i].x * size, array[i].y * size );
      }
      return s;
    },
    // function for shuffling arrays
    shuffle: function( arr ) {
      return arr.sort( function() {return Math.random() - 0.5;} );
    }
  } );
} );
