// Copyright 2002-2013, University of Colorado Boulder

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
    ButtonNode = require( 'FRACTION_MATCHER/view/ButtonNode' ),
    Image = require( 'SCENERY/nodes/Image' );

  function GameOverNode( model ) {
    var thisNode = this,
      gameOverScore,
      gameOverLevel,
      background = new Node();

    Node.call( thisNode );

    // add components
    this.addChild( background );
    this.addChild( new Text( gameOverString, { font: new PhetFont( { size: 36, weight: "normal"} ), centerX: 575, centerY: 215  } ) );
    this.addChild( gameOverLevel = new Text( StringUtils.format( patternGameOverLevelString, 1 ), { font: new PhetFont( { size: 28, weight: "normal"} ), x: 400, centerY: 300  } ) );
    this.addChild( gameOverScore = new Text( StringUtils.format( patternGameOverScoreString, 1 ), { font: new PhetFont( { size: 28, weight: "normal"} ), x: 400, centerY: 360  } ) );
    this.addChild( new ButtonNode( buttonNewGameString, function() {model.setLevel( 0 );}, {font: new PhetFont( { size: 22, weight: "normal"} ), rectangleFillUp: "#F1F1F1", rectangleFillDown: "#F1F1F1", rectangleFillOver: "#F8F8F8", x: 575, y: 470, rectangleCornerRadius: 5, rectangleXMargin: 10, rectangleYMargin: 5} ) );

    model.changeStatusProperty.link( function updateGameOverNode() {
      if ( model.selectLevel > 0 ) {
        if ( model.levelStatus[model.selectLevel].score >= 12 ) {
          gameOverScore.text = StringUtils.format( patternGameOverScorePrefectString, model.levelStatus[model.selectLevel].score );
        }
        else {
          gameOverScore.text = StringUtils.format( patternGameOverScoreString, model.levelStatus[model.selectLevel].score );
        }
        gameOverScore.centerX = 575;
        gameOverLevel.x = gameOverScore.x;

        background.removeAllChildren();
        background.addChild( new Rectangle( gameOverScore.x - 50, 170, gameOverScore.width + 120, 350, 0, 0, {fill: "#B4CDFF", stroke: "#000", lineWidth: 2} ) );
        background.addChild( new Line( gameOverScore.x, 260, gameOverScore.x + gameOverScore.width + 20, 260, {stroke: "#000", lineWidth: 2} ) );
        background.addChild( new Line( gameOverScore.x, 430, gameOverScore.x + gameOverScore.width + 20, 430, {stroke: "#000", lineWidth: 2} ) );
        thisNode.setVisible( model.answerZone[model.answerZone.length - 1].indexShape >= 0 );
      }
    } );
  }

  return inherit( Node, GameOverNode );
} );