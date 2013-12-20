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
        {type: 'PIES', height: (mixedNumber ? 100 : null), numerator: mixedNumber ? 2 : 1, denominator: 1, value: 1, fill: model.CONSTANTS.COLORS.LIGHT_RED, label: StringUtils.format( patternLevelString, 1 )},
        {type: 'HORIZONTAL_BARS', height: (mixedNumber ? 100 : null), numerator: mixedNumber ? 3 : 2, denominator: 2, value: 2, fill: model.CONSTANTS.COLORS.LIGHT_GREEN, label: StringUtils.format( patternLevelString, 2 )},
        {type: 'VERTICAL_BARS', height: (mixedNumber ? 100 : null), numerator: mixedNumber ? 4 : 3, denominator: 3, value: 3, fill: model.CONSTANTS.COLORS.LIGHT_BLUE, label: StringUtils.format( patternLevelString, 3 )},
        {type: 'LETTER_L_SHAPES', height: (mixedNumber ? 100 : null), numerator: mixedNumber ? 5 : 4, denominator: 4, value: 4, fill: model.CONSTANTS.COLORS.ORANGE, label: StringUtils.format( patternLevelString, 4 )},
        {type: 'POLYGON', height: (mixedNumber ? 100 : null), numerator: mixedNumber ? 6 : 5, denominator: 5, value: 5, fill: model.CONSTANTS.COLORS.PINK, label: StringUtils.format( patternLevelString, 5 )},
        {type: 'FLOWER', height: (mixedNumber ? 100 : null), numerator: mixedNumber ? 7 : 6, denominator: 6, value: 6, fill: model.CONSTANTS.COLORS.YELLOW, label: StringUtils.format( patternLevelString, 6 )},
        {type: 'RING_OF_HEXAGONS', height: (mixedNumber ? 100 : null), numerator: mixedNumber ? 8 : 7, denominator: 7, value: 7, fill: model.CONSTANTS.COLORS.LIGHT_PINK, label: StringUtils.format( patternLevelString, 7 )},
        {type: 'NINJA_STAR', height: (mixedNumber ? 100 : null), numerator: mixedNumber ? 9 : 8, denominator: 8, value: 8, fill: model.CONSTANTS.COLORS.GREEN, label: StringUtils.format( patternLevelString, 8 )}
      ]
    ], model.levelProperty, model.score ) );

    this.scale( 1.4 );
  }

  return inherit( Node, Pagination );
} );
