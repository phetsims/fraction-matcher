// Copyright 2002-2013, University of Colorado Boulder

/**
 * Ninja star shape graph for the 'Build a Fraction' sim.
 * Denominator should be 8 or 10.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    AbstractShape = require( 'FRACTION_COMMON/shapes/AbstractShape' ),
    Path = require( 'SCENERY/nodes/Path' ),
    Shape = require( 'KITE/Shape' ),
    angle8 = Math.PI * 2 / 8,
    angle10 = Math.PI * 2 / 10;

  var patterns = {
    fourPoint: [
      {x: -Math.sin( 0 ), y: -Math.cos( 0 )},
      {x: -Math.sin( angle8 ) / 2, y: -Math.cos( angle8 ) / 2},
      {x: -Math.sin( 2 * angle8 ), y: -Math.cos( 2 * angle8 )},
      {x: -Math.sin( 3 * angle8 ) / 2, y: -Math.cos( 3 * angle8 ) / 2},
      {x: -Math.sin( 4 * angle8 ), y: -Math.cos( 4 * angle8 )},
      {x: -Math.sin( 5 * angle8 ) / 2, y: -Math.cos( 5 * angle8 ) / 2},
      {x: -Math.sin( 6 * angle8 ), y: -Math.cos( 6 * angle8 )},
      {x: -Math.sin( 7 * angle8 ) / 2, y: -Math.cos( 7 * angle8 ) / 2}
    ],
    fivePoint: [
      {x: -Math.sin( angle10 ) / 2, y: -Math.cos( angle10 ) / 2},
      {x: -Math.sin( 2 * angle10 ), y: -Math.cos( 2 * angle10 )},
      {x: -Math.sin( 3 * angle10 ) / 2, y: -Math.cos( 3 * angle10 ) / 2},
      {x: -Math.sin( 4 * angle10 ), y: -Math.cos( 4 * angle10 )},
      {x: -Math.sin( 5 * angle10 ) / 2, y: -Math.cos( 5 * angle10 ) / 2},
      {x: -Math.sin( 6 * angle10 ), y: -Math.cos( 6 * angle10 )},
      {x: -Math.sin( 7 * angle10 ) / 2, y: -Math.cos( 7 * angle10 ) / 2},
      {x: -Math.sin( 8 * angle10 ), y: -Math.cos( 8 * angle10 )},
      {x: -Math.sin( 9 * angle10 ) / 2, y: -Math.cos( 9 * angle10 ) / 2},
      {x: -Math.sin( 0 ), y: -Math.cos( 0 )}
    ]
  };

  function NinjaStarShape( options ) {
    var max,
      diameter,
      size,
      pattern,
      denominator,
      numerator,
      pieces = [];

    AbstractShape.call( this, options );
    options = this.options;
    denominator = options.denominator;
    numerator = options.numerator;

    // determine pattern
    if ( denominator === 8 ) {
      pattern = patterns.fourPoint;
    }
    else if ( denominator === 10 ) {
      pattern = patterns.fivePoint;
    }

    // determine diameter of shape
    diameter = Math.min( options.width, options.height );
    size = diameter / 2;
    max = denominator * Math.ceil( numerator / denominator );

    for ( var i = 0, len = max / denominator; i < len; i++ ) {
      pieces[i] = [];
    }

    // create pieces and add them to temporary array
    for ( i = 0, len = max; i < len; i++ ) {
      // TODO: stroke
      pieces[Math.floor( i / denominator )].unshift( new Path( this.getPiece( size, pattern[i % denominator], pattern[(i + 1) % denominator] ), {
        fill: 'white', stroke: options.stroke, lineWidth: 1
      } ) );
    }

    // add letters to node
    this.arrayToShapes( pieces, size / 8 );
    this.setTranslation( -options.width / 4 * (pieces.length > 1 ? 1 : 0), 0 );
  }

  return inherit( AbstractShape, NinjaStarShape, {
    getPiece: function( size, p1, p2 ) {
      return this.pointsToShape( new Shape(), [
        {x: 0, y: 0},
        p1,
        p2
      ], size );
    }
  } );
} );
