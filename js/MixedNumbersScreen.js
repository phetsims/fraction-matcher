// Copyright 2013-2017, University of Colorado Boulder

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
  var FractionMatcherModel = require( 'FRACTION_MATCHER/model/FractionMatcherModel' );
  var FractionMatcherView = require( 'FRACTION_MATCHER/view/FractionMatcherView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MixedNumbersConstants = require( 'FRACTION_MATCHER/model/MixedNumbersConstants' );
  var MixedNumbersHomeScreenIcon = require( 'FRACTION_MATCHER/view/MixedNumbersHomeScreenIcon' );
  var MixedNumbersNavigationBarIcon = require( 'FRACTION_MATCHER/view/MixedNumbersNavigationBarIcon' );
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
      function() { return new FractionMatcherModel( FractionMatcherView.LAYOUT_BOUNDS.width, FractionMatcherView.LAYOUT_BOUNDS.height, mixedNumbersTitleString, new MixedNumbersConstants(), true, true ); },
      function( model ) { return new FractionMatcherView( model ); },
      options );
  }

  fractionMatcher.register( 'MixedNumbersScreen', MixedNumbersScreen );

  return inherit( Screen, MixedNumbersScreen );
} );