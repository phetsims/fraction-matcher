// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main page for the 'Fraction Matcher' screen.
 *
 * @author Anton Ulyanov, Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( "SCENERY/nodes/Node" ),
    Text = require( 'SCENERY/nodes/Text' ),
    matchingGameHeaderString = require( 'string!FRACTION_MATCHER/matchingGameHeader' ),
    mixedNumbersHeaderString = require( 'string!FRACTION_MATCHER/mixedNumbersHeader' ),
    mixedNumbersTitleString = require( 'string!FRACTION_MATCHER/mixedNumbersTitle' ),
    patternLevelString = require( 'string!FRACTION_MATCHER/patternLevel' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    StringUtils = require( 'PHETCOMMON/util/StringUtils' ),
    LevelButtonNode = require( 'FRACTION_MATCHER/view/LevelButtonNode' ),
    ShapeNode = require( 'FRACTION_MATCHER/common/view/shapes/ShapeNode' );

  function Page1Node( model ) {
    Node.call( this );

    // icon for each level button
    var levelButtonIcon = [
      {type: 'PIES', fill: model.CONSTANTS.COLORS.LIGHT_RED},
      {type: 'HORIZONTAL_BARS', fill: model.CONSTANTS.COLORS.LIGHT_GREEN},
      {type: 'VERTICAL_BARS', fill: model.CONSTANTS.COLORS.LIGHT_BLUE},
      {type: 'LETTER_L_SHAPES', fill: model.CONSTANTS.COLORS.ORANGE},
      {type: 'POLYGON', fill: model.CONSTANTS.COLORS.PINK},
      {type: 'FLOWER', fill: model.CONSTANTS.COLORS.YELLOW},
      {type: 'RING_OF_HEXAGONS', fill: model.CONSTANTS.COLORS.LIGHT_PINK},
      {type: 'NINJA_STAR', fill: model.CONSTANTS.COLORS.GREEN}
    ];

    // add header
    this.addChild( new Text( (model.game === mixedNumbersTitleString ? mixedNumbersHeaderString : matchingGameHeaderString), { font: new PhetFont( { size: 40, weight: "bold"} ), centerX: 1140 / 2, centerY: 40  } ) );

    // add level buttons
    for ( var i = 0, levelBt = []; i < 8; i++ ) {
      levelBt.push( new LevelButtonNode( model, {
        x: 250 + 200 * (i % 4),
        y: 200 + 250 * Math.floor( i / 4 ),
        width: 130,
        height: ( model.game === mixedNumbersTitleString ? 150 : 200 ),
        label: StringUtils.format( patternLevelString, i + 1 ),
        shape: new ShapeNode( {
          type: levelButtonIcon[i].type,
          x: 0,
          y: -10,
          width: 90,
          height: 90,
          numerator: i + ( model.game === mixedNumbersTitleString ? 2 : 1 ),
          denominator: i + 1,
          fill: levelButtonIcon[i].fill
        } ),
        callback: getCallback( model, i + 1 )} ) );
      this.addChild( levelBt[i] );
    }

    // high score observer
    model.selectLevelProperty.link( function() {
      // set high score for each level
      levelBt.forEach( function( button, i ) {
        if ( model.levelStatus[i + 1] ) {
          button.setScore( model.levelStatus[i + 1].hiScore );
        }
      } );
    } );
  }

  // return button level callback function
  var getCallback = function( model, value ) {
    return function() {model.setLevel( value );};
  };

  return inherit( Node, Page1Node );
} );