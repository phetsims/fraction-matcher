// Copyright 2013-2019, University of Colorado Boulder

/**
 * Main entry point for the 'Fraction Matcher sim.
 *
 * @author Anton Ulyanov
 * @author Andrew Zelenkov (Mlearner)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  const fractionMatcher = require( 'FRACTION_MATCHER/fractionMatcher' );
  const MatchingGameModel = require( 'FRACTIONS_COMMON/matching/model/MatchingGameModel' );
  const MatchingGameScreenView = require( 'FRACTIONS_COMMON/matching/view/MatchingGameScreenView' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const mixedNumbersTitleString = require( 'string!FRACTION_MATCHER/mixedNumbersTitle' );

  class MixedNumbersScreen2 extends Screen {
    /**
     * @param {Tandem} tandem
     * @param {Object} [options]
     */
    constructor( tandem, options ) {
      options = _.extend( {
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

  return fractionMatcher.register( 'MixedNumbersScreen2', MixedNumbersScreen2 );
} );