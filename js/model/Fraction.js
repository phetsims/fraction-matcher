// Copyright 2002-2014, University of Colorado Boulder

/**
 * fraction object with denominator and numerator for Fraction Matcher.
 *
 * @author Vasily Shakhov (Mlearner)
 */

define( function( require ) {
  'use strict';

  //imports
  var inherit = require( 'PHET_CORE/inherit' );

  var Fraction = function( numerator, denominator ) {
    this.numerator = numerator;
    this.denominator = denominator;
  };

  return inherit( Object, Fraction, {
    getValue: function() {
      return this.numerator / this.denominator;
    }
  }, {
    fraction: function( numerator, denominator ) {
      return new Fraction( numerator, denominator );
    }
  } );

} );