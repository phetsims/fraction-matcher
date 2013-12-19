// Copyright 2002-2013, University of Colorado Boulder

/**
 * Rectangle with vertical lines shape graph for the 'Build a Fraction' sim.
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

  function VRectangleShape( options ) {
    var pieces = [],
      denominator,
      numerator,
      size;

    AbstractShape.call( this, options );
    options = this.options;
    denominator = options.denominator;
    numerator = options.numerator;

    // init arrays for shapes
    for ( var i = 0, j, len; i < Math.ceil( numerator / denominator ); i++ ) {
      pieces[i] = [];
    }

    // create pieces and add them to created array
    len = (options.onlyPiece ? numerator : denominator);
    for ( i = 0; i < pieces.length; i++ ) {
      for ( j = 0; j < len; j++ ) {
        pieces[i].push( new Path( this.getPiece( options.width / denominator,  options.height ), {
          x: j / denominator * options.width, fill: 'white', stroke: options.stroke, lineWidth: 1
        } ) );
      }
    }

    // add shapes to node
    this.arrayToShapes( pieces, options.width / 4 );
    this.setTranslation( -options.width / 2, -options.height / (2 * pieces.length) );
  }

  return inherit( AbstractShape, VRectangleShape, {
    getPiece: function( width, height ) {
      return new Shape.rect( 0, 0, width, height );
    }
  } );
} );
