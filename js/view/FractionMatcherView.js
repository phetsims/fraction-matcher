// Copyright 2002-2013, University of Colorado Boulder

/**
 * Scene graph for the 'Matching Game' screen.
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var Bounds2 = require( 'DOT/Bounds2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var PaginationNode = require( 'FRACTION_MATCHER/common/view/PaginationNode' );
  var Page1Node = require( 'FRACTION_MATCHER/view/Page1Node' );
  var ActionNode = require( 'FRACTION_MATCHER/view/ActionNode' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );

  /**
   * @param {BeersLawModel} model
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function MatchingGameView( model, mvt ) {

    var thisView = this;
    var pagination, action;
    ScreenView.call( thisView, { renderer: 'svg' } );
    thisView.addChild( pagination = new PaginationNode( model, [new Page1Node( model )], {} ) );
    thisView.addChild( action = new ActionNode( model ) );

    // add reset button
    this.addChild( new ResetAllButton( function() { model.reset(); }, { x: 1.4 * model.width, y: 1.3 * model.height} ) );

    model.actionProperty.link( function selectAction( value ) {
      pagination.setVisible( value === 0 );
      action.setVisible( value === 1 );
    } );
  }

  return inherit( ScreenView, MatchingGameView, { layoutBounds: new Bounds2( 0, 0, 1140, 700 ) } );
} );
