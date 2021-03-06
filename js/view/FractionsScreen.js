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
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import merge from '../../../phet-core/js/merge.js';
import fractionMatcher from '../fractionMatcher.js';
import fractionMatcherStrings from '../fractionMatcherStrings.js';

const fractionsTitleString = fractionMatcherStrings.fractionsTitle;

class FractionsScreen extends Screen {
  /**
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( tandem, options ) {
    options = merge( {
      name: fractionsTitleString,
      homeScreenIcon: new ScreenIcon( MatchingGameScreenView.createIntroHomeIcon(), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      navigationBarIcon: new ScreenIcon( MatchingGameScreenView.createIntroNavbarIcon(), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      tandem: tandem
    }, options );

    super( () => new MatchingGameModel( false ),
      model => new MatchingGameScreenView( model ),
      options );
  }
}

fractionMatcher.register( 'FractionsScreen', FractionsScreen );
export default FractionsScreen;