// Copyright 2013-2019, University of Colorado Boulder

/**
 * Main entry point for the 'Fraction Matcher sim.
 *
 * @author Anton Ulyanov (Mlearner)
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
  const fractionsTitleString = require( 'string!FRACTION_MATCHER/fractionsTitle' );

  class FractionsScreen extends Screen {
    /**
     * @param {Tandem} tandem
     * @param {Object} [options]
     */
    constructor( tandem, options ) {
      options = _.extend( {
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

  return fractionMatcher.register( 'FractionsScreen', FractionsScreen );
} );
