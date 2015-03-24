// Copyright 2002-2014, University of Colorado Boulder

/**
 * General constants for Fraction Matcher.  While constants, they are extended by MixedNumberConstants, so they should be instantiated
 * like instance objects.  See https://github.com/phetsims/fraction-matcher/issues/43
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var FILL_TYPE = require( 'FRACTION_MATCHER/model/FillType' );
  var Fraction = require( 'PHETCOMMON/model/Fraction' );

  //colors
  var COLORS = {
    LIGHT_GREEN: 'rgb(140,198,63)',
    LIGHT_BLUE: '#6acef5',//to match the PhET Logo
    LIGHT_RED: 'rgb(233,69,69)',
    LIGHT_PINK: 'rgb(255,175,175)',
    ORANGE: 'rgb(255,200,0)',
    YELLOW: '#f2e916',//to match the PhET Logo
    GREEN: 'rgb(0,255,0)',
    PINK: 'rgb(255,0,255)'
  };
  COLORS.CIRCLE_COLOR = COLORS.LIGHT_GREEN;
  COLORS.HORIZONTAL_SLICE_COLOR = COLORS.LIGHT_RED;
  COLORS.VERTICAL_SLICE_COLOR = COLORS.LIGHT_BLUE;
  COLORS.NUMBER_LINE = COLORS.LIGHT_GREEN;

  //list of all possible shapes
  var SHAPES = [ 'PIES', 'HORIZONTAL_BARS', 'VERTICAL_BARS', 'PLUSES', 'GRID', 'PYRAMID', 'POLYGON', 'TETRIS', 'FLOWER', 'LETTER_L_SHAPES', 'INTERLEAVED_L_SHAPES', 'RING_OF_HEXAGONS', 'NINJA_STAR' ];

  function Constants() {
    // color constants
    this.COLORS = COLORS;

    // shapes type constants
    this.SHAPES = SHAPES;

    this.LEVEL_DESCRIPTION = [
    /**
     * Level 1
     * No mixed numbers
     * Only “exact” matches will be present. So for instance if there is a 3/6  and a pie with 6 divisions and 3 shaded slices, there will not be a ½  present .  In other words, the numerical representation on this level will exactly match the virtual manipulative.
     * Only numbers/representations ≦ 1 possible on this level
     * “Easy” shapes on this level (not some of the more abstract representations)
     */
      {
        fractions: [
          new Fraction( 1, 2 ),
          new Fraction( 1, 3 ),
          new Fraction( 2, 3 ),
          new Fraction( 1, 4 ),
          new Fraction( 3, 4 ),
          new Fraction( 1, 1 )
        ],
        numericScaleFactors: [ 1 ],
        fillType: [ FILL_TYPE.SEQUENTIAL ],
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
          new Fraction( 1, 2 ),
          new Fraction( 1, 3 ),
          new Fraction( 2, 3 ),
          new Fraction( 2, 4 ),
          new Fraction( 3, 4 ),
          new Fraction( 2, 6 ),
          new Fraction( 3, 6 )
        ],
        numericScaleFactors: [ 1 ],
        fillType: [ FILL_TYPE.SEQUENTIAL ],
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
          new Fraction( 3, 2 ),
          new Fraction( 4, 3 ),
          new Fraction( 5, 4 ),
          new Fraction( 6, 4 ),
          new Fraction( 7, 4 ),
          new Fraction( 4, 5 ),
          new Fraction( 2, 6 ),
          new Fraction( 3, 6 ),
          new Fraction( 4, 6 ),
          new Fraction( 5, 6 ),
          new Fraction( 7, 6 ),
          new Fraction( 3, 8 ),
          new Fraction( 4, 8 ),
          new Fraction( 5, 8 ),
          new Fraction( 6, 8 ),
          new Fraction( 7, 8 )
        ],
        numericScaleFactors: [ 1 ],
        fillType: [ FILL_TYPE.SEQUENTIAL ],
        shapes: SHAPES.slice( 0 )
      },
    /**
     * Level 4:
     * All representations possible as well as complicated mixed/improper numbers
     */
      {
        fractions: [
          new Fraction( 13, 7 ),
          new Fraction( 13, 7 ),
          new Fraction( 6, 3 ),
          new Fraction( 9, 5 ),
          new Fraction( 9, 7 ),
          new Fraction( 9, 8 ),
          new Fraction( 14, 8 ),
          new Fraction( 2, 9 ),
          new Fraction( 3, 9 ),
          new Fraction( 4, 9 ),
          new Fraction( 6, 9 ),
          new Fraction( 8, 9 )
        ],
        numericScaleFactors: [ 1, 2 ],
        fillType: [ FILL_TYPE.SEQUENTIAL ],
        shapes: SHAPES.slice( 0 )
      },
    /**
     * Level 5:
     * All representations possible as well as complicated mixed/improper numbers.  Same fractions as level 4 but different representations.
     */
      {
        fractions: [
          new Fraction( 13, 7 ),
          new Fraction( 13, 7 ),
          new Fraction( 6, 3 ),
          new Fraction( 9, 5 ),
          new Fraction( 9, 7 ),
          new Fraction( 9, 8 ),
          new Fraction( 14, 8 ),
          new Fraction( 2, 9 ),
          new Fraction( 3, 9 ),
          new Fraction( 4, 9 ),
          new Fraction( 6, 9 ),
          new Fraction( 8, 9 )
        ],
        numericScaleFactors: [ 1, 2, 3 ],
        fillType: [ FILL_TYPE.SEQUENTIAL, FILL_TYPE.MIXED ],
        shapes: SHAPES.slice( 0 )
      },
    /**
     * Level 6:
     * All representations possible as well as complicated mixed/improper numbers
     */
      {
        fractions: [
          new Fraction( 6, 5 ),
          new Fraction( 7, 5 ),
          new Fraction( 8, 5 ),
          new Fraction( 9, 5 ),
          new Fraction( 7, 6 ),
          new Fraction( 8, 6 ),
          new Fraction( 9, 6 ),
          new Fraction( 9, 7 ),
          new Fraction( 10, 7 ),
          new Fraction( 13, 7 ),
          new Fraction( 9, 8 ),
          new Fraction( 10, 8 ),
          new Fraction( 11, 8 ),
          new Fraction( 14, 8 ),
          new Fraction( 4, 9 ),
          new Fraction( 6, 9 ),
          new Fraction( 8, 9 ),
          new Fraction( 10, 9 ),
          new Fraction( 11, 9 )
        ],
        numericScaleFactors: [ 1, 4, 5 ],
        fillType: [ FILL_TYPE.SEQUENTIAL, FILL_TYPE.RANDOM ],
        shapes: SHAPES.slice( 0 )
      },
    /**
     * Level 7:
     * All representations possible as well as complicated mixed/improper numbers
     */
      {
        fractions: [
          new Fraction( 3, 2 ),
          new Fraction( 4, 3 ),
          new Fraction( 5, 3 ),
          new Fraction( 5, 4 ),
          new Fraction( 7, 4 ),
          new Fraction( 6, 5 ),
          new Fraction( 7, 5 ),
          new Fraction( 8, 5 ),
          new Fraction( 9, 5 ),
          new Fraction( 7, 6 ),
          new Fraction( 11, 6 )
        ],
        numericScaleFactors: [ 1, 6, 7 ],
        fillType: [ FILL_TYPE.SEQUENTIAL, FILL_TYPE.RANDOM ],
        shapes: SHAPES.slice( 0 )
      },
    /**
     * Level 8:
     * All representations possible as well as complicated mixed/improper numbers
     */
      {
        fractions: [
          new Fraction( 8, 7 ),
          new Fraction( 9, 7 ),
          new Fraction( 10, 7 ),
          new Fraction( 11, 7 ),
          new Fraction( 12, 7 ),
          new Fraction( 13, 7 ),
          new Fraction( 9, 8 ),
          new Fraction( 10, 8 ),
          new Fraction( 11, 8 ),
          new Fraction( 12, 8 ),
          new Fraction( 13, 8 ),
          new Fraction( 14, 8 ),
          new Fraction( 15, 8 ),
          new Fraction( 10, 9 ),
          new Fraction( 11, 9 ),
          new Fraction( 12, 9 ),
          new Fraction( 13, 9 ),
          new Fraction( 14, 9 ),
          new Fraction( 15, 9 ),
          new Fraction( 16, 9 ),
          new Fraction( 17, 9 )
        ],
        numericScaleFactors: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
        fillType: [ FILL_TYPE.SEQUENTIAL, FILL_TYPE.RANDOM ],
        shapes: SHAPES.slice( 0 )
      }
    ];
  }

  return Constants;
} );