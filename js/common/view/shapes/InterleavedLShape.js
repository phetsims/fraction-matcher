// Copyright 2002-2013, University of Colorado Boulder

/**
 * Interleaved L shape graph for the 'Fraction Matcher' screen.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  "use strict";

  // imports
  var inherit = require( "PHET_CORE/inherit" );
  var AbstractShape = require( 'common/view/shapes/AbstractShape' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  function InterleavedLShape( options ) {
    var max,
      d,
      diameter,
      size,
      denominator,
      numerator,
      pieces = [];

    AbstractShape.call( this, options );
    options = this.options;
    denominator = options.denominator;
    numerator = options.numerator;

    // determine diameter of shape
    diameter = Math.min( options.width, options.height );
    max = denominator * Math.ceil( numerator / denominator );
    d = denominator / 2; // dimension of grid
    size = diameter / d; // size of one piece

    for ( var i = 0, len = max / denominator, j; i < len; i++ ) {
      pieces[i] = [];
    }

    // TODO: stroke
    // create pieces and add them to temporary array
    for ( i = 0; i < pieces.length; i++ ) {
      for ( j = 0; j < denominator / 2; j++ ) {
        pieces[i].push( new Path( this.getPiece( size, 'left' ), {
          x: j * size, fill: 'white', stroke: options.stroke, lineWidth: 1
        } ) );
        pieces[i].push( new Path( this.getPiece( size, 'right' ), {
          x: j * size, fill: 'white', stroke: options.stroke, lineWidth: 1
        } ) );
      }
    }

    // add shapes to node
    this.arrayToShapes( pieces, size / 4 );
    this.setTranslation( -options.width / 2, -options.height / denominator );
  }

  var map = {
    left: [
      {x: 0, y: 0},
      {x: 1 / 3, y: 0},
      {x: 1 / 3, y: 1 / 2},
      {x: 2 / 3, y: 1 / 2},
      {x: 2 / 3, y: 1},
      {x: 0, y: 1},
      {x: 0, y: 0}
    ],
    right: [
      {x: 1, y: 0},
      {x: 1, y: 1},
      {x: 2 / 3, y: 1},
      {x: 2 / 3, y: 1 / 2},
      {x: 1 / 3, y: 1 / 2},
      {x: 1 / 3, y: 0},
      {x: 1, y: 0}
    ]
  };

  return inherit( AbstractShape, InterleavedLShape, {
    getPiece: function( size, type ) {
      return this.pointsToShape( new Shape(), map[type], size );
    }
  } );
} );
