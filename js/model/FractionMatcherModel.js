// Copyright 2013-2017, University of Colorado Boulder

/**
 * Model container for the game screen.
 *
 * @author Anton Ulyanov, Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Emitter = require( 'AXON/Emitter' );
  var fractionMatcher = require( 'FRACTION_MATCHER/fractionMatcher' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LevelModel = require( 'FRACTION_MATCHER/model/LevelModel' );
  var Property = require( 'AXON/Property' );
  var Sound = require( 'VIBE/Sound' );

  // audio
  var correctAudio = require( 'audio!VEGAS/ding.mp3' );
  var wrongAudio = require( 'audio!VEGAS/boing.mp3' );

  /**
   * @param width
   * @param height
   * @param game
   * @param {Constants} constants
   * @param {boolean} toSimplify flag for simplifying number shapes,
   * @param {boolean} isMixedNumbers
   * @constructor
   */
  function FractionMatcherModel( width, height, game, constants, toSimplify, isMixedNumbers ) {
    var self = this;
    this.isMixedNumbers = isMixedNumbers;

    // dimensions of the model's space
    this.width = width;
    this.height = height;

    this.game = game;
    this.constants = constants;
    this.colorScheme = [ constants.COLORS.LIGHT_BLUE, constants.COLORS.LIGHT_GREEN, constants.COLORS.LIGHT_RED ];
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
    this.bestTimes = [];

    this.currentLevelProperty = new Property( 0 );
    this.isTimerProperty = new Property( false );

    this.stepEmitter = new Emitter();

    this.constants.LEVEL_DESCRIPTION.forEach( function( levelDescription, index ) {
      self.levels.push( new LevelModel( self, levelDescription, index + 1 ) );
      self.highScores.push( new Property( 0 ) );
      self.bestTimes.push( new Property( null ) );
    } );
  }

  fractionMatcher.register( 'FractionMatcherModel', FractionMatcherModel );

  return inherit( Object, FractionMatcherModel, {

    // Resets all model elements
    reset: function() {
      this.currentLevelProperty.reset();
      this.isTimerProperty.reset();
      this.highScores.forEach( function( highScore ) {
        highScore.reset();
      } );
      this.levels.forEach( function( levelModel ) {
        levelModel.reset();
      } );
      this.bestTimes.forEach( function( bestTime ) {
        bestTime.reset();
      } );
      Sound.audioEnabledProperty.reset();
    },

    step: function( dt ) {
      if ( this.currentLevelProperty.get() > 0 ) {
        this.levels[ this.currentLevelProperty.get() - 1 ].step( dt );
      }

      //Signify that a step occurred: used in animating the RewardNodes
      this.stepEmitter.emit1( dt );
    }
  } );
} );