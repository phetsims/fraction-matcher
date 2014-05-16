// Copyright 2002-2014, University of Colorado Boulder


/**
 * General constants for Mixed Number Game, extends Constants.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var CONSTANTS = require( 'FRACTION_MATCHER/model/Constants' );

  var MixedNumbersConstantsConstants = _.cloneDeep( CONSTANTS );

  //mixed numbers added some more fractions or remove extra
  MixedNumbersConstantsConstants.LEVEL_DESCRIPTION[0].fractions.pop();
  // add mixed fractions
  MixedNumbersConstantsConstants.LEVEL_DESCRIPTION[0].fractions.push( [3, 2], [4, 3] );

  // level 2
  // add more mixed fractions
  MixedNumbersConstantsConstants.LEVEL_DESCRIPTION[1].fractions.push( [3, 2], [4, 3], [5, 3], [5, 4], [6, 4], [6, 5] );

  // level 3
  // add more mixed fractions
  MixedNumbersConstantsConstants.LEVEL_DESCRIPTION[2].fractions.push( [5, 3], [6, 5], [7, 5], [8, 5], [9, 5], [8, 6], [9, 6], [10, 6], [11, 6], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [15, 8] );

  // level 4
  // remove one 13/7 fraction
  MixedNumbersConstantsConstants.LEVEL_DESCRIPTION[3].fractions.shift();
  // add more mixed fractions
  MixedNumbersConstantsConstants.LEVEL_DESCRIPTION[3].fractions.push( [6, 5], [7, 5], [8, 5], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [8, 7], [10, 7], [11, 7], [12, 7], [10, 8], [11, 8], [12, 8], [13, 8], [15, 8], [10, 9], [11, 9], [12, 9], [13, 9], [14, 9], [15, 9], [16, 9], [17, 9] );
  MixedNumbersConstantsConstants.LEVEL_DESCRIPTION[3].numericScaleFactors = [1];

  // level 5
  MixedNumbersConstantsConstants.LEVEL_DESCRIPTION[4].fractions = MixedNumbersConstantsConstants.LEVEL_DESCRIPTION[3].fractions.slice( 0 );

  // level 6
  // add more mixed fractions
  MixedNumbersConstantsConstants.LEVEL_DESCRIPTION[5].fractions.push( [10, 6], [11, 6], [8, 7], [11, 7], [12, 7], [12, 8], [13, 8], [15, 8], [12, 9], [13, 9], [14, 9], [15, 9], [16, 9], [17, 9] );

  // level 7
  // add more mixed fractions
  MixedNumbersConstantsConstants.LEVEL_DESCRIPTION[6].fractions.push( [8, 6], [9, 6], [10, 6], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [15, 8], [10, 9], [11, 9], [12, 9], [13, 9], [14, 9], [15, 9], [16, 9], [17, 9] );
  MixedNumbersConstantsConstants.LEVEL_DESCRIPTION[6].numericScaleFactors = [3, 6, 7];

  // level 8
  // add more mixed fractions
  MixedNumbersConstantsConstants.LEVEL_DESCRIPTION[7].fractions.push( [6, 5], [7, 5], [8, 5], [9, 5], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6] );
  MixedNumbersConstantsConstants.LEVEL_DESCRIPTION[7].numericScaleFactors = [3, 4, 5, 6, 7, 8, 9];

  return MixedNumbersConstantsConstants;
} );