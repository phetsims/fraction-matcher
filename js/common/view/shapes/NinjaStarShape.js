// Copyright 2002-2013, University of Colorado Boulder

/**
 * Ninja star shape graph for the 'Fraction Matcher' screen.
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

  function NinjaStarShape( options ) {
    var max,
      diameter,
      size,
      angle,
      denominator,
      numerator,
      pieces = [];

    AbstractShape.call( this, options );
    options = this.options;
    denominator = options.denominator;
    numerator = options.numerator;

    // determine diameter of shape
    diameter = Math.min( options.width, options.height );
    angle = Math.PI * 2 / 8;

    max = denominator * Math.ceil( numerator / denominator );

    for ( var i = 0, len = max / denominator; i < len; i++ ) {
      pieces[i] = [];
    }

    size = diameter / 2;
    var map = [
      {x: -Math.sin( 0 ), y: -Math.cos( 0 )},
      {x: -Math.sin( angle ) / 2, y: -Math.cos( angle ) / 2},
      {x: -Math.sin( 2 * angle ), y: -Math.cos( 2 * angle )},
      {x: -Math.sin( 3 * angle ) / 2, y: -Math.cos( 3 * angle ) / 2},
      {x: -Math.sin( 4 * angle ), y: -Math.cos( 4 * angle )},
      {x: -Math.sin( 5 * angle ) / 2, y: -Math.cos( 5 * angle ) / 2},
      {x: -Math.sin( 6 * angle ), y: -Math.cos( 6 * angle )},
      {x: -Math.sin( 7 * angle ) / 2, y: -Math.cos( 7 * angle ) / 2}
    ];

    // create pieces and add them to temporary array
    for ( i = 0, len = max; i < len; i++ ) {
      // TODO: stroke
      pieces[Math.floor( i / denominator )].push( new Path( this.getPiece( size, map[i % 8], map[(i + 1) % 8] ), {
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
