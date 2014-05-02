// Copyright 2002-2014, University of Colorado Boulder

/**
 * Scene graph for the 'Matching Game' screen.
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    ScreenView = require( 'JOIST/ScreenView' ),
    VBox = require( 'SCENERY/nodes/VBox' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    Node = require( "SCENERY/nodes/Node" ),
    matchingGameHeaderString = require( 'string!FRACTION_MATCHER/matchingGameHeader' ),
    mixedNumbersHeaderString = require( 'string!FRACTION_MATCHER/mixedNumbersHeader' ),
    mixedNumbersTitleString = require( 'string!FRACTION_MATCHER/mixedNumbersTitle' ),
    Paginator = require( 'FRACTION_MATCHER/view/Paginator' ),
    LevelsContainerNode = require( 'FRACTION_MATCHER/view/LevelsContainerNode' ),
    SoundToggleButtonDeprecated = require( 'SCENERY_PHET/SoundToggleButtonDeprecated' ),
    TimerToggleButtonDeprecated = require( 'SCENERY_PHET/TimerToggleButtonDeprecated' ),
    ResetAllButtonDeprecated = require( 'SCENERY_PHET/ResetAllButtonDeprecated' );

  function MatchingGameView( model ) {
    ScreenView.call( this, { renderer: 'svg' } );

    var levelsContainerNode = new LevelsContainerNode( model );

    var paginatorBox = new VBox( {centerX: model.width / 2, y: 10, spacing: 40, children: [
      // add header
      new Text( (model.game === mixedNumbersTitleString ? mixedNumbersHeaderString : matchingGameHeaderString), { font: new PhetFont( { size: 28, weight: 'bold'} )  } ),
      // add pagination
      new Paginator( model )
    ]} );
    var paginatorNode = new Node( {children: [
      paginatorBox,
      new ResetAllButtonDeprecated( function() {
        model.reset();
        model.levels.forEach( function( levelModel ) {
          levelModel.reset();
        } );
      }, { x: model.width - 40, y: model.height - 40} ),
      new TimerToggleButtonDeprecated( model.isTimerProperty, {x: 20, y: model.height - 120} ),
      new SoundToggleButtonDeprecated( model.isSoundProperty, {x: 20, y: model.height - 60} )
    ]} );

    this.addChild( levelsContainerNode );
    this.addChild( paginatorNode );

    model.isLevelScreenActiveProperty.link( function( isActive ) {
      paginatorNode.visible = !isActive;
      levelsContainerNode.visible = isActive;
    } );


  }

  return inherit( ScreenView, MatchingGameView );
} );
