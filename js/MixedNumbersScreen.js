// Copyright 2002-2014, University of Colorado Boulder

/**
 * Main entry point for the 'Fraction Matcher sim.
 *
 * @author Anton Ulyanov, Andrew Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // modules
  var Screen = require( 'JOIST/Screen' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var FractionMatcherModel = require( 'FRACTION_MATCHER/model/FractionMatcherModel' );
  var FractionMatcherView = require( 'FRACTION_MATCHER/view/FractionMatcherView' );
  var MixedNumbersConstants = require( 'FRACTION_MATCHER/model/MixedNumbersConstants' );
  var MixedNumbersIcon = require( 'FRACTION_MATCHER/view/MixedNumbersIcon' );
  var inherit = require( 'PHET_CORE/inherit' );

  // strings
  var mixedNumbersTitleString = require( 'string!FRACTION_MATCHER/mixedNumbersTitle' );

  function IntroScreen() {
    Screen.call( this, mixedNumbersTitleString, new MixedNumbersIcon(),
      function() { return new FractionMatcherModel( ScreenView.DEFAULT_LAYOUT_BOUNDS.width, ScreenView.DEFAULT_LAYOUT_BOUNDS.height, mixedNumbersTitleString, MixedNumbersConstants, true ); },
      function( model ) { return new FractionMatcherView( model ); }
    );
  }

  return inherit( Screen, IntroScreen );
} );