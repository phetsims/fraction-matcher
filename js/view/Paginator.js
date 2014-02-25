// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for a paginator in 'Fraction Matcher' sim.
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
    PaginatorNode = require( 'FRACTION_COMMON/paginator/PaginatorNode' );

  function Paginator( model, options ) {
    var mixedNumber = (model.game === mixedNumbersTitleString);
    Node.call( this, options );

    var shapes = ['PIES', 'HORIZONTAL_BARS', 'VERTICAL_BARS', 'LETTER_L_SHAPES', 'POLYGON', 'FLOWER', 'RING_OF_HEXAGONS', 'NINJA_STAR'];
    var shapeColors = [model.CONSTANTS.COLORS.LIGHT_RED, model.CONSTANTS.COLORS.LIGHT_GREEN, model.CONSTANTS.COLORS.LIGHT_BLUE, model.CONSTANTS.COLORS.ORANGE, model.CONSTANTS.COLORS.PINK, model.CONSTANTS.COLORS.YELLOW, model.CONSTANTS.COLORS.LIGHT_PINK, model.CONSTANTS.COLORS.GREEN];

    var firstPageChildren = [];
    shapes.forEach( function( shape, index ) {
      firstPageChildren.push( {
        value: index + 1,
        shape: {type: shape, numerator: mixedNumber ? index + 2 : index + 1, denominator: index + 1, value: index + 1, fill: shapeColors[index]},
        height: (mixedNumber ? 100 : null),
        label: StringUtils.format( patternLevelString, index + 1 )
      } );
    } );

    this.addChild( new PaginatorNode( {x: 150, y: 90}, [firstPageChildren], model.currentLevelProperty, model.highScores ) );

  }

  return inherit( Node, Paginator );
} );
