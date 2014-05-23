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
  var Constants = require( 'FRACTION_MATCHER/model/Constants' );
  var IntroIcon = require( 'FRACTION_MATCHER/view/IntroIcon' );
  var inherit = require( 'PHET_CORE/inherit' );

  // strings
  var matchingGameTitleString = require( 'string!FRACTION_MATCHER/introTitle' );

  function IntroScreen() {
    Screen.call( this, matchingGameTitleString, new IntroIcon(),
      function() { return new FractionMatcherModel( ScreenView.DEFAULT_LAYOUT_BOUNDS.width, ScreenView.DEFAULT_LAYOUT_BOUNDS.height, matchingGameTitleString, Constants, false ); },
      function( model ) { return new FractionMatcherView( model ); }
    );
  }

  return inherit( Screen, IntroScreen );
} );