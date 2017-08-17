// Copyright 2016-2017, University of Colorado Boulder

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

    // Show all of the shapes side by side for size comparison, see https://github.com/phetsims/fraction-matcher/issues/101
    displayAllShapes: {
      type: 'flag'
    }
  } );

  fractionMatcher.register( 'FractionMatcherQueryParameters', FractionMatcherQueryParameters );

  return FractionMatcherQueryParameters;
} );