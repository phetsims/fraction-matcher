// Copyright 2002-2014, University of Colorado Boulder

/**
 * Main entry point for the 'Fraction Matcher sim.
 *
 * @author Anton Ulyanov, Andrew Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // modules
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Sim = require( 'JOIST/Sim' );
  var Screen = require( 'JOIST/Screen' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var FractionMatcherModel = require( 'FRACTION_MATCHER/model/FractionMatcherModel' );
  var FractionMatcherView = require( 'FRACTION_MATCHER/view/FractionMatcherView' );

  // images
  var imageMixedNumber = require( 'image!FRACTION_MATCHER/../images/MixedNumbers-icon.png' );
  var imageMatchingGame = require( 'image!FRACTION_MATCHER/../images/MatchingGame-icon.png' );

  // strings
  var mixedNumbersTitleString = require( 'string!FRACTION_MATCHER/mixedNumbersTitle' );
  var matchingGameTitleString = require( 'string!FRACTION_MATCHER/matchingGameTitle' );
  var simTitleString = require( 'string!FRACTION_MATCHER/simTitle' );

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
        function() { return new FractionMatcherModel( ScreenView.DEFAULT_LAYOUT_BOUNDS.width, ScreenView.DEFAULT_LAYOUT_BOUNDS.height, matchingGameTitleString ); },
        function( model ) { return new FractionMatcherView( model ); }
      ),
      new Screen( mixedNumbersTitleString, new Image( imageMixedNumber ),
        function() { return new FractionMatcherModel( ScreenView.DEFAULT_LAYOUT_BOUNDS.width, ScreenView.DEFAULT_LAYOUT_BOUNDS.height, mixedNumbersTitleString ); },
        function( model ) { return new FractionMatcherView( model ); }
      )
    ], simOptions ).start();
  } );
} );
