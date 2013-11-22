// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main entry point for the 'Fraction Matcher sim.
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var SimLauncher = require( 'JOIST/SimLauncher' ),
    Sim = require( 'JOIST/Sim' ),
    MatchingGameScreen = require( 'FRACTION_MATCHER/MatchingGame/MatchingGameScreen' ),
    MixedNumbersScreen = require( 'FRACTION_MATCHER/MixedNumbers/MixedNumbersScreen' ),
    simTitleString = require( 'string!FRACTION_MATCHER/simTitle' );
  var simOptions = {
    credits: 'PhET Development Team -\n' +
             'Lead Design: Ariel Paul\n' +
             'Software Development: Sam Reid\n' +
             'Design Team: Trish Loeblein, Kathy Perkins, Karina Hensberry, Mike Dubson\n' +
             'Interviews: Ariel Paul\n',
    thanks: 'Thanks -\n' +
            'Conversation of this simulation to HTML5 was funded by the Royal Society of Chemistry.'
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
    //Create and start the sim
    var sim = new Sim( simTitleString, [
      new MatchingGameScreen(),
      new MixedNumbersScreen()
    ], simOptions );
    sim.start();
  } );
} );
