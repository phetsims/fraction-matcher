// Copyright 2002-2014, University of Colorado Boulder

/**
 * Object for working with score in 'Fraction Matcher' and 'Build a Fraction Game'
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  var ObservableArray = require( 'AXON/ObservableArray' );
  var inherit = require( 'PHET_CORE/inherit' );

  function ScoreSet( levels ) {
    ObservableArray.call( this );
    this._array = Array.apply( null, new Array( levels ) ).map( function() {return 0;} );
  }

  return inherit( ObservableArray, ScoreSet, {
    // get score of given level
    get: function( level ) {
      return this._array[level];
    },
    // set score of given level
    set: function( level, score ) {
      this._array[level] = score;
      this._fireItemAdded( level );
    }
  } );
} );