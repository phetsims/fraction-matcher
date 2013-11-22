// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main page for the 'Fraction Matcher' screen.
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( "SCENERY/nodes/Node" ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    Image = require( 'SCENERY/nodes/Image' ),
    SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' ),
    Path = require( 'SCENERY/nodes/Path' ),
    Shape = require( 'KITE/Shape' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    StringUtils = require( 'PHETCOMMON/util/StringUtils' ),

    ButtonBackNode = require( 'FRACTION_MATCHER/MatchingGame/view/ButtonBackNode' ),
    ButtonResetLevelNode = require( 'FRACTION_MATCHER/MatchingGame/view/ButtonResetLevelNode' ),
    ButtonNode = require( 'FRACTION_MATCHER/MatchingGame/view/ButtonNode' ),
    LevelNode = require( 'FRACTION_MATCHER/MatchingGame/view/LevelNode' ),
    GameOverNode = require( 'FRACTION_MATCHER/MatchingGame/view/GameOverNode' ),
    SmileNode = require( 'FRACTION_MATCHER/MatchingGame/view/SmileNode' ),
    ComparisonChartNode = require( 'FRACTION_MATCHER/MatchingGame/view/ComparisonChartNode' ),

  // strings
    patternLevelString = require( 'string!FRACTION_MATCHER/patternLevel' ),
    patternScoreString = require( 'string!FRACTION_MATCHER/patternScore' ),
    buttonCheckString = require( 'string!FRACTION_MATCHER/buttonCheck' ),
    buttonOkString = require( 'string!FRACTION_MATCHER/buttonOk' ),
    buttonTryAgainString = require( 'string!FRACTION_MATCHER/buttonTryAgain' ),
    buttonShowAnswerString = require( 'string!FRACTION_MATCHER/buttonShowAnswer' ),
    myMatchesString = require( 'string!FRACTION_MATCHER/myMatches' );

  function ActionNode( model ) {

    var thisNode = this, i, j;
    Node.call( thisNode );
    for ( i = 0; i < 6; i++ ) {
      thisNode.addChild( new Rectangle( 20 + i * 185, 20, 170, 100, 10, 10, {fill: "#C0C0C0"} ) );
    }
    var levelLabel = new Text( StringUtils.format( patternLevelString, 1 ), { font: new PhetFont( { size: 19, weight: "bold"} ), right: 1115, centerY: 145  } );
    var scoreLabel = new Text( StringUtils.format( patternScoreString, 0 ), { font: new PhetFont( { size: 19, weight: "bold"} ), right: 1115, centerY: 175  } );
    thisNode.addChild( levelLabel );
    thisNode.addChild( scoreLabel );
    thisNode.addChild( new Text( myMatchesString, { font: new PhetFont( { size: 19, weight: "bold"} ), x: 20, centerY: 135  } ) );
    thisNode.addChild( new ButtonBackNode( {x: 1080, y: 215, callback: function setLevel() {model.setLevel( 0 );}} ) );
    thisNode.addChild( new ButtonResetLevelNode( {x: 1080, y: 265, callback: function resetLevel() {
      model.resetLevel();
    }} ) );

    var scaleLeft = new Image( require( 'image!FRACTION_MATCHER/../images/scale.png' ), {x: 300, y: 320, scale: 0.5} );
    var scaleRight = new Image( require( 'image!FRACTION_MATCHER/../images/scale.png' ), {x: 655, y: 320, scale: 0.5} );
    thisNode.addChild( scaleLeft );
    thisNode.addChild( scaleRight );
    for ( i = 0; i < 6; i++ ) {
      for ( j = 0; j < 2; j++ ) {
        thisNode.addChild( new Rectangle( 180 + i * 130, 420 + j * 130, 130, 130, 0, 0, { stroke: "#C0C0C0", lineWidth: 1} ) );
      }
    }

    var buttonCheck = new ButtonNode( buttonCheckString, function() {model.answerButton( "check" );}, {font: new PhetFont( { size: 19, weight: "bold"} ), rectangleFillUp: "#FFD63F", rectangleFillDown: "#FFD63F", rectangleFillOver: "#FFEA9D", x: 200, y: 350, rectangleCornerRadius: 5, rectangleXMargin: 10} );
    var buttonOk = new ButtonNode( buttonOkString, function() {model.answerButton( "ok" );}, {font: new PhetFont( { size: 19, weight: "bold"} ), rectangleFillUp: "#44FF44", rectangleFillDown: "#44FF44", rectangleFillOver: "#9FFF9F", x: 200, y: 350, rectangleCornerRadius: 5, rectangleXMargin: 10} );
    var buttonTryAgain = new ButtonNode( buttonTryAgainString, function() {model.answerButton( "tryAgain" );}, {font: new PhetFont( { size: 19, weight: "bold"} ), rectangleFillUp: "#FF7C3B", rectangleFillDown: "#FF7C3B", rectangleFillOver: "#FFBE9D", x: 200, y: 350, rectangleCornerRadius: 5, rectangleXMargin: 10} );
    var buttonShowAnswer = new ButtonNode( buttonShowAnswerString, function() {model.answerButton( "showAnswer" );}, {font: new PhetFont( { size: 19, weight: "bold"} ), rectangleFillUp: "#FF7C3B", rectangleFillDown: "#FF7C3B", rectangleFillOver: "#FFBE9D", x: 200, y: 350, rectangleCornerRadius: 5, rectangleXMargin: 10} );
    var smile = new SmileNode( {centerX: 200, centerY: 235} );
    var comparisonChart = new ComparisonChartNode( {centerX: 570, y: 350} );
    thisNode.addChild( buttonCheck );
    thisNode.addChild( buttonOk );
    thisNode.addChild( buttonTryAgain );
    thisNode.addChild( buttonShowAnswer );
    thisNode.addChild( smile );
    thisNode.addChild( comparisonChart );
    buttonCheck.right = Math.min( buttonCheck.right, 290 );
    buttonOk.right = Math.min( buttonOk.right, 290 );
    buttonTryAgain.right = Math.min( buttonTryAgain.right, 290 );
    buttonShowAnswer.right = Math.min( buttonShowAnswer.right, 290 );

    thisNode.addChild( new LevelNode( model, {} ) );

    thisNode.addChild( new GameOverNode( model ) );


    model.changeStatusProperty.link( function updateAction() {
      if ( model.selectLevel > 0 ) {
        levelLabel.text = StringUtils.format( patternLevelString, model.selectLevel );
        levelLabel.text.right = 1115;
        scoreLabel.text = StringUtils.format( patternScoreString, model.levelStatus[model.selectLevel].score );
        scoreLabel.text.right = 1115;
      }
    } );

    model.buttonStatusProperty.link( function updateButtonStatus( value ) {
      buttonOk.setVisible( value === 'ok' );
      buttonCheck.setVisible( value === 'check' );
      buttonTryAgain.setVisible( value === 'tryAgain' );
      buttonShowAnswer.setVisible( value === 'showAnswer' );
      if ( model.buttonStatus === 'ok' ) {
        smile.setValue( 2 - model.levelStatus[model.selectLevel].step );
      }
      else {
        smile.setValue( 0 );
      }
      if ( model.buttonStatus !== 'none' ) {
        comparisonChart.reset();
        if ( model.buttonStatus !== 'check' ) {
          comparisonChart.compare( model.levelStatus[model.selectLevel].shape[model.levelStatus[model.selectLevel].old12], model.levelStatus[model.selectLevel].shape[model.levelStatus[model.selectLevel].old13] );
        }
      }
      else {
        comparisonChart.hide();
      }
    } );
  }

  return inherit( Node, ActionNode );
} );
