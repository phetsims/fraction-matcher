// Copyright 2002-2014, University of Colorado Boulder

/**
 * Game over node for the 'Fraction Matcher' screen.
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( "SCENERY/nodes/Node" );
  var Text = require( 'SCENERY/nodes/Text' );
  var gameOverString = require( 'string!FRACTION_MATCHER/gameOver' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Vector2 = require( 'DOT/Vector2' );
  var ButtonNode = require( 'FRACTION_MATCHER/view/ButtonNode' );

  // strings
  var patternGameOverLevelString = require( 'string!FRACTION_MATCHER/patternGameOverLevel' );
  var patternGameOverScoreString = require( 'string!FRACTION_MATCHER/patternGameOverScore' );
  var patternGameOverScorePrefectString = require( 'string!FRACTION_MATCHER/patternGameOverScorePrefect' );
  var buttonNewGameString = require( 'string!FRACTION_MATCHER/buttonNewGame' );

  function GameOverNode( model, levelNode, options ) {
    var thisNode = this,
      gameOver,
      gameOverScore,
      gameOverLevel,
      gameOverButton,
      background = new Node();

    Node.call( thisNode, options );

    // add components
    this.addChild( background );
    this.addChild( gameOver = new Text( gameOverString, { font: new PhetFont( { size: 28, weight: "normal"} ), centerX: 0, centerY: 33  } ) );
    this.addChild( gameOverLevel = new Text( StringUtils.format( patternGameOverLevelString, 1 ), { font: new PhetFont( { size: 20, weight: "normal"} ), centerX: 0, centerY: 100  } ) );
    this.addChild( gameOverScore = new Text( StringUtils.format( patternGameOverScoreString, 1 ), { font: new PhetFont( { size: 20, weight: "normal"} ), centerX: 0, centerY: 140  } ) );
    this.addChild( gameOverButton = new ButtonNode( buttonNewGameString, function() {
      model.gameModel.highScores[model.levelNumber - 1].set( Math.max( model.gameModel.highScores[model.levelNumber - 1].get(), model.score ) );
      model.gameModel.currentLevel = 0;
      model.reset();
      levelNode.generateNewLevel();
    }, {font: new PhetFont( { size: 16, weight: "normal"} ), rectangleFillUp: "#F1F1F1", rectangleFillDown: "#F1F1F1", rectangleFillOver: "#F8F8F8", centerX: 0, y: 240, rectangleCornerRadius: 5, rectangleXMargin: 10, rectangleYMargin: 5} ) );


    var margin = 28;
    this.showGameOver = function() {

      gameOverLevel.text = StringUtils.format( patternGameOverLevelString, model.gameModel.currentLevel );

      if ( model.score >= 12 ) {
        gameOverScore.text = StringUtils.format( patternGameOverScorePrefectString, model.score );
      }
      else {
        gameOverScore.text = StringUtils.format( patternGameOverScoreString, model.score );
      }
      var maxWidth = Math.max( gameOver.width + 2 * margin, gameOverScore.width );

      gameOverScore.x = gameOver.x - margin;
      gameOverLevel.x = gameOver.x - margin;

      background.removeAllChildren();
      background.addChild( new Rectangle( gameOver.x - 2 * margin, 0, maxWidth + 2 * margin, 280, 0, 0, {fill: "#B4CDFF", stroke: "#000", lineWidth: 1} ) );
      background.addChild( new Line( gameOver.x - margin, 65, gameOver.x - margin + maxWidth, 65, {stroke: "#000", lineWidth: 1} ) );
      background.addChild( new Line( gameOver.x - margin, 210, gameOver.x - margin + maxWidth, 210, {stroke: "#000", lineWidth: 1} ) );

      gameOver.centerX = background.centerX;
      gameOverButton.centerX = background.centerX;
      thisNode.center = new Vector2( model.gameModel.width / 2, model.gameModel.height / 2 );

      thisNode.setVisible( true );
    };

  }

  return inherit( Node, GameOverNode );
} );
