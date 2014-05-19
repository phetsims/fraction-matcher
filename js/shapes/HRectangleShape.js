// Copyright 2002-2014, University of Colorado Boulder

/**
 * Rectangle with horizontal lines shape graph for the 'Fractions' sim.
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

  function HRectangleShape( options ) {
    var pieces = [],
      denominator,
      numerator;

    AbstractShape.call( this, options );
    options = this.options;
    denominator = options.denominator;
    numerator = Math.max( 1, options.numerator ); //if numerator 0, we still want shape, but not filled


    // init arrays for shapes
    for ( var i = 0, j; i < Math.ceil( numerator / denominator ); i++ ) {
      pieces[i] = [];
    }

    // TODO: stroke
    // create pieces and add them to created array
    var len = (options.onlyPiece ? numerator : denominator);
    for ( i = 0; i < pieces.length; i++ ) {
      for ( j = 0; j < len; j++ ) {
        pieces[i].push( new Path( this.getPiece( options.width, options.height / denominator ), {
          y: (denominator - j - 1) / denominator * options.height, fill: 'white', stroke: options.stroke, lineWidth: 1
        } ) );
      }
    }

    // add shapes to node
    this.arrayToShapes( pieces, options.height / 4 );
  }

  return inherit( AbstractShape, HRectangleShape, {
    getPiece: function( width, height ) {
      return new Shape.rect( 0, 0, width, height );
    }
  } );
} );
