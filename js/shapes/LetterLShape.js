// Copyright 2002-2013, University of Colorado Boulder

/**
 * Letter L shape graph for the 'Build a Fraction' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  "use strict";

  // imports
  var inherit = require( "PHET_CORE/inherit" ),
    AbstractShape = require( 'FRACTION_COMMON/shapes/AbstractShape' ),
    Path = require( 'SCENERY/nodes/Path' ),
    Shape = require( 'KITE/Shape' );

  function LetterLShape( options ) {
    var w,
      h,
      max,
      size,
      denominator,
      numerator,
      diameter,
      pieces = [];

    AbstractShape.call( this, options );
    options = this.options;
    denominator = options.denominator;
    numerator = options.numerator;

    // determine size of shape
    max = denominator * Math.ceil( numerator / denominator );
    w = options.width * 4 / max;
    h = options.height / this.getYCoeff( denominator );
    diameter = Math.min( w, h );
    size = diameter * Math.ceil( numerator / denominator ) / 4;

    // init arrays for shapes
    for ( var i = 0, j; i < Math.ceil( numerator / denominator ); i++ ) {
      pieces[i] = [];
    }

    // TODO: stroke
    // create letter L and add them to temporary array
    for ( i = 0; i < pieces.length; i++ ) {
      for ( j = 0; j < denominator / 2; j++ ) {
        pieces[i].push( new Path( this.getPiece( size, 'top' ), {
          x: j * 2 * size, y: j * size, fill: 'white', stroke: options.stroke, lineWidth: 1
        } ) );
        pieces[i].push( new Path( this.getPiece( size, 'bottom' ), {
          x: j * 2 * size, y: j * size, fill: 'white', stroke: options.stroke, lineWidth: 1
        } ) );
      }
    }

    // add letters to node
    this.arrayToShapes( pieces, size / 2 );
  }

  var shapeDefinition = {
    top: [
      {x: 0, y: 0},
      {x: 2, y: 0},
      {x: 2, y: 3},
      {x: 1, y: 3},
      {x: 1, y: 1},
      {x: 0, y: 1},
      {x: 0, y: 0}
    ],
    bottom: [
      {x: 0, y: 1},
      {x: 1, y: 1},
      {x: 1, y: 3},
      {x: 2, y: 3},
      {x: 2, y: 4},
      {x: 0, y: 4},
      {x: 0, y: 1}
    ]
  };

  return inherit( AbstractShape, LetterLShape, {
    getPiece: function( size, orientation ) {
      return this.pointsToShape( new Shape(), shapeDefinition[orientation], size );
    },
    getYCoeff: function( d ) {
      return (d >= 7 ? 7 / 4 :
              d >= 5 ? 6 / 4 :
              d >= 3 ? 5 / 4 : 1);
    }
  } );
} );
