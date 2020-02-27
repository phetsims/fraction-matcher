// Copyright 2013-2019, University of Colorado Boulder

/**
 * Main entry point for the 'Fraction Matcher sim.
 *
 * @author Anton Ulyanov
 * @author Andrew Zelenkov (Mlearner)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import MatchingGameModel from '../../../fractions-common/js/matching/model/MatchingGameModel.js';
import MatchingGameScreenView from '../../../fractions-common/js/matching/view/MatchingGameScreenView.js';
import Screen from '../../../joist/js/Screen.js';
import merge from '../../../phet-core/js/merge.js';
import fractionMatcherStrings from '../fraction-matcher-strings.js';
import fractionMatcher from '../fractionMatcher.js';

const mixedNumbersTitleString = fractionMatcherStrings.mixedNumbersTitle;

class MixedNumbersScreen extends Screen {
  /**
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( tandem, options ) {
    options = merge( {
      name: mixedNumbersTitleString,
      homeScreenIcon: MatchingGameScreenView.createMixedHomeIcon(),
      navigationBarIcon: MatchingGameScreenView.createMixedNavbarIcon(),
      tandem: tandem
    }, options );

    super( () => new MatchingGameModel( true ),
      model => new MatchingGameScreenView( model ),
      options );
  }
}

fractionMatcher.register( 'MixedNumbersScreen', MixedNumbersScreen );
export default MixedNumbersScreen;