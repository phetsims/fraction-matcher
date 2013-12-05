// Copyright 2002-2013, University of Colorado Boulder

/**
 * The 'Matching Game' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var MatchingGameModel = require( 'FRACTION_MATCHER/MatchingGame/model/MatchingGameModel' ),
    MatchingGameView = require( 'FRACTION_MATCHER/MatchingGame/view/MatchingGameView' ),
    Image = require( 'SCENERY/nodes/Image' ),
    matchingGameTitleString = require( 'string!FRACTION_MATCHER/matchingGameTitle' ),
    ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' ),
    Screen = require( 'JOIST/Screen' ),
    inherit = require( 'PHET_CORE/inherit' ),
    ScreenView = require( 'JOIST/ScreenView' );

  function MatchingGameScreen() {

    var mvt = ModelViewTransform2.createIdentity();

    Screen.call( this,
      matchingGameTitleString,
      new Image( require( 'image!FRACTION_MATCHER/../images/MatchingGame-icon.png' ) ),
      function() { return new MatchingGameModel( ScreenView.LAYOUT_BOUNDS.width, ScreenView.LAYOUT_BOUNDS.height ); },
      function( model ) { return new MatchingGameView( model, mvt ); }
    );
  }

  return inherit( Screen, MatchingGameScreen );
} );