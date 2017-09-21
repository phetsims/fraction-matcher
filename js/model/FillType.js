// Copyright 2014-2016, University of Colorado Boulder

/**
 * Possible fill types in fraction games.
 *
 * @author Andrey Zelenkov (MLearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var fractionMatcher = require( 'FRACTION_MATCHER/fractionMatcher' );

  var FillType = Object.freeze( {
    SEQUENTIAL: 'sequential', // fills in order (left to right, etc)
    MIXED: 'mixed', // when number of shapes > 1, first shape will be completely filled and the 2nd shape will be random
    RANDOM: 'random' // when number of shapes > 1, all shapes will be randomized
  } );

  fractionMatcher.register( 'FillType', FillType );

  return FillType;
} );
