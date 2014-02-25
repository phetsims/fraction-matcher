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
  var myMatchesString = require( 'string!FRACTION_MATCHER/myMatches' );

  function LevelsContainerNode( model ) {
    var margin = 15;

    var thisNode = this, i, j;
    Node.call( this );

    //top gray targets                                          f
    this.answerRects = [];
    for ( i = 0; i < 6; i++ ) {
      this.answerRects.push( new Rectangle( margin + i * 125, margin, 115, 70, 10, 10, {fill: "#C0C0C0"} ) );
      thisNode.addChild( this.answerRects[i] );
    }

    //My matches string
    thisNode.addChild( new Text( myMatchesString, { font: new PhetFont( { size: 19, weight: "bold"} ), x: 15, y: 105  } ) );

    //right buttons, reset and toLevelSelection
    var backButton = new BackButton( {y: 160}, function() {model.currentLevel = 0;} );
    backButton.x = model.width - backButton.width - margin;
    thisNode.addChild( backButton );

    var refreshButton = new RefreshButton( {y: 200}, function() {model.levels[model.currentLevel].generateNewLevel();} );
    refreshButton.x = model.width - refreshButton.width - margin;
    thisNode.addChild( refreshButton );

    //scales
    var scalesMarginFromCenter = 150;
    this.scales = [];
    this.scales[0] = new Image( require( 'image!FRACTION_MATCHER/../images/scale.png' ), {centerX: model.width / 2 - scalesMarginFromCenter, y: 230, scale: 0.33} );
    this.scales[1] = new Image( require( 'image!FRACTION_MATCHER/../images/scale.png' ), {centerX: model.width / 2 + scalesMarginFromCenter, y: 230, scale: 0.33} );
    thisNode.addChild( this.scales[0] );
    thisNode.addChild( this.scales[1] );

    //source rectangles
    this.sourceRectangles = [];
    for ( i = 0; i < 6; i++ ) {
      for ( j = 0; j < 2; j++ ) {
        this.sourceRectangles.push( new Rectangle( 125 + i * 90, 300 + j * 90, 90, 90, 0, 0, { stroke: "#C0C0C0", lineWidth: 1} ) );
        thisNode.addChild( this.sourceRectangles[this.sourceRectangles.length - 1] );
      }
    }

    var levelNodes = [];
    model.levels.forEach( function( levelModel, index ) {
      levelNodes[index] = new LevelNode( levelModel, thisNode, {visible: false} );
      thisNode.addChild( levelNodes[index] );
    } );

    model.currentLevelProperty.link( function( newLevel, oldLevel ) {
      if ( newLevel > 0 ) {
        levelNodes[newLevel - 1 ].visible = true;
      }
      if ( oldLevel && oldLevel > 0 ) {
        levelNodes[oldLevel - 1 ].visible = false;
      }
    } );

  }

  return inherit( Node, LevelsContainerNode );
} );
