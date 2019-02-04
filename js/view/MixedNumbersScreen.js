// Copyright 2013-2018, University of Colorado Boulder

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
  const FractionMatcherModel = require( 'FRACTIONS_COMMON/matcher/model/FractionMatcherModel' );
  const FractionMatcherView = require( 'FRACTIONS_COMMON/matcher/view/FractionMatcherView' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const mixedNumbersTitleString = require( 'string!FRACTION_MATCHER/mixedNumbersTitle' );

  class MixedNumbersScreen extends Screen {
    /**
     * @param {Tandem} tandem
     * @param {Object} [options]
     */
    constructor( tandem, options ) {
      options = _.extend( {
        name: mixedNumbersTitleString,
        homeScreenIcon: FractionMatcherView.createMixedHomeIcon(),
        navigationBarIcon: FractionMatcherView.createMixedNavbarIcon(),
        tandem: tandem
      }, options );

      super( () => new FractionMatcherModel( true ),
             model => new FractionMatcherView( model ),
             options );
    }
  }

  return fractionMatcher.register( 'MixedNumbersScreen', MixedNumbersScreen );
} );