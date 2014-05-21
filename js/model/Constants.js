// Copyright 2002-2014, University of Colorado Boulder

/**
 * General constants for Fraction Matcher.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var FILL_TYPE = require( 'FRACTION_MATCHER/FillType' );

  //colors
  var COLORS = {
    LIGHT_GREEN: 'rgb(140,198,63)',
    LIGHT_BLUE: 'rgb(87,182,221)',
    LIGHT_RED: 'rgb(233,69,69)',
    LIGHT_PINK: 'rgb(255,175,175)',
    ORANGE: 'rgb(255,200,0)',
    YELLOW: 'rgb(255,255,0)',
    GREEN: 'rgb(0,255,0)',
    PINK: 'rgb(255,0,255)'
  };
  COLORS.CIRCLE_COLOR = COLORS.LIGHT_GREEN;
  COLORS.HORIZONTAL_SLICE_COLOR = COLORS.LIGHT_RED;
  COLORS.VERTICAL_SLICE_COLOR = COLORS.LIGHT_BLUE;
  COLORS.NUMBER_LINE = COLORS.LIGHT_GREEN;

  //list of all possible shapes
  var SHAPES = ['PIES', 'HORIZONTAL_BARS', 'VERTICAL_BARS', 'PLUSES', 'GRID', 'PYRAMID', 'POLYGON', 'TETRIS', 'FLOWER', 'LETTER_L_SHAPES', 'INTERLEAVED_L_SHAPES', 'RING_OF_HEXAGONS', 'NINJA_STAR'];

  var Constants = {
    // color constants
    COLORS: COLORS,
    // shapes type constants
    SHAPES: SHAPES,

    LEVEL_DESCRIPTION: [
    /**
     * Level 1
     * No mixed numbers
     * Only “exact” matches will be present. So for instance if there is a 3/6  and a pie with 6 divisions and 3 shaded slices, there will not be a ½  present .  In other words, the numerical representation on this level will exactly match the virtual manipulative.
     * Only numbers/representations ≦ 1 possible on this level
     * “Easy” shapes on this level (not some of the more abstract representations)
     */
      {
        fractions: [
          [1, 2],
          [1, 3],
          [2, 3],
          [1, 4],
          [3, 4],
          [1, 1]
        ],
        numericScaleFactors: [1],
        fillType: [FILL_TYPE.SEQUENTIAL],
        shapes: SHAPES.slice( 0, 3 )
      },
    /**
     * Level 2
     * Reduced fractions possible on this level. So, for instance 3/6 and ½  could both be present.  Or a virtual representation of 3/6 could have the numerical of ½ be its only possible match
     * Still only numbers/representations ≦ 1 possible
     * More shapes can be introduced
     */
      {
        fractions: [
          [1, 2],
          [1, 3],
          [2, 3],
          [2, 4],
          [3, 4],
          [2, 6],
          [3, 6]
        ],
        numericScaleFactors: [1],
        fillType: [FILL_TYPE.SEQUENTIAL],
        shapes: SHAPES.slice( 0 )
      },
    /**
     * Level 3:
     * Reduced fractions possible on this level. So, for instance 3/6 and ½  could both be present.  Or a virtual representation of 3/6 could have the numerical of ½ be its only possible match
     * Still only numbers/representations ≦ 1 possible
     * More shapes can be introduced
     */
      {
        fractions: [
          [3, 2],
          [4, 3],
          [5, 4],
          [6, 4],
          [7, 4],
          [4, 5],
          [2, 6],
          [3, 6],
          [4, 6],
          [5, 6],
          [7, 6],
          [3, 8],
          [4, 8],
          [5, 8],
          [6, 8],
          [7, 8]
        ],
        numericScaleFactors: [1],
        fillType: [FILL_TYPE.SEQUENTIAL],
        shapes: SHAPES.slice( 0 )
      },
    /**
     * Level 4:
     * All representations possible as well as complicated mixed/improper numbers
     */
      {
        fractions: [
          [13, 7],
          [13, 7],
          [6, 3],
          [9, 5],
          [9, 7],
          [9, 8],
          [14, 8],
          [2, 9],
          [3, 9],
          [4, 9],
          [6, 9],
          [8, 9]
        ],
        numericScaleFactors: [1, 2],
        fillType: [FILL_TYPE.SEQUENTIAL],
        shapes: SHAPES.slice( 0 )
      },
    /**
     * Level 5:
     * All representations possible as well as complicated mixed/improper numbers.  Same fractions as level 4 but different representations.
     */
      {
        fractions: [
          [13, 7],
          [13, 7],
          [6, 3],
          [9, 5],
          [9, 7],
          [9, 8],
          [14, 8],
          [2, 9],
          [3, 9],
          [4, 9],
          [6, 9],
          [8, 9]
        ],
        numericScaleFactors: [1, 2, 3],
        fillType: [FILL_TYPE.SEQUENTIAL, FILL_TYPE.MIXED],
        shapes: SHAPES.slice( 0 )
      },
    /**
     * Level 6:
     * All representations possible as well as complicated mixed/improper numbers
     */
      {
        fractions: [
          [6, 5],
          [7, 5],
          [8, 5],
          [9, 5],
          [7, 6],
          [8, 6],
          [9, 6],
          [9, 7],
          [10, 7],
          [13, 7],
          [9, 8],
          [10, 8],
          [11, 8],
          [14, 8],
          [4, 9],
          [6, 9],
          [8, 9],
          [10, 9],
          [11, 9]
        ],
        numericScaleFactors: [1, 4, 5],
        fillType: [FILL_TYPE.SEQUENTIAL, FILL_TYPE.RANDOM],
        shapes: SHAPES.slice( 0 )
      },
    /**
     * Level 7:
     * All representations possible as well as complicated mixed/improper numbers
     */
      {
        fractions: [
          [3, 2],
          [4, 3],
          [5, 3],
          [5, 4],
          [7, 4],
          [6, 5],
          [7, 5],
          [8, 5],
          [9, 5],
          [7, 6],
          [11, 6]
        ],
        numericScaleFactors: [1, 6, 7],
        fillType: [FILL_TYPE.SEQUENTIAL, FILL_TYPE.RANDOM],
        shapes: SHAPES.slice( 0 )
      },
    /**
     * Level 8:
     * All representations possible as well as complicated mixed/improper numbers
     */
      {
        fractions: [
          [8, 7],
          [9, 7],
          [10, 7],
          [11, 7],
          [12, 7],
          [13, 7],
          [9, 8],
          [10, 8],
          [11, 8],
          [12, 8],
          [13, 8],
          [14, 8],
          [15, 8],
          [10, 9],
          [11, 9],
          [12, 9],
          [13, 9],
          [14, 9],
          [15, 9],
          [16, 9],
          [17, 9]
        ],
        numericScaleFactors: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        fillType: [FILL_TYPE.SEQUENTIAL, FILL_TYPE.RANDOM],
        shapes: SHAPES.slice( 0 )
      }
    ]

  };
  return Constants;
} );