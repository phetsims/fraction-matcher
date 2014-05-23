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
  var Constants = require( 'FRACTION_MATCHER/model/Constants' );
  var MixedNumbersConstants = require( 'FRACTION_MATCHER/model/MixedNumbersConstants' );
  var IntroIcon = require( 'FRACTION_MATCHER/view/IntroIcon' );
  var MixedNumbersIcon = require( 'FRACTION_MATCHER/view/MixedNumbersIcon' );

  // strings
  var mixedNumbersTitleString = require( 'string!FRACTION_MATCHER/mixedNumbersTitle' );
  var matchingGameTitleString = require( 'string!FRACTION_MATCHER/introTitle' );
  var simTitleString = require( 'string!FRACTION_MATCHER/simTitle' );

  var simOptions = {
    credits: '',
    thanks: ''
  };

  SimLauncher.launch( function() {
    // create and start the sim
    new Sim( simTitleString, [
      new Screen( matchingGameTitleString, new IntroIcon(),
        function() { return new FractionMatcherModel( ScreenView.DEFAULT_LAYOUT_BOUNDS.width, ScreenView.DEFAULT_LAYOUT_BOUNDS.height, matchingGameTitleString, Constants, false ); },
        function( model ) { return new FractionMatcherView( model ); }
      ),
      new Screen( mixedNumbersTitleString, new MixedNumbersIcon(),
        function() { return new FractionMatcherModel( ScreenView.DEFAULT_LAYOUT_BOUNDS.width, ScreenView.DEFAULT_LAYOUT_BOUNDS.height, mixedNumbersTitleString, MixedNumbersConstants, true ); },
        function( model ) { return new FractionMatcherView( model ); }
      )
    ], simOptions ).start();
  } );
} );
