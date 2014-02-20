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
    Sound = require( 'VIBE/Sound' ),
    mixedNumbersTitleString = require( 'string!FRACTION_MATCHER/mixedNumbersTitle' );

  var correctAudio = require( 'audio!FRACTION_MATCHER/correctAnswer' ),
    wrongAudio = require( 'audio!FRACTION_MATCHER/wrongAnswer' );

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
    this.ANIMATION_TIME = 500;
    this.MAXIMUM_PAIRS = 6;

    this.sounds = {
      correct: new Sound( correctAudio ),
      incorrect: new Sound( wrongAudio )
    };

    this.levels = [];

    PropertySet.call( this, {
      currentLevel: 1,
      isLevelScreenActive: false,
      isSound: true,
      isTimer: false
    } );

    this.CONSTANTS.LEVEL_DESCRIPTION.forEach( function( levelDescription, index ) {
      self.levels.push( new LevelModel( self, levelDescription, index + 1 ) );
    } );

    this.currentLevelProperty.link( function( currentLevel ) {
      self.isLevelScreenActive = (currentLevel > 0);
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
    step: function( dt ) {
      if ( this.currentLevel > 0 ) {
        this.levels[this.currentLevel - 1].step( dt );
      }
    }
  } );

  return MatchingGameModel;
} );
