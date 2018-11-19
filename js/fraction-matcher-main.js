// Copyright 2013-2018, University of Colorado Boulder

/**
 * Main entry point for the 'Fraction Matcher sim.
 *
 * @author Anton Ulyanov
 * @author Andrew Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var FractionsScreen = require( 'FRACTION_MATCHER/view/FractionsScreen' );
  var MixedNumbersScreen = require( 'FRACTION_MATCHER/view/MixedNumbersScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Tandem = require( 'TANDEM/Tandem' );

  // strings
  var fractionMatcherTitleString = require( 'string!FRACTION_MATCHER/fraction-matcher.title' );

  // constants
  var tandem = Tandem.rootTandem;

  var simOptions = {
    credits: {
      leadDesign: 'Ariel Paul',
      softwareDevelopment: 'Sam Reid',
      team: 'Michael Dubson, Karina K. R. Hensberry, Patricia Loeblein, Kathy Perkins, Noah Podolefsky',
      thanks: 'Thanks to Mobile Learner Labs for working with the PhET development team to convert this simulation to HTML5.'
    }
  };

  SimLauncher.launch( function() {
    // create and start the sim
    new Sim( fractionMatcherTitleString, [
      new FractionsScreen( tandem.createTandem( 'fractionsScreen' ) ),
      new MixedNumbersScreen( tandem.createTandem( 'mixedNumbersScreen' ) )
    ], simOptions ).start();
  } );
} );