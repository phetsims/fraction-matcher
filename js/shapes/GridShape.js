// Copyright 2002-2013, University of Colorado Boulder

/**
 * Grid shape graph for the 'Build a Fraction' sim.
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

  function GridShape( options ) {
    var d,
      diameter,
      size,
      denominator,
      numerator,
      pieces = [];

    AbstractShape.call( this, options );
    options = this.options;
    denominator = options.denominator;
    numerator = options.numerator;

    // determine diameter of shape
    diameter = Math.min( options.width, options.height ); // diameter of container to fill
    d = Math.sqrt( denominator ); // dimension of grid
    size = diameter / d; // size of one piece

    // init arrays for shapes
    for ( var i = 0, j; i < Math.ceil( numerator / denominator ); i++ ) {
      pieces[i] = [];
    }

    // TODO: stroke
    // create pieces and add them to created array
    for ( i = 0; i < pieces.length; i++ ) {
      for ( j = 0; j < denominator; j++ ) {
        pieces[i].push( new Path( this.getPiece( size ), {
          x: j % d * size, y: Math.floor( j / d ) * size, fill: 'white', stroke: options.stroke, lineWidth: 1
        } ) );
      }
    }

    // add letters to node
    this.arrayToShapes( pieces, size / 2 );
  }

  return inherit( AbstractShape, GridShape, {
    getPiece: function( size ) {
      return this.pointsToShape( new Shape(), [
        {x: 0, y: 0},
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 1, y: 0},
        {x: 0, y: 0}
      ], size );
    }
  } );
} );
