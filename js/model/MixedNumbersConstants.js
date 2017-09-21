// Copyright 2014-2017, University of Colorado Boulder

/**
 * General constants for Mixed Number Game, extends Constants.  See https://github.com/phetsims/fraction-matcher/issues/43
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Constants = require( 'FRACTION_MATCHER/model/Constants' );
  var Fraction = require( 'PHETCOMMON/model/Fraction' );
  var fractionMatcher = require( 'FRACTION_MATCHER/fractionMatcher' );
  var inherit = require( 'PHET_CORE/inherit' );

  function MixedNumbersConstants() {
    Constants.call( this );

    //mixed numbers added some more fractions or remove extra
    this.LEVEL_DESCRIPTION[ 0 ].fractions.pop();
    // add mixed fractions
    this.LEVEL_DESCRIPTION[ 0 ].fractions.push( new Fraction( 3, 2 ), new Fraction( 4, 3 ) );

    // level 2
    // add more mixed fractions
    this.LEVEL_DESCRIPTION[ 1 ].fractions.push( new Fraction( 3, 2 ), new Fraction( 4, 3 ), new Fraction( 5, 3 ), new Fraction( 5, 4 ), new Fraction( 6, 4 ), new Fraction( 6, 5 ) );

    // level 3
    // add more mixed fractions
    this.LEVEL_DESCRIPTION[ 2 ].fractions.push( new Fraction( 5, 3 ), new Fraction( 6, 5 ), new Fraction( 7, 5 ), new Fraction( 8, 5 ), new Fraction( 9, 5 ), new Fraction( 8, 6 ), new Fraction( 9, 6 ), new Fraction( 10, 6 ), new Fraction( 11, 6 ), new Fraction( 8, 7 ), new Fraction( 9, 7 ), new Fraction( 10, 7 ), new Fraction( 11, 7 ), new Fraction( 12, 7 ), new Fraction( 13, 7 ), new Fraction( 9, 8 ), new Fraction( 10, 8 ), new Fraction( 11, 8 ), new Fraction( 12, 8 ), new Fraction( 13, 8 ), new Fraction( 14, 8 ), new Fraction( 15, 8 ) );

    // level 4
    // remove one 13/7 fraction
    this.LEVEL_DESCRIPTION[ 3 ].fractions.shift();
    // add more mixed fractions
    this.LEVEL_DESCRIPTION[ 3 ].fractions.push( new Fraction( 6, 5 ), new Fraction( 7, 5 ), new Fraction( 8, 5 ), new Fraction( 7, 6 ), new Fraction( 8, 6 ), new Fraction( 9, 6 ), new Fraction( 10, 6 ), new Fraction( 11, 6 ), new Fraction( 8, 7 ), new Fraction( 10, 7 ), new Fraction( 11, 7 ), new Fraction( 12, 7 ), new Fraction( 10, 8 ), new Fraction( 11, 8 ), new Fraction( 12, 8 ), new Fraction( 13, 8 ), new Fraction( 15, 8 ), new Fraction( 10, 9 ), new Fraction( 11, 9 ), new Fraction( 12, 9 ), new Fraction( 13, 9 ), new Fraction( 14, 9 ), new Fraction( 15, 9 ), new Fraction( 16, 9 ), new Fraction( 17, 9 ) );
    this.LEVEL_DESCRIPTION[ 3 ].numericScaleFactors = [ 1 ];

    // level 5
    this.LEVEL_DESCRIPTION[ 4 ].fractions = this.LEVEL_DESCRIPTION[ 3 ].fractions.slice( 0 );

    // level 6
    // add more mixed fractions
    this.LEVEL_DESCRIPTION[ 5 ].fractions.push( new Fraction( 10, 6 ), new Fraction( 11, 6 ), new Fraction( 8, 7 ), new Fraction( 11, 7 ), new Fraction( 12, 7 ), new Fraction( 12, 8 ), new Fraction( 13, 8 ), new Fraction( 15, 8 ), new Fraction( 12, 9 ), new Fraction( 13, 9 ), new Fraction( 14, 9 ), new Fraction( 15, 9 ), new Fraction( 16, 9 ), new Fraction( 17, 9 ) );

    // level 7
    // add more mixed fractions
    this.LEVEL_DESCRIPTION[ 6 ].fractions.push( new Fraction( 8, 6 ), new Fraction( 9, 6 ), new Fraction( 10, 6 ), new Fraction( 8, 7 ), new Fraction( 9, 7 ), new Fraction( 10, 7 ), new Fraction( 11, 7 ), new Fraction( 12, 7 ), new Fraction( 13, 7 ), new Fraction( 9, 8 ), new Fraction( 10, 8 ), new Fraction( 11, 8 ), new Fraction( 12, 8 ), new Fraction( 13, 8 ), new Fraction( 14, 8 ), new Fraction( 15, 8 ), new Fraction( 10, 9 ), new Fraction( 11, 9 ), new Fraction( 12, 9 ), new Fraction( 13, 9 ), new Fraction( 14, 9 ), new Fraction( 15, 9 ), new Fraction( 16, 9 ), new Fraction( 17, 9 ) );
    this.LEVEL_DESCRIPTION[ 6 ].numericScaleFactors = [ 3, 6, 7 ];

    // level 8
    // add more mixed fractions
    this.LEVEL_DESCRIPTION[ 7 ].fractions.push( new Fraction( 6, 5 ), new Fraction( 7, 5 ), new Fraction( 8, 5 ), new Fraction( 9, 5 ), new Fraction( 7, 6 ), new Fraction( 8, 6 ), new Fraction( 9, 6 ), new Fraction( 10, 6 ), new Fraction( 11, 6 ) );
    this.LEVEL_DESCRIPTION[ 7 ].numericScaleFactors = [ 3, 4, 5, 6, 7, 8, 9 ];
  }

  fractionMatcher.register( 'MixedNumbersConstants', MixedNumbersConstants );

  return inherit( Constants, MixedNumbersConstants );
} );