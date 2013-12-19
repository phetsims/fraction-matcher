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
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    matchingGameHeaderString = require( 'string!FRACTION_MATCHER/matchingGameHeader' ),
    mixedNumbersHeaderString = require( 'string!FRACTION_MATCHER/mixedNumbersHeader' ),
    mixedNumbersTitleString = require( 'string!FRACTION_MATCHER/mixedNumbersTitle' ),
    Pagination = require( 'FRACTION_MATCHER/view/Pagination' ),
    ActionNode = require( 'FRACTION_MATCHER/view/ActionNode' ),
    ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );

  function MatchingGameView( model ) {
    var pagination, action, header;
    ScreenView.call( this, { renderer: 'svg' } );
    this.addChild( pagination = new Pagination( model ) );
    this.addChild( action = new ActionNode( model ) );

    // add header
    this.addChild( header = new Text( (model.game === mixedNumbersTitleString ? mixedNumbersHeaderString : matchingGameHeaderString), { font: new PhetFont( { size: 40, weight: "bold"} ), centerX: 1140 / 2, centerY: 40  } ) );

    // add reset button
    this.addChild( new ResetAllButton( function() { model.reset(); }, { x: 1.4 * model.width, y: 1.3 * model.height} ) );

    model.actionProperty.link( function selectAction( value ) {
      pagination.setVisible( value === 0 );
      header.setVisible( value === 0 );
      action.setVisible( value === 1 );
    } );
  }

  return inherit( ScreenView, MatchingGameView, { layoutBounds: new Bounds2( 0, 0, 1140, 700 ) } );
} );
