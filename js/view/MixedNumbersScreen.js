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
  var fractionMatcher = require( 'FRACTION_MATCHER/fractionMatcher' );
  var FractionMatcherModel = require( 'FRACTIONS_COMMON/matcher/model/FractionMatcherModel' );
  var FractionMatcherView = require( 'FRACTIONS_COMMON/matcher/view/FractionMatcherView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MixedNumbersHomeScreenIcon = require( 'FRACTIONS_COMMON/matcher/view/MixedNumbersHomeScreenIcon' );
  var MixedNumbersNavigationBarIcon = require( 'FRACTIONS_COMMON/matcher/view/MixedNumbersNavigationBarIcon' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var mixedNumbersTitleString = require( 'string!FRACTION_MATCHER/mixedNumbersTitle' );

  function MixedNumbersScreen( tandem ) {

    var options = {
      name: mixedNumbersTitleString,
      homeScreenIcon: new MixedNumbersHomeScreenIcon(),
      navigationBarIcon: new MixedNumbersNavigationBarIcon(),
      tandem: tandem
    };

    Screen.call( this,
      function() { return new FractionMatcherModel( true ); },
      function( model ) { return new FractionMatcherView( model ); },
      options );
  }

  fractionMatcher.register( 'MixedNumbersScreen', MixedNumbersScreen );

  return inherit( Screen, MixedNumbersScreen );
} );