// Copyright 2002-2013, University of Colorado Boulder

/**
 * Ring of hexagons shape graph for the 'Build a Fraction' sim.
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

  function RingOfHexagonsShape( options ) {
    var max,
      diameter,
      size,
      angle,
      denominator,
      numerator,
      pieces = [],
      map;

    AbstractShape.call( this, options );
    options = this.options;
    denominator = options.denominator;
    numerator = options.numerator;

    // determine diameter of shape
    diameter = Math.min( options.width, options.height );
    angle = Math.PI * 2 / 6;

    max = denominator * Math.ceil( numerator / denominator );

    for ( var i = 0, len = max / denominator; i < len; i++ ) {
      pieces[i] = [];
    }

    size = diameter / 5;
    map = [
      {x: 0, y: 0},
      {x: -Math.sin( 0 ), y: -Math.cos( 0 )},
      {x: -Math.sin( angle ), y: -Math.cos( angle )},
      {x: -Math.sin( 2 * angle ), y: -Math.cos( 2 * angle )},
      {x: -Math.sin( 3 * angle ), y: -Math.cos( 3 * angle )},
      {x: -Math.sin( 4 * angle ), y: -Math.cos( 4 * angle )},
      {x: -Math.sin( 5 * angle ), y: -Math.cos( 5 * angle )}
    ];

    // create pieces and add them to temporary array
    for ( i = 1, len = max; i < len + 1; i++ ) {
      // TODO: stroke
      pieces[Math.floor( (i - 1) / denominator )].push( new Path( this.getPiece( size, angle ), {
        x: map[i % 7].x * Math.sqrt( 3 ) * size, y: map[i % 7].y * Math.sqrt( 3 ) * size, fill: 'white', stroke: options.stroke, lineWidth: 1
      } ) );
    }

    // add letters to node
    this.arrayToShapes( pieces, size / 2 );
  }

  return inherit( AbstractShape, RingOfHexagonsShape, {
    getPiece: function( size, angle ) {
      return this.pointsToShape( new Shape(), [
        {x: -Math.sin( angle / 2 ), y: -Math.cos( angle / 2 )},
        {x: -Math.sin( 3 * angle / 2 ), y: -Math.cos( 3 * angle / 2 )},
        {x: -Math.sin( 5 * angle / 2 ), y: -Math.cos( 5 * angle / 2 )},
        {x: -Math.sin( 7 * angle / 2 ), y: -Math.cos( 7 * angle / 2 )},
        {x: -Math.sin( 9 * angle / 2 ), y: -Math.cos( 9 * angle / 2 )},
        {x: -Math.sin( 11 * angle / 2 ), y: -Math.cos( 11 * angle / 2 )},
        {x: -Math.sin( 13 * angle / 2 ), y: -Math.cos( 13 * angle / 2 )}
      ], size );
    }
  } );
} );
