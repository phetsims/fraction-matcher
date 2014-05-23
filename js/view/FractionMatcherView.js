// Copyright 2002-2014, University of Colorado Boulder

/**
 * Scene graph for the 'Matching Game' screen.
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Node = require( "SCENERY/nodes/Node" );
  var LevelsContainerNode = require( 'FRACTION_MATCHER/view/LevelsContainerNode' );
  var SoundToggleButton = require( 'SCENERY_PHET/SoundToggleButton' );
  var TimerToggleButton = require( 'SCENERY_PHET/TimerToggleButton' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var StartGameLevelNode = require( 'FRACTION_MATCHER/view/StartGameLevelNode' );
  var HBox = require( 'SCENERY/nodes/HBox' );

  function MatchingGameView( model ) {
    ScreenView.call( this, { renderer: 'svg' } );

    var levelsContainerNode = new LevelsContainerNode( model );
    levelsContainerNode.visible = false;
    levelsContainerNode.x = model.width;

    var startGameLevelNode = new StartGameLevelNode( model ).mutate( {
      centerX: model.width / 2,
      y: 58
    } );
    var levelSelectionScreen = new Node( {
      children: [
        startGameLevelNode,
        new ResetAllButton( {
          listener: function() {
            model.reset();
          },
          x: model.width - 40,
          y: model.height - 40
        } ),
        new HBox( {
          children: [
            new TimerToggleButton( model.isTimerProperty ),
            new SoundToggleButton( model.isSoundProperty )
          ],
          spacing: 10,
          x: 20,
          bottom: model.height - 20} ),
      ]} );

    this.addChild( levelsContainerNode );
    this.addChild( levelSelectionScreen );

    var startGameButtonsTween = new TWEEN.Tween( levelSelectionScreen ).onComplete( function() {
      levelSelectionScreen.visible = (levelSelectionScreen.x === 0);
    } );
    var levelsTween = new TWEEN.Tween( levelsContainerNode ).onComplete( function() {
      levelsContainerNode.visible = (levelsContainerNode.x === 0);
    } );

    var animateToLevels = function() {
      startGameButtonsTween.stop().to( {x: -model.width}, model.ANIMATION_TIME ).start();

      levelsContainerNode.visible = true;
      levelsTween.stop().to( {x: 0}, model.ANIMATION_TIME ).start();
    };

    var animateFromLevels = function( oldLevel ) {
      levelsTween.stop().to( {x: model.width}, model.ANIMATION_TIME ).start();

      levelSelectionScreen.visible = true;
      startGameButtonsTween.stop().to( {x: 0}, model.ANIMATION_TIME ).start();
      model.previousLevel = oldLevel;
    };


    model.currentLevelProperty.lazyLink( function( newLevel, oldLevel ) {
      if ( newLevel > 0 ) {
        animateToLevels();
      }
      else {
        animateFromLevels( oldLevel );
      }
    } );

  }

  return inherit( ScreenView, MatchingGameView );
} );
