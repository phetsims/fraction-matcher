// Copyright 2013-2020, University of Colorado Boulder

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
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import merge from '../../../phet-core/js/merge.js';
import fractionMatcher from '../fractionMatcher.js';
import fractionMatcherStrings from '../fractionMatcherStrings.js';

const mixedNumbersTitleString = fractionMatcherStrings.mixedNumbersTitle;

class MixedNumbersScreen extends Screen {
  /**
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( tandem, options ) {
    options = merge( {
      name: mixedNumbersTitleString,
      homeScreenIcon: new ScreenIcon( MatchingGameScreenView.createMixedHomeIcon(), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      navigationBarIcon: new ScreenIcon( MatchingGameScreenView.createMixedNavbarIcon(), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      tandem: tandem
    }, options );

    super( () => new MatchingGameModel( true ),
      model => new MatchingGameScreenView( model ),
      options );
  }
}

fractionMatcher.register( 'MixedNumbersScreen', MixedNumbersScreen );
export default MixedNumbersScreen;