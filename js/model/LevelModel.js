// Copyright 2013-2017, University of Colorado Boulder

/**
 * Model container for the level screen.
 *
 * @author Anton Ulyanov, Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Property = require( 'AXON/Property' );
  var fractionMatcher = require( 'FRACTION_MATCHER/fractionMatcher' );
  var FractionMatcherQueryParameters = require( 'FRACTION_MATCHER/FractionMatcherQueryParameters' );
  var SingleShapeModel = require( 'FRACTION_MATCHER/model/SingleShapeModel' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param gameModel
   * @param levelDescription
   * @param {number} levelNumber 1-based level that is displayed to the user (starts at 1, not zero)
   * @constructor
   */
  function LevelModel( gameModel, levelDescription, levelNumber ) {
    this.gameModel = gameModel;
    this.levelNumber = levelNumber;
    this.levelDescription = levelDescription;

    this.scoreProperty = new Property( 0 );
    this.timeProperty = new Property( 0 );
    this.stepScoreProperty = new Property( 2 );
    this.answersProperty = new Property( [] );//shapes, which moved to answer zone
    this.lastPairProperty = new Property( [ -1, -1 ] );//pair of shapes on scales, user can't compare the same pair two times
    this.lastChangedZoneProperty = new Property( -1 );//when showing correct answer, change only last dragged shape position
    this.shapesProperty = new Property( [] ); //array of SingleShapeModels
    this.canDragProperty = new Property( true );
    this.buttonStatusProperty = new Property( 'none' );// ['none','ok','check','tryAgain','showAnswer']

    Property.preventGetSet( this, 'score' );
    Property.preventGetSet( this, 'time' );
    Property.preventGetSet( this, 'stepScore' );
    Property.preventGetSet( this, 'answers' );
    Property.preventGetSet( this, 'lastPair' );
    Property.preventGetSet( this, 'lastChangedZone' );
    Property.preventGetSet( this, 'shapes' );
    Property.preventGetSet( this, 'canDrag' );
    Property.preventGetSet( this, 'buttonStatus' );

    this.dropZone = []; //contains indexes of shapes, which are placed in current zone, -1 if empty

    for ( var i = 0; i < 2 * this.gameModel.MAXIMUM_PAIRS; i++ ) {
      this.dropZone[ i ] = -1;
    }

    //two more dropZones 12 and 13 - scales
    this.dropZone.push( -1 );
    this.dropZone.push( -1 );

    this.generateLevel();
  }

  fractionMatcher.register( 'LevelModel', LevelModel );

  inherit( Object, LevelModel, {
    reset: function() {
      this.scoreProperty.reset();
      this.timeProperty.reset();
      this.stepScoreProperty.reset();
      this.answersProperty.reset();
      this.lastPairProperty.reset();
      this.lastChangedZoneProperty.reset();
      this.shapesProperty.reset();
      this.canDragProperty.reset();
      this.buttonStatusProperty.reset();
      this.generateLevel();
      for ( var i = 0; i < this.dropZone.length; i++ ) {
        this.dropZone[ i ] = -1;
      }
      this.answersProperty.value = [];
      this.lastPairProperty.value = [ -1, -1 ];
    },
    step: function( dt ) {

      //Always increase time, even when the timer is hidden because the timer should be shown at any time, see https://github.com/phetsims/fraction-matcher/issues/57
      this.timeProperty.value += dt;
    },
    // return filtered shapes set for the selected denominator, from java model
    filterShapes: function( shapes, d ) {
      var arr = [];
      //rules if shape_type can be used for denominator d
      var map = {
        PIES: true,
        HORIZONTAL_BARS: d < 9,
        VERTICAL_BARS: d < 9,
        PLUSES: d === 6,
        GRID: d === 4 || d === 9,
        PYRAMID: d === 1 || d === 4 || d === 9,
        TETRIS: d === 4,
        FLOWER: d === 6,
        LETTER_L_SHAPES: d % 2 === 0,
        INTERLEAVED_L_SHAPES: d === 2 || d === 4,
        RING_OF_HEXAGONS: d === 7,
        NINJA_STAR: d === 8
      };

      // move through all possible shapes and add it if filter through map
      shapes.forEach( function( shape ) {
        if ( map[ shape ] ) {
          arr.push( shape );
        }
      } );

      return arr;
    },
    // generate new level
    generateLevel: function() {
      var fractions = phet.joist.random.shuffle( this.levelDescription.fractions.slice( 0 ) ).splice( 0, this.gameModel.MAXIMUM_PAIRS ); //get random MAXIMUM_PAIRS fractions
      var numericScaleFactors = this.levelDescription.numericScaleFactors.slice( 0 ); //scaleFactors to multiply fractions
      var numberType = 'NUMBER';
      var newShapes = [];

      var shapesAll = this.levelDescription.shapes.slice( 0 ); // get possible shapes for selected level

      // add fractions to possible shapes unless overridden by query parameter
      FractionMatcherQueryParameters.testDenominator === 0 && shapesAll.push( numberType );

      // add shapes
      for ( var i = 0; i < this.gameModel.MAXIMUM_PAIRS; i++ ) {
        var fraction = fractions[ i ]; // Fraction object
        var scaleFactor = numericScaleFactors[ phet.joist.random.nextIntBetween( 0, numericScaleFactors.length - 1 ) ]; //random scaleFactor

        var shapes = this.filterShapes( shapesAll, fraction.denominator ); //filter only shapes for current denominator
        var fillType = this.levelDescription.fillType[ phet.joist.random.nextIntBetween( 0, this.levelDescription.fillType.length - 1 ) ];

        // first 3 fractions - number, last 3 fractions - shapes with different colors (3 numbers and 3 shapes at least)
        var type = (i < this.gameModel.MAXIMUM_PAIRS / 2) ? numberType : shapes[ i % (shapes.length - 1) ];

        // With query parameter, override number types and only allow shapes
        if ( FractionMatcherQueryParameters.testDenominator !== 0 ) {
          type = shapes[ i % (shapes.length - 1) ];
        }

        var color = (type === numberType) ? 'rgb(0,0,0)' : this.gameModel.colorScheme[ i % 3 ];
        newShapes.push( new SingleShapeModel( type, fraction, scaleFactor, color, fillType, this.gameModel.toSimplify ) );

        // add partner: if was number - add shape, if was shape - add number or random shape with another color
        type = shapes[ phet.joist.random.nextIntBetween( 0, shapes.length - (type === numberType ? 2 : 1) ) ];
        color = (type === numberType) ? 'rgb(0,0,0)' : this.gameModel.colorScheme[ (i + 1) % 3 ];
        newShapes.push( new SingleShapeModel( type, fraction, scaleFactor, color, fillType, this.gameModel.toSimplify ) );
      }

      newShapes = phet.joist.random.shuffle( newShapes );
      for ( i = 0; i < newShapes.length; i++ ) {
        newShapes[ i ].dropZone = i;
      }

      this.shapesProperty.value = newShapes;
    },
    answerButton: function( buttonName ) {
      var self = this;
      switch( buttonName ) { //['none','ok','check','tryAgain','showAnswer']
        case 'ok':
          this.lastChangedZoneProperty.value = -1;
          self.stepScoreProperty.value = 2;
          this.canDragProperty.value = true;
          this.buttonStatusProperty.value = 'none';
          if ( self.answersProperty.value.length === self.gameModel.MAXIMUM_PAIRS ) {
            self.hiScore = Math.max( self.hiScore, self.scoreProperty.value );
          }
          break;
        case 'check':
          if ( self.isShapesEqual( self.shapesProperty.value[ this.dropZone[ 12 ] ], self.shapesProperty.value[ this.dropZone[ 13 ] ] ) ) {
            //answer correct
            this.buttonStatusProperty.value = 'ok';
            self.scoreProperty.value += self.stepScoreProperty.value;
            self.gameModel.sounds.correct.play();
            this.canDragProperty.value = false;
          }
          else {
            //answer incorrect
            self.gameModel.sounds.incorrect.play();
            self.stepScoreProperty.value--;
            this.buttonStatusProperty.value = (self.stepScoreProperty.value) ? 'tryAgain' : 'showAnswer';
            this.canDragProperty.value = this.buttonStatusProperty.value === 'tryAgain';
            this.lastPairProperty.value = [ this.dropZone[ 12 ], this.dropZone[ 13 ] ];
          }
          break;
        case 'tryAgain' :
          this.canDragProperty.value = true;
          this.buttonStatusProperty.value = 'none';
          break;
        case 'showAnswer' :
          this.buttonStatusProperty.value = 'ok';
          break;
        default:
          throw new Error( 'invalid buttonName: ' + buttonName );
      }
    },
    isShapesEqual: function( shape1, shape2 ) {
      return Math.abs( shape1.getValue() - shape2.getValue() ) < 0.001;
    }
  } );

  return LevelModel;
} );