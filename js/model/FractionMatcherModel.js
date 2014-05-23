// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model container for the game screen.
 *
 * @author Anton Ulyanov, Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Property = require( 'AXON/Property' );
  var LevelModel = require( 'FRACTION_MATCHER/model/LevelModel' );
  var Sound = require( 'VIBE/Sound' );

  // audio
  var correctAudio = require( 'audio!VEGAS/correctAnswer' );
  var wrongAudio = require( 'audio!VEGAS/incorrectAnswer' );

  function FractionMatcherModel( width, height, game, CONSTANTS, // flag for simplifying number shapes
                                 toSimplify ) {
    var self = this;

    // dimensions of the model's space
    this.width = width;
    this.height = height;

    this.game = game;
    this.CONSTANTS = CONSTANTS;
    this.colorScheme = [CONSTANTS.COLORS.LIGHT_BLUE, CONSTANTS.COLORS.LIGHT_GREEN, CONSTANTS.COLORS.LIGHT_RED];
    this.toSimplify = toSimplify;
    this.ANIMATION_TIME = 500;
    this.MAXIMUM_PAIRS = 6;
    this.MAX_POINTS_PER_GAME_LEVEL = 12;

    this.sounds = {
      correct: new Sound( correctAudio ),
      incorrect: new Sound( wrongAudio )
    };

    this.levels = [];
    this.highScores = [];

    PropertySet.call( this, {
      currentLevel: 0,
      isTimer: false
    } );

    this.CONSTANTS.LEVEL_DESCRIPTION.forEach( function( levelDescription, index ) {
      self.levels.push( new LevelModel( self, levelDescription, index + 1 ) );
      self.highScores.push( new Property( 0 ) );
    } );

  }

  inherit( PropertySet, FractionMatcherModel, {

    // Resets all model elements
    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.highScores.forEach( function( highScore ) {
        highScore.reset();
      } );
      this.levels.forEach( function( levelModel ) {
        levelModel.reset();
      } );
    },

    step: function( dt ) {
      if ( this.currentLevel > 0 ) {
        this.levels[this.currentLevel - 1].step( dt );
      }
    }
  } );

  return FractionMatcherModel;
} );