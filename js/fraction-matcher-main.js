// Copyright 2013-2020, University of Colorado Boulder

/**
 * Main entry point for the 'Fraction Matcher sim.
 *
 * @author Anton Ulyanov
 * @author Andrew Zelenkov (Mlearner)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import fractionMatcherStrings from './fractionMatcherStrings.js';
import FractionsScreen from './view/FractionsScreen.js';
import MixedNumbersScreen from './view/MixedNumbersScreen.js';

const fractionMatcherTitleString = fractionMatcherStrings[ 'fraction-matcher' ].title;

// constants
const tandem = Tandem.ROOT;

const simOptions = {
  credits: {
    leadDesign: 'Ariel Paul',
    softwareDevelopment: 'Sam Reid',
    team: 'Michael Dubson, Karina K. R. Hensberry, Patricia Loeblein, Kathy Perkins, Noah Podolefsky',
    thanks: 'Thanks to Mobile Learner Labs for working with the PhET development team to convert this simulation to HTML5.'
  }
};

simLauncher.launch( () => {
  // create and start the sim
  new Sim( fractionMatcherTitleString, [
    new FractionsScreen( tandem.createTandem( 'fractionsScreen' ) ),
    new MixedNumbersScreen( tandem.createTandem( 'mixedNumbersScreen' ) )
  ], simOptions ).start();
} );