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
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    StringUtils = require( 'PHETCOMMON/util/StringUtils' ),

    BackButton = require( 'FRACTION_COMMON/yellow-buttons/BackButton' ),
    RefreshButton = require( 'FRACTION_COMMON/yellow-buttons/RefreshButton' ),
    LevelNode = require( 'FRACTION_MATCHER/view/LevelNode' );

  // strings
    var patternLevelString = require( 'string!FRACTION_MATCHER/patternLevel' ),
    patternScoreString = require( 'string!FRACTION_MATCHER/patternScore' ),
    myMatchesString = require( 'string!FRACTION_MATCHER/myMatches' );

  function LevelsContainerNode( model ) {
    var margin = 15;

    var thisNode = this, i, j;
    Node.call( this );

    //top gray targets
    for ( i = 0; i < 6; i++ ) {
      thisNode.addChild( new Rectangle( margin + i * 125, margin, 115, 70, 10, 10, {fill: "#C0C0C0"} ) );
    }

    //labels at the right
    var levelLabel = new Text( StringUtils.format( patternLevelString, 1 ), { font: new PhetFont( { size: 19, weight: "bold"} ), right: model.width - margin, centerY: 100  } );
    var scoreLabel = new Text( StringUtils.format( patternScoreString, 0 ), { font: new PhetFont( { size: 19, weight: "bold"} ), right: model.width - margin, centerY: 125  } );
    thisNode.addChild( levelLabel );
    thisNode.addChild( scoreLabel );

    //My matches string
    thisNode.addChild( new Text( myMatchesString, { font: new PhetFont( { size: 19, weight: "bold"} ), x: 15, centerY: 100  } ) );

    //right buttons, reset and toLevelSelection
    var backButton = new BackButton( {y: 150}, function() {model.currentLevel = 0;} );
    backButton.x = model.width - backButton.width - margin;
    thisNode.addChild( backButton );

    var refreshButton = new RefreshButton( {y: 190}, function() {model.levels[model.currentLevel].resetLevel();} );
    refreshButton.x = model.width - refreshButton.width - margin;
    thisNode.addChild( refreshButton );

    //scales
    var scalesMarginFromCenter = 150;
    var scaleLeft = new Image( require( 'image!FRACTION_MATCHER/../images/scale.png' ), {centerX: model.width/2-scalesMarginFromCenter, y: 230, scale: 0.33} );
    var scaleRight = new Image( require( 'image!FRACTION_MATCHER/../images/scale.png' ), {centerX: model.width/2+scalesMarginFromCenter, y: 230, scale: 0.33} );
    thisNode.addChild( scaleLeft );
    thisNode.addChild( scaleRight );

    //source rectangles
    for ( i = 0; i < 6; i++ ) {
      for ( j = 0; j < 2; j++ ) {
        thisNode.addChild( new Rectangle( 125 + i * 90, 300 + j * 90, 90, 90, 0, 0, { stroke: "#C0C0C0", lineWidth: 1} ) );
      }
    }

    model.levels.forEach( function( levelModel ) {
      thisNode.addChild( new LevelNode( levelModel, {} ) );
    } );

    model.changeStatusProperty.link( function updateAction() {
      if ( model.currentLevel > 0 ) {
        levelLabel.text = StringUtils.format( patternLevelString, model.currentLevel );
        levelLabel.text.right = 1115;
        scoreLabel.text = StringUtils.format( patternScoreString, model.levels[model.currentLevel].score );
        scoreLabel.text.right = 1115;
      }
    } );

  }

  return inherit( Node, LevelsContainerNode );
} );
