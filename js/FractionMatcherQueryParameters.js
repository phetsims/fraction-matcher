// Copyright 2017, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var fractionMatcher = require( 'FRACTION_MATCHER/fractionMatcher' );

  var FractionMatcherQueryParameters = window.QueryStringMachine.getAll( {

    /**
     * Hack level one on the fractions screen to only show shapes, and only show shapes that can be displayed with the
     * denominator given by this query parameter. The numerator is between 1 and 6 (see Level 1 in model/Constants.js).
     * For example ?testDenominator=5 will show a variety of shapes that are able to be drawn when fractions
     * have that denominator,
     * see https://github.com/phetsims/fraction-matcher/issues/101
     */
    testDenominator: {
      type: 'number',
      defaultValue: 0
    }
  } );

  fractionMatcher.register( 'FractionMatcherQueryParameters', FractionMatcherQueryParameters );

  return FractionMatcherQueryParameters;
} );