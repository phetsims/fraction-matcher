// Copyright 2002-2014, University of Colorado Boulder

/**
 * Game over node for the 'Fraction Matcher' screen.
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( "SCENERY/nodes/Node" ),
    Text = require( 'SCENERY/nodes/Text' ),
    gameOverString = require( 'string!FRACTION_MATCHER/gameOver' ),
    patternGameOverLevelString = require( 'string!FRACTION_MATCHER/patternGameOverLevel' ),
    patternGameOverScoreString = require( 'string!FRACTION_MATCHER/patternGameOverScore' ),
    patternGameOverScorePrefectString = require( 'string!FRACTION_MATCHER/patternGameOverScorePrefect' ),
    buttonNewGameString = require( 'string!FRACTION_MATCHER/buttonNewGame' ),
    StringUtils = require( 'PHETCOMMON/util/StringUtils' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    Line = require( 'SCENERY/nodes/Line' ),
    Vector2 = require( 'DOT/Vector2' ),
    ButtonNode = require( 'FRACTION_MATCHER/view/ButtonNode' );

  function GameOverNode( model, levelNode, options ) {
    var thisNode = this,
      gameOver,
      gameOverScore,
      gameOverLevel,
      background = new Node();

    Node.call( thisNode, options );

    // add components
    this.addChild( background );
    this.addChild( gameOver = new Text( gameOverString, { font: new PhetFont( { size: 28, weight: "normal"} ), centerX: 0, centerY: 33  } ) );
    this.addChild( gameOverLevel = new Text( StringUtils.format( patternGameOverLevelString, 1 ), { font: new PhetFont( { size: 20, weight: "normal"} ), centerX: 0, centerY: 100  } ) );
    this.addChild( gameOverScore = new Text( StringUtils.format( patternGameOverScoreString, 1 ), { font: new PhetFont( { size: 20, weight: "normal"} ), centerX: 0, centerY: 140  } ) );
    this.addChild( new ButtonNode( buttonNewGameString, function() {
      model.gameModel.highScores[model.levelNumber - 1].set( Math.max( model.gameModel.highScores[model.levelNumber - 1].get(), model.score ) );
      model.gameModel.currentLevel = 0;
      model.reset();
      levelNode.generateNewLevel();
    }, {font: new PhetFont( { size: 16, weight: "normal"} ), rectangleFillUp: "#F1F1F1", rectangleFillDown: "#F1F1F1", rectangleFillOver: "#F8F8F8", centerX: 0, y: 240, rectangleCornerRadius: 5, rectangleXMargin: 10, rectangleYMargin: 5} ) );


    var margin = 28;
    this.showGameOver = function() {
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
      thisNode.center = new Vector2( model.gameModel.width / 2, model.gameModel.height / 2 );

      thisNode.setVisible( true );
    };

  }

  return inherit( Node, GameOverNode );
} );
