// Copyright 2002-2013, University of Colorado Boulder

/**
 * Scene graph for the 'Matching Game' screen.
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var Bounds2 = require( 'DOT/Bounds2' ),
    inherit = require( 'PHET_CORE/inherit' ),
    ScreenView = require( 'JOIST/ScreenView' ),
    VBox = require( 'SCENERY/nodes/VBox' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    Node = require( "SCENERY/nodes/Node" ),
    matchingGameHeaderString = require( 'string!FRACTION_MATCHER/matchingGameHeader' ),
    mixedNumbersHeaderString = require( 'string!FRACTION_MATCHER/mixedNumbersHeader' ),
    mixedNumbersTitleString = require( 'string!FRACTION_MATCHER/mixedNumbersTitle' ),
    Paginator = require( 'FRACTION_MATCHER/view/Paginator' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    LevelsContainerNode = require( 'FRACTION_MATCHER/view/LevelsContainerNode' ),
    ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );

  function MatchingGameView( model ) {
    ScreenView.call( this, { renderer: 'svg' } );

    this.addChild( new Rectangle( 0, 0, 768, 504, {fill: '#eee'} ) );

    var levelsContainerNode = new LevelsContainerNode( model );


    var paginatorBox = new VBox( {centerX: model.width / 2, y: 25, spacing: 20, children: [
      // add header
      new Text( (model.game === mixedNumbersTitleString ? mixedNumbersHeaderString : matchingGameHeaderString), { font: new PhetFont( { size: 36, weight: 'bold'} )  } ),
      // add pagination
      new Paginator( model )
    ]} );
    var paginatorNode = new Node({children:[
      paginatorBox,
      new ResetAllButton( function() { model.reset(); }, { x: model.width - 40, y: model.height - 40} )
    ]});

    this.addChild( levelsContainerNode );
    this.addChild( paginatorNode );

    model.isLevelScreenActiveProperty.link( function( isActive ) {
      paginatorNode.visible = !isActive;
      levelsContainerNode.visible = isActive;
    } );


  }

  return inherit( ScreenView, MatchingGameView );
} );
