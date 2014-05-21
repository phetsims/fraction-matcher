// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for a paginator in 'Fraction Matcher' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var PaginatorNode = require( 'FRACTION_MATCHER/paginator/PaginatorNode' );

  // strings
  var patternLevelString = require( 'string!FRACTION_MATCHER/patternLevel' );
  var mixedNumbersTitleString = require( 'string!FRACTION_MATCHER/mixedNumbersTitle' );

  function Paginator( model, options ) {
    var mixedNumber = (model.game === mixedNumbersTitleString);
    Node.call( this, options );

    var colors = model.CONSTANTS.COLORS;
    var shapes = [
      {
        type: 'PIES',
        color: colors.LIGHT_RED
      },
      {
        type: 'HORIZONTAL_BARS',
        color: colors.LIGHT_GREEN
      },
      {
        type: 'VERTICAL_BARS',
        color: colors.LIGHT_BLUE
      },
      {
        type: 'LETTER_L_SHAPES',
        color: colors.ORANGE,
        height: 75
      },
      {
        type: 'POLYGON',
        color: colors.PINK
      },
      {
        type: 'FLOWER',
        color: colors.YELLOW,
        width: 65,
        height: 65
      },
      {
        type: 'RING_OF_HEXAGONS',
        color: colors.LIGHT_PINK
      },
      {
        type: 'NINJA_STAR',
        color: colors.GREEN
      }
    ];

    var firstPageChildren = [];
    shapes.forEach( function( shape, index ) {
      firstPageChildren.push( {
        value: index + 1,
        shape: {
          type: shape.type,
          numerator: mixedNumber ? index + 2 : index + 1,
          denominator: index + 1,
          value: index + 1,
          fill: shape.color,
          width: shape.width ? shape.width : 60,
          height: shape.height ? shape.height : 60
        },
        height: (mixedNumber ? 100 : null),
        label: StringUtils.format( patternLevelString, index + 1 )
      } );
    } );

    this.addChild( new PaginatorNode( {x: 150, y: 90}, [firstPageChildren], model.currentLevelProperty, model.highScores ) );

  }

  return inherit( Node, Paginator );
} );
