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
  var fractionMatcher = require( 'FRACTION_MATCHER/fractionMatcher' );
  var FractionMatcherModel = require( 'FRACTIONS_COMMON/matcher/model/FractionMatcherModel' );
  var FractionMatcherView = require( 'FRACTIONS_COMMON/matcher/view/FractionMatcherView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var IntroHomeScreenIcon = require( 'FRACTIONS_COMMON/matcher/view/IntroHomeScreenIcon' );
  var IntroNavigationBarIcon = require( 'FRACTIONS_COMMON/matcher/view/IntroNavigationBarIcon' );
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
      function() { return new FractionMatcherModel( false ); },
      function( model ) { return new FractionMatcherView( model ); },
      options );
  }

  fractionMatcher.register( 'FractionsScreen', FractionsScreen );

  return inherit( Screen, FractionsScreen );
} );