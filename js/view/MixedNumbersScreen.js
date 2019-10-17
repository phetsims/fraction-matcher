// Copyright 2013-2019, University of Colorado Boulder

/**
 * Main entry point for the 'Fraction Matcher sim.
 *
 * @author Anton Ulyanov
 * @author Andrew Zelenkov (Mlearner)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const fractionMatcher = require( 'FRACTION_MATCHER/fractionMatcher' );
  const MatchingGameModel = require( 'FRACTIONS_COMMON/matching/model/MatchingGameModel' );
  const MatchingGameScreenView = require( 'FRACTIONS_COMMON/matching/view/MatchingGameScreenView' );
  const merge = require( 'PHET_CORE/merge' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const mixedNumbersTitleString = require( 'string!FRACTION_MATCHER/mixedNumbersTitle' );

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

  return fractionMatcher.register( 'MixedNumbersScreen', MixedNumbersScreen );
} );