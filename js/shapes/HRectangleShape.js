// Copyright 2002-2013, University of Colorado Boulder

/**
 * Rectangle with horizontal lines shape graph for the 'Build a Fraction' sim.
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
    this.setTranslation( -this.width / 2, -this.height / (2 * pieces.length) );
  }

  return inherit( AbstractShape, HRectangleShape, {
    getPiece: function( width, height ) {
      return new Shape.rect( 0, 0, width, height );
    }
  } );
} );
