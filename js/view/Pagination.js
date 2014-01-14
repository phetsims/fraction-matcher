// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for a pagination in 'Fraction Matcher' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    StringUtils = require( 'PHETCOMMON/util/StringUtils' ),
    patternLevelString = require( 'string!FRACTION_COMMON/patternLevel' ),
    mixedNumbersTitleString = require( 'string!FRACTION_MATCHER/mixedNumbersTitle' ),
    PaginationNode = require( 'FRACTION_COMMON/pagination/PaginationNode' );

  function Pagination( model, options ) {
    var mixedNumber = (model.game === mixedNumbersTitleString);
    Node.call( this, options );

    this.addChild( new PaginationNode( {x: 150, y: 90}, [
      [
        {value: 1, shape: {type: 'PIES', numerator: mixedNumber ? 2 : 1, denominator: 1, value: 1, fill: model.CONSTANTS.COLORS.LIGHT_RED}, height: (mixedNumber ? 100 : null), label: StringUtils.format( patternLevelString, 1 )},
        {value: 2, shape: {type: 'HORIZONTAL_BARS', numerator: mixedNumber ? 3 : 2, denominator: 2, value: 2, fill: model.CONSTANTS.COLORS.LIGHT_GREEN}, height: (mixedNumber ? 100 : null), label: StringUtils.format( patternLevelString, 2 )},
        {value: 3, shape: {type: 'VERTICAL_BARS', numerator: mixedNumber ? 4 : 3, denominator: 3, value: 3, fill: model.CONSTANTS.COLORS.LIGHT_BLUE}, height: (mixedNumber ? 100 : null), label: StringUtils.format( patternLevelString, 3 )},
        {value: 4, shape: {type: 'LETTER_L_SHAPES', numerator: mixedNumber ? 5 : 4, denominator: 4, value: 4, fill: model.CONSTANTS.COLORS.ORANGE}, height: (mixedNumber ? 100 : null), label: StringUtils.format( patternLevelString, 4 )},
        {value: 5, shape: {type: 'POLYGON', numerator: mixedNumber ? 6 : 5, denominator: 5, value: 5, fill: model.CONSTANTS.COLORS.PINK}, height: (mixedNumber ? 100 : null), label: StringUtils.format( patternLevelString, 5 )},
        {value: 6, shape: {type: 'FLOWER', numerator: mixedNumber ? 7 : 6, denominator: 6, value: 6, fill: model.CONSTANTS.COLORS.YELLOW}, height: (mixedNumber ? 100 : null), label: StringUtils.format( patternLevelString, 6 )},
        {value: 7, shape: {type: 'RING_OF_HEXAGONS', numerator: mixedNumber ? 8 : 7, denominator: 7, value: 7, fill: model.CONSTANTS.COLORS.LIGHT_PINK}, height: (mixedNumber ? 100 : null), label: StringUtils.format( patternLevelString, 7 )},
        {value: 8, shape: {type: 'NINJA_STAR', numerator: mixedNumber ? 9 : 8, denominator: 8, value: 8, fill: model.CONSTANTS.COLORS.GREEN}, height: (mixedNumber ? 100 : null), label: StringUtils.format( patternLevelString, 8 )}
      ]
    ], model.levelProperty, model.score ) );

    this.scale( 1.4 );
  }

  return inherit( Node, Pagination );
} );
