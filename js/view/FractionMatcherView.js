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
  var Paginator = require( 'FRACTION_MATCHER/view/Paginator' );
  var LevelsContainerNode = require( 'FRACTION_MATCHER/view/LevelsContainerNode' );
  var SoundToggleButton = require( 'SCENERY_PHET/SoundToggleButton' );
  var TimerToggleButton = require( 'SCENERY_PHET/TimerToggleButton' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );

  // strings
  var matchingGameHeaderString = require( 'string!FRACTION_MATCHER/matchingGameHeader' );
  var mixedNumbersHeaderString = require( 'string!FRACTION_MATCHER/mixedNumbersHeader' );
  var mixedNumbersTitleString = require( 'string!FRACTION_MATCHER/mixedNumbersTitle' );

  function MatchingGameView( model ) {
    ScreenView.call( this, { renderer: 'svg' } );

    var levelsContainerNode = new LevelsContainerNode( model );
    levelsContainerNode.visible = false;
    levelsContainerNode.x = model.width;

    var paginatorBox = new VBox( {centerX: model.width / 2, y: 10, spacing: 40, children: [
      // add header
      new Text( (model.game === mixedNumbersTitleString ? mixedNumbersHeaderString : matchingGameHeaderString), { font: new PhetFont( { size: 28, weight: 'bold'} )  } ),
      // add pagination
      new Paginator( model )
    ]} );
    var paginatorNode = new Node( {children: [
      paginatorBox,
      new ResetAllButton( {
        listener: function() {
          model.reset();
          model.levels.forEach( function( levelModel ) {
            levelModel.reset();
          } );
        },
        x: model.width - 40,
        y: model.height - 40
      } ),
      new TimerToggleButton( model.isTimerProperty, {x: 20, y: model.height - 120} ),
      new SoundToggleButton( model.isSoundProperty, {x: 20, y: model.height - 60} )
    ]} );

    this.addChild( levelsContainerNode );
    this.addChild( paginatorNode );

    var paginatorTween = new TWEEN.Tween( paginatorNode ).onComplete( function() {
      paginatorNode.visible = (paginatorNode.x === 0);
    } );
    var levelsTween = new TWEEN.Tween( levelsContainerNode ).onComplete( function() {
      levelsContainerNode.visible = (levelsContainerNode.x === 0);
    } );

    var animateToLevels = function() {
      paginatorTween.stop().to( {x: -model.width}, model.ANIMATION_TIME ).start();

      levelsContainerNode.visible = true;
      levelsTween.stop().to( {x: 0}, model.ANIMATION_TIME ).start();
    };

    var animateFromLevels = function() {
      levelsTween.stop().to( {x: model.width}, model.ANIMATION_TIME ).start();

      paginatorNode.visible = true;
      paginatorTween.stop().to( {x: 0}, model.ANIMATION_TIME ).start();
    };


    model.currentLevelProperty.lazyLink( function( newLevel ) {
      if ( newLevel > 0 ) {
        animateToLevels();
      }
      else {
        animateFromLevels();
      }
    } );


  }

  return inherit( ScreenView, MatchingGameView );
} );
