// Copyright 2013-2017, University of Colorado Boulder

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
  var Constants = require( 'FRACTION_MATCHER/model/Constants' );
  var fractionMatcher = require( 'FRACTION_MATCHER/fractionMatcher' );
  var FractionMatcherModel = require( 'FRACTION_MATCHER/model/FractionMatcherModel' );
  var FractionMatcherView = require( 'FRACTION_MATCHER/view/FractionMatcherView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var IntroHomeScreenIcon = require( 'FRACTION_MATCHER/view/IntroHomeScreenIcon' );
  var IntroNavigationBarIcon = require( 'FRACTION_MATCHER/view/IntroNavigationBarIcon' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var fractionsTitleString = require( 'string!FRACTION_MATCHER/fractionsTitle' );

  function FractionsScreen( tandem, options ) {

    options = _.extend( {
      name: fractionsTitleString,
      homeScreenIcon: new IntroHomeScreenIcon(),
      navigationBarIcon: new IntroNavigationBarIcon(),
      tandem: tandem
    }, options );

    Screen.call( this,
      function() { return new FractionMatcherModel( FractionMatcherView.LAYOUT_BOUNDS.width, FractionMatcherView.LAYOUT_BOUNDS.height, fractionsTitleString, new Constants(), false, false ); },
      function( model ) { return new FractionMatcherView( model ); },
      options );
  }

  fractionMatcher.register( 'FractionsScreen', FractionsScreen );

  return inherit( Screen, FractionsScreen );
} );