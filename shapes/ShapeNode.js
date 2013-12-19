// Copyright 2002-2013, University of Colorado Boulder

/**
 * Shape for the 'Build a Fraction' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' );

  var map = {
    PIES: require( 'FRACTION_COMMON/shapes/CircleShape' ),
    VERTICAL_BARS: require( 'FRACTION_COMMON/shapes/VRectangleShape' ),
    HORIZONTAL_BARS: require( 'FRACTION_COMMON/shapes/HRectangleShape' ),
    POLYGON: require( 'FRACTION_COMMON/shapes/PolygonShape' ),
    FLOWER: require( 'FRACTION_COMMON/shapes/FlowerShape' ),
    RING_OF_HEXAGONS: require( 'FRACTION_COMMON/shapes/RingOfHexagonsShape' ),
    LETTER_L_SHAPES: require( 'FRACTION_COMMON/shapes/LetterLShape' ),
    PLUSES: require( 'FRACTION_COMMON/shapes/PlusSignsShape' ),
    PYRAMID: require( 'FRACTION_COMMON/shapes/PyramidShape' ),
    GRID: require( 'FRACTION_COMMON/shapes/GridShape' ),
    INTERLEAVED_L_SHAPES: require( 'FRACTION_COMMON/shapes/InterleavedLShape' ),
    TETRIS: require( 'FRACTION_COMMON/shapes/TetrisPieceShape' ),
    NINJA_STAR: require( 'FRACTION_COMMON/shapes/NinjaStarShape' ),
    NUMBER: require( 'FRACTION_COMMON/shapes/NumericShape' ),
    CARD: require( 'FRACTION_COMMON/shapes/CardShape' )
  };

  function ShapeNode( options ) {
    options = _.extend( {
        type: 'PIES',
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        numerator: 1,
        denominator: 1,
        toSimplify: false,
        fill: "#F00"
      },
      options );
    Node.call( this, {x: options.x, y: options.y} );
    options.x = 0;
    options.y = 0;

    this.addChild( new map[options.type]( options ) );
  }

  return inherit( Node, ShapeNode );
} );
