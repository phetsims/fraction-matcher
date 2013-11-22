// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model container for the 'Mixed Numbers' screen.
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports

  /**
   * @param {ModelViewTransform2} mvt
   * @constructor
   */
  function MixedNumbersModel( mvt ) {

  }

  MixedNumbersModel.prototype = {

    // Resets all model elements
    reset: function() {
    },

    /*
     * Moves time forward by the specified amount.
     * @param {Number} deltaSeconds clock time change, in seconds.
     */
    step: function( dt ) {
      // do nothing, nothing time-based in this model
    }
  };

  return MixedNumbersModel;
} );
