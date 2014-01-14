// Copyright 2002-2013, University of Colorado Boulder

/**
 * Polygon shape graph for the 'Build a Fraction' sim.
 * Create a polygon with the specified number of sides.
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

  function Polygon( options ) {
    var max,
      diameter,
      triAngle,
      denominator,
      numerator,
      pieces = [];

    AbstractShape.call( this, options );
    options = this.options;
    denominator = options.denominator;
    numerator = options.numerator;

    // determine diameter of shape
    diameter = Math.min( options.width, options.height );
    triAngle = Math.PI * 2 / denominator;

    max = denominator * Math.ceil( numerator / denominator );

    for ( var i = 0, len = max / denominator, j; i < len; i++ ) {
      pieces[i] = [];
    }

    // create pieces and add them to temporary array
    for ( i = 0, len = max; i < len; i++ ) {
      // TODO: stroke
      j = i + max / (2 * pieces.length);
      pieces[Math.floor( i / denominator )].push( new Path( this.getPiece( diameter / 2, triAngle * (j - 0.5), triAngle * (j + 0.5) ), {
        fill: 'white', stroke: options.stroke, lineWidth: 1
      } ) );
    }

    // add letters to node
    this.arrayToShapes( pieces, diameter / 10 );
    this.setTranslation( -options.width / 4 * (pieces.length > 1 ? 1 : 0), 0 );
  }

  return inherit( AbstractShape, Polygon, {
    getPiece: function( size, startAngle, endAngle ) {
      return this.pointsToShape( new Shape(), [
        {x: 0, y: 0},
        {x: -Math.sin( startAngle ), y: -Math.cos( startAngle )},
        {x: -Math.sin( endAngle ), y: -Math.cos( endAngle )}
      ], size );
    }
  } );
} );
