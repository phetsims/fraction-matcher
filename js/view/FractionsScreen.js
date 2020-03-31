// Copyright 2013-2020, University of Colorado Boulder

/**
 * Main entry point for the 'Fraction Matcher sim.
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Andrew Zelenkov (Mlearner)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import MatchingGameModel from '../../../fractions-common/js/matching/model/MatchingGameModel.js';
import MatchingGameScreenView from '../../../fractions-common/js/matching/view/MatchingGameScreenView.js';
import Screen from '../../../joist/js/Screen.js';
import merge from '../../../phet-core/js/merge.js';
import fractionMatcherStrings from '../fractionMatcherStrings.js';
import fractionMatcher from '../fractionMatcher.js';

const fractionsTitleString = fractionMatcherStrings.fractionsTitle;

class FractionsScreen extends Screen {
  /**
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( tandem, options ) {
    options = merge( {
      name: fractionsTitleString,
      homeScreenIcon: MatchingGameScreenView.createIntroHomeIcon(),
      navigationBarIcon: MatchingGameScreenView.createIntroNavbarIcon(),
      tandem: tandem
    }, options );

    super( () => new MatchingGameModel( false ),
      model => new MatchingGameScreenView( model ),
      options );
  }
}

fractionMatcher.register( 'FractionsScreen', FractionsScreen );
export default FractionsScreen;