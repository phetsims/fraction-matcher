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

  function TetrisPieceShape( options ) {
    var max,
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
    diameter = Math.min( options.width, options.height );
    max = denominator * Math.ceil( numerator / denominator );
    size = diameter / 4;

    for ( var i = 0, len = max / denominator; i < len; i++ ) {
      pieces[i] = [];
    }

    // create pieces and add them to temporary array
    for ( i = 0, len = max; i < len; i++ ) {
      // TODO: stroke
      pieces[Math.floor( i / denominator )].push( new Path( this.getPiece( size, i % 4 ), {
        fill: 'white', stroke: options.stroke, lineWidth: 1
      } ) );
    }

    // add letters to node
    this.arrayToShapes( pieces, size );
    this.setTranslation( -options.width / 2, -options.height / 4 * (pieces.length > 1 ? 1 : 2) );
  }

  var map = [
    [
      {x: 0, y: 0},
      {x: 3, y: 0},
      {x: 3, y: 1},
      {x: 2, y: 1},
      {x: 2, y: 2},
      {x: 1, y: 2},
      {x: 1, y: 1},
      {x: 0, y: 1},
      {x: 0, y: 0}
    ],
    [
      {x: 3, y: 0},
      {x: 4, y: 0},
      {x: 4, y: 3},
      {x: 3, y: 3},
      {x: 3, y: 2},
      {x: 2, y: 2},
      {x: 2, y: 1},
      {x: 3, y: 1},
      {x: 3, y: 0}
    ],
    [
      {x: 4, y: 3},
      {x: 4, y: 4},
      {x: 1, y: 4},
      {x: 1, y: 3},
      {x: 2, y: 3},
      {x: 2, y: 2},
      {x: 3, y: 2},
      {x: 3, y: 3},
      {x: 4, y: 3}
    ],
    [
      {x: 0, y: 4},
      {x: 0, y: 1},
      {x: 1, y: 1},
      {x: 1, y: 2},
      {x: 2, y: 2},
      {x: 2, y: 3},
      {x: 1, y: 3},
      {x: 1, y: 4},
      {x: 0, y: 4}
    ]
  ];

  return inherit( AbstractShape, TetrisPieceShape, {
    getPiece: function( size, i ) {
      return this.pointsToShape( new Shape(), map[i], size );
    }
  } );
} );
