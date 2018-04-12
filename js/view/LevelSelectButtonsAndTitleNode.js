// Copyright 2014-2017, University of Colorado Boulder

/**
 * View for a level select buttons in 'Fraction Matcher' sim.
 *
 * @author Vasily Shakhov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // modules
  var fractionMatcher = require( 'FRACTION_MATCHER/fractionMatcher' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HomeScreenView = require( 'JOIST/HomeScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LevelSelectionItemNode = require( 'VEGAS/LevelSelectionItemNode' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ShapeNode = require( 'FRACTION_MATCHER/shapes/ShapeNode' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var fractionsChooseYourLevelString = require( 'string!FRACTION_MATCHER/fractionsChooseYourLevel' );
  var levelNumberString = require( 'string!FRACTION_MATCHER/levelNumber' );
  var mixedNumbersChooseYourLevelString = require( 'string!FRACTION_MATCHER/mixedNumbersChooseYourLevel' );

  //constants
  var NUM_STARS_ON_BUTTON = 3; //number of stars on StartLevelButton
  var BUTTONS_PER_LINE = 4; //number on buttons in a single row
  var FONT = new PhetFont( { size: 14, weight: 'bold' } );

  function LevelSelectButtonsAndTitleNode( model, options ) {
    assert && assert( typeof model.isMixedNumbers !== 'undefined', 'Should declare whether it is mixed numbers or not.' );
    var mixedNumber = model.isMixedNumbers;

    var vBoxChildren = [];
    vBoxChildren.push( new Text( mixedNumber ? mixedNumbersChooseYourLevelString : fractionsChooseYourLevelString, {
      font: new PhetFont( {
        size: 28,
        family: HomeScreenView.TITLE_FONT_FAMILY
      } ),
      maxWidth: 618
    } ) );

    var START_BUTTON_OPTIONS = {
      buttonWidth: 90,
      buttonHeight: 150,
      backgroundColor: 'rgb( 242, 242, 242)',
      highlightedBackgroundColor: 'rgb( 242, 242, 242)'
    };

    var colors = model.constants.COLORS;
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

    //inner button view
    var createButtonContent = function( shape, index ) {
      var iconNode = ShapeNode.create( {
        x: 0,
        y: -5,
        type: shape.type,
        numerator: mixedNumber ? index + 2 : index + 1,
        denominator: index + 1,
        value: index + 1,
        fill: shape.color,
        width: shape.width ? shape.width : 60,
        height: shape.height ? shape.height : 60
      } );
      var textNode = new Text( StringUtils.format( levelNumberString, index + 1 ), {
        maxWidth: iconNode.width,
        font: FONT,
        centerX: 0
      } );
      return new VBox( { children: [ textNode, iconNode ], spacing: 20 } );
    };

    var hBoxChildren = [];
    shapes.forEach( function( shape, index ) {
      hBoxChildren.push(
        new LevelSelectionItemNode(
          createButtonContent( shape, index ),
          NUM_STARS_ON_BUTTON,
          function() {

            //Switch to the selected level, but only if the user was on the level selection screen, see #66
            if ( model.currentLevelProperty.get() === 0 ) {
              model.currentLevelProperty.set( index + 1 );
            }
          },
          model.highScores[ index ],
          model.MAX_POINTS_PER_GAME_LEVEL,
          START_BUTTON_OPTIONS
        ) );

      if ( index % BUTTONS_PER_LINE === BUTTONS_PER_LINE - 1 || index === shapes.length - 1 ) { //end of row
        vBoxChildren.push( new HBox( { resize: false, children: hBoxChildren, spacing: 45 } ) );
        hBoxChildren = [];
      }
    } );

    VBox.call( this, _.extend( { resize: false, children: vBoxChildren, spacing: 30 }, options ) );
  }

  fractionMatcher.register( 'LevelSelectButtonsAndTitleNode', LevelSelectButtonsAndTitleNode );

  return inherit( VBox, LevelSelectButtonsAndTitleNode );
} );