// Copyright 2002-2014, University of Colorado Boulder

/**
 * Flower shape graph for the 'Fractions' sim.
 * Creates a flower with 6 petals.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  "use strict";

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var AbstractShape = require( 'FRACTION_COMMON/shapes/AbstractShape' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  function FlowerShape( options ) {
    var max,
      diameter,
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
    angle = Math.PI * 2 / 6;

    max = denominator * Math.ceil( numerator / denominator );

    for ( var i = 0, len = max / denominator; i < len; i++ ) {
      pieces[i] = [];
    }

    var borderPoints = [];
    for ( i = 0; i < 6; i++ ) {
      borderPoints.push( {x: -Math.sin( angle * (i - 1 / 2) ) / 2, y: -Math.cos( angle * (i - 1 / 2) ) / 2} );
      borderPoints.push( {x: -Math.sin( angle * i ), y: -Math.cos( angle * i )} );
    }

    // create pieces
    for ( i = 0, len = max; i < len; i++ ) {
      pieces[Math.floor( i / denominator )].push( new Path( this.getPiece( diameter / 2, angle, i ), {
        fill: 'white', stroke: options.stroke, lineWidth: 1
      } ) );
    }

    // add to node
    this.arrayToShapes( pieces, diameter / 10 );

  }

  return inherit( AbstractShape, FlowerShape, {
    getPiece: function( size, angle, i ) {
      i = i + 3;
      return this.pointsToShape( new Shape(), [
        {x: 0, y: 0},
        {x: -Math.sin( angle * (i - 1 / 2) ) / 2, y: -Math.cos( angle * (i - 1 / 2) ) / 2},
        {x: -Math.sin( angle * i ), y: -Math.cos( angle * i )},
        {x: -Math.sin( angle * (i + 1 / 2) ) / 2, y: -Math.cos( angle * (i + 1 / 2) ) / 2}
      ], size );
    }
  } );
} );
