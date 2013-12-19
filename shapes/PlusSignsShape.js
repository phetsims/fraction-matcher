// Copyright 2002-2013, University of Colorado Boulder

/**
 * Plus sign view for 'Build a Fraction' sim.
 * Only for fractions with denominator equal to 6.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    AbstractShape = require( 'FRACTION_COMMON/shapes/AbstractShape' ),
    Path = require( 'SCENERY/nodes/Path' ),
    Shape = require( 'KITE/Shape' );

  function PlusSignsShape( options ) {
    var w,
      h,
      size,
      denominator,
      numerator,
      pieces = [];

    AbstractShape.call( this, options );
    options = this.options;
    denominator = options.denominator;
    numerator = options.numerator;

    // determine size of shape
    w = options.width / 16;
    h = options.height / 14;
    size = Math.min( w, h );

    // init arrays for shapes
    for ( var i = 0, j; i < Math.ceil( numerator / denominator ); i++ ) {
      pieces[i] = [];
    }

    // TODO: stroke
    // create plus signs and add them to temporary array
    for ( i = 0; i < pieces.length; i++ ) {
      for ( j = 0; j < denominator / 2; j++ ) {
        pieces[i].push( new Path( this.getPiece( size ), {
          x: 4 * size * j, y: 2 * size * j, fill: 'white', stroke: options.stroke, lineWidth: 1
        } ) );
        pieces[i].push( new Path( this.getPiece( size ), {
          x: (4 * j + 2) * size, y: (2 * j - 4) * size, fill: 'white', stroke: options.stroke, lineWidth: 1
        } ) );
      }
    }

    // add pluses to node
    this.arrayToShapes( pieces, size );
    this.setTranslation( -Math.max( 0, w - h ) - options.width / (9 / 2 - pieces.length), Math.max( 0, h - w ) / 2 );
  }

  var plusSignPattern = [
    {x: 1, y: 1},
    {x: 3, y: 1},
    {x: 3, y: -1},
    {x: 1, y: -1},
    {x: 1, y: -3},
    {x: -1, y: -3},
    {x: -1, y: -1},
    {x: -3, y: -1},
    {x: -3, y: 1},
    {x: -1, y: 1},
    {x: -1, y: 3},
    {x: 1, y: 3},
    {x: 1, y: 1}
  ];

  return inherit( AbstractShape, PlusSignsShape, {
    getPiece: function( size ) {
      return this.pointsToShape( new Shape(), plusSignPattern, size );
    }
  } );
} );
