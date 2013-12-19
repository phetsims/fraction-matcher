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
    PaginationNode = require( 'FRACTION_MATCHER/common/view/PaginationNode' ),
    Page1Node = require( 'FRACTION_MATCHER/view/Page1Node' ),
    ActionNode = require( 'FRACTION_MATCHER/view/ActionNode' ),
    ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );

  function MatchingGameView( model ) {
    var pagination, action;
    ScreenView.call( this, { renderer: 'svg' } );
    this.addChild( pagination = new PaginationNode( model, [new Page1Node( model )], {} ) );
    this.addChild( action = new ActionNode( model ) );

    // add reset button
    this.addChild( new ResetAllButton( function() { model.reset(); }, { x: 1.4 * model.width, y: 1.3 * model.height} ) );

    model.actionProperty.link( function selectAction( value ) {
      pagination.setVisible( value === 0 );
      action.setVisible( value === 1 );
    } );
  }

  return inherit( ScreenView, MatchingGameView, { layoutBounds: new Bounds2( 0, 0, 1140, 700 ) } );
} );
