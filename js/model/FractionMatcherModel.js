// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model container for the 'Matching Game' screen.
 *
 * @author Anton Ulyanov, Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    PropertySet = require( 'AXON/PropertySet' ),
    Constants = require( 'FRACTION_MATCHER/model/Constants' ),
    LevelModel = require( 'FRACTION_MATCHER/model/LevelModel' ),
    mixedNumbersTitleString = require( 'string!FRACTION_MATCHER/mixedNumbersTitle' );

  function MatchingGameModel( width, height, game ) {
    var self = this,
      CONSTANTS = new Constants( game );

    // dimensions of the model's space
    this.width = width;
    this.height = height;

    this.game = game;
    this.CONSTANTS = CONSTANTS;
    this.colorScheme = [CONSTANTS.COLORS.LIGHT_BLUE, CONSTANTS.COLORS.LIGHT_GREEN, CONSTANTS.COLORS.LIGHT_RED];
    this.toSimplify = (this.game === mixedNumbersTitleString); // flag for simplifying number shapes

    this.levels = [];

    PropertySet.call( this, {
      level: -1,
      action: 0,
      currentLevel: 0,
      changeStatus: false
    } );

    this.CONSTANTS.LEVEL_DESCRIPTION.forEach( function( levelDescription ) {
      self.levels.push( new LevelModel( self, levelDescription ) );
    } );


    /*    this.buttonStatusProperty.link( function updateButtonStatus() {
     if ( self.currentLevel > 0 ) {
     self.levelStatus[self.currentLevel].buttonStatus = self.buttonStatus;
     }
     } );

     this.canDragProperty.link( function updateCanDragStatus() {
     if ( self.currentLevel > 0 ) {
     self.levelStatus[self.currentLevel].canDrag = self.canDrag;
     }
     } );*/

    /*this.levelProperty.link( function( level ) {
     self.setLevel( level );
     } );*/
  }

  inherit( PropertySet, MatchingGameModel, {
    // Resets all model elements
    reset: function() {
      PropertySet.prototype.reset.call( this );
    },
    step: function() {},

    setLevel: function( level ) {
      this.currentLevel = level;
    }
  } );

  return MatchingGameModel;
} );
