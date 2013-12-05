// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main entry point for the 'Fraction Matcher sim.
 *
 * @author Anton Ulyanov, Andrew Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var SimLauncher = require( 'JOIST/SimLauncher' ),
    Sim = require( 'JOIST/Sim' ),
    Screen = require( 'JOIST/Screen' ),
    Image = require( 'SCENERY/nodes/Image' ),
    ScreenView = require( 'JOIST/ScreenView' ),
    FractionMatcherModel = require( 'FRACTION_MATCHER/model/FractionMatcherModel' ),
    FractionMatcherView = require( 'FRACTION_MATCHER/view/FractionMatcherView' ),
    imageMixedNumber = require( 'image!FRACTION_MATCHER/../images/MixedNumbers-icon.jpg' ),
    imageMatchingGame = require( 'image!FRACTION_MATCHER/../images/MatchingGame-icon.png' ),
    mixedNumbersTitleString = require( 'string!FRACTION_MATCHER/mixedNumbersTitle' ),
    matchingGameTitleString = require( 'string!FRACTION_MATCHER/matchingGameTitle' ),
    simTitleString = require( 'string!FRACTION_MATCHER/simTitle' );

  var simOptions = {
    credits: '',
    thanks: ''
  };

  // Appending '?dev' to the URL will enable developer-only features.
  if ( window.phetcommon.getQueryParameter( 'dev' ) ) {
    simOptions = _.extend( {
      // add dev-specific options here
      showHomeScreen: false,
      screenIndex: 0
    }, simOptions );
  }

  SimLauncher.launch( function() {
    // create and start the sim
    new Sim( simTitleString, [
      new Screen( matchingGameTitleString, new Image( imageMatchingGame ),
        function() { return new FractionMatcherModel( ScreenView.LAYOUT_BOUNDS.width, ScreenView.LAYOUT_BOUNDS.height, matchingGameTitleString ); },
        function( model ) { return new FractionMatcherView( model ); }
      ),
      new Screen( mixedNumbersTitleString, new Image( imageMixedNumber ),
        function() { return new FractionMatcherModel( ScreenView.LAYOUT_BOUNDS.width, ScreenView.LAYOUT_BOUNDS.height, mixedNumbersTitleString ); },
        function( model ) { return new FractionMatcherView( model ); }
      )
    ], simOptions ).start();
  } );
} );
