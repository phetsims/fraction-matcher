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
  var IntroScreen = require( 'FRACTION_MATCHER/IntroScreen' );
  var MixedNumbersScreen = require( 'FRACTION_MATCHER/MixedNumbersScreen' );

  // strings
  var simTitleString = require( 'string!FRACTION_MATCHER/simTitle' );

  var simOptions = {
    credits: '',
    thanks: ''
  };

  SimLauncher.launch( function() {
    // create and start the sim
    new Sim( simTitleString, [
      new IntroScreen(),
      new MixedNumbersScreen()
    ], simOptions ).start();
  } );
} );