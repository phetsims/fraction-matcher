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
  const FractionsScreen = require( 'FRACTION_MATCHER/view/FractionsScreen' );
  const FractionsScreen2 = require( 'FRACTION_MATCHER/view/FractionsScreen2' );
  const MixedNumbersScreen = require( 'FRACTION_MATCHER/view/MixedNumbersScreen' );
  const MixedNumbersScreen2 = require( 'FRACTION_MATCHER/view/MixedNumbersScreen2' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const Tandem = require( 'TANDEM/Tandem' );

  // strings
  const fractionMatcherTitleString = require( 'string!FRACTION_MATCHER/fraction-matcher.title' );

  // constants
  const tandem = Tandem.rootTandem;

  const simOptions = {
    credits: {
      leadDesign: 'Ariel Paul',
      softwareDevelopment: 'Sam Reid',
      team: 'Michael Dubson, Karina K. R. Hensberry, Patricia Loeblein, Kathy Perkins, Noah Podolefsky',
      thanks: 'Thanks to Mobile Learner Labs for working with the PhET development team to convert this simulation to HTML5.'
    }
  };

  SimLauncher.launch( () => {
    // create and start the sim
    new Sim( fractionMatcherTitleString, [
      new FractionsScreen( tandem.createTandem( 'fractionsScreen' ) ),
      new MixedNumbersScreen( tandem.createTandem( 'mixedNumbersScreen' ) ),
      new FractionsScreen2( tandem.createTandem( 'fractionsScreen2' ) ),
      new MixedNumbersScreen2( tandem.createTandem( 'mixedNumbersScreen2' ) )
    ], simOptions ).start();
  } );
} );