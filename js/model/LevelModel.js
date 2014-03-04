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
    SingleShapeModel = require( 'FRACTION_MATCHER/model/SingleShapeModel' );

  function LevelModel( gameModel, levelDescription, levelNumber ) {
    this.gameModel = gameModel;
    this.levelNumber = levelNumber;
    this.levelDescription = levelDescription;

    PropertySet.call( this, {
      score: 0,
      time: 0,
      stepScore: 2,
      answers: [], //shapes, which moved to answer zone
      lastPair: [-1, -1], //pair of shapes on scales, user can't compare the same pair two times
      lastChangedZone: -1, //when showing correct answer, change only last dragged shape position
      shapes: [], //array of SingleShapeModels
      canDrag: true,
      buttonStatus: "none" // ['none','ok','check','tryAgain','showAnswer']
    } );

    this.dropZone = []; //contains indexes of shapes, which are placed in current zone, -1 if empty

    for ( var i = 0; i < 2 * this.gameModel.MAXIMUM_PAIRS; i++ ) {
      this.dropZone[i] = -1;
    }

    //two more dropZones 12 and 13 - scales
    this.dropZone.push( -1 );
    this.dropZone.push( -1 );

    this.generateLevel();
  }

  inherit( PropertySet, LevelModel, {
    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.generateLevel();
      for ( var i = 0; i < this.dropZone.length; i++ ) {
        this.dropZone[i] = -1;
      }
      this.answers = [];
      this.lastPair = [-1, -1];
    },
    step: function( dt ) {
      if ( this.gameModel.isTimer ) {
        this.time += dt;
      }
    },
    // return filtered shapes set for the selected denominator, from java model
    filterShapes: function( shapes, d ) {
      var arr = shapes.slice( 0 ),
        map = [
          true, // PIES
          d < 9, // HORIZONTAL_BARS
          d < 9, // VERTICAL_BARS
          d === 6, // PLUSES
          d === 4 || d === 9, // GRID
          d === 1 || d === 4 || d === 9, // PYRAMID
          d >= 3, // POLYGON
          d === 4, // TETRIS
          d === 6, // FLOWER
          d % 2 === 0, // LETTER_L_SHAPES
          d === 2 || d === 4, // INTERLEAVED_L_SHAPES
          d === 7, // RING_OF_HEXAGONS
          d === 8  // NINJA_STAR
        ],
        index;

      // move through all shapes and check it
      this.gameModel.CONSTANTS.SHAPES.forEach( function( shape, i ) {
        index = arr.indexOf( shape );
        if ( !map[i] && index !== -1 ) {
          arr.splice( index, 1 );
        }
      } );

      return arr;
    },
    // generate new level
    generateLevel: function() {
      var fractions = _.shuffle( this.levelDescription.fractions.slice( 0 ) ).splice( 0, this.gameModel.MAXIMUM_PAIRS ), //get random MAXIMUM_PAIRS fractions
        numericScaleFactors = this.levelDescription.numericScaleFactors.slice( 0 ), //scaleFactors to multiply fractions
        numberType = 'NUMBER',
        newShapes = [];

      var shapesAll = this.levelDescription.shapes.slice( 0 ); // get possible shapes for selected level
      shapesAll.push( numberType ); // add fractions to possible shapes

      // add shapes
      for ( var i = 0; i < this.gameModel.MAXIMUM_PAIRS; i++ ) {
        var fraction = fractions[i]; // [numerator, denominator] pair
        var shapes = this.filterShapes( shapesAll, fraction[1] ); //filter only shapes for current denominator
        var scaleFactor = numericScaleFactors[_.random( numericScaleFactors.length - 1 )]; //random scaleFactor
        var fillType = this.levelDescription.fillType[_.random( this.levelDescription.fillType.length - 1 )];

        // first 3 fractions - number, last 3 fractions - shapes with different colors (3 numbers and 3 shapes at least)
        var type = (i < this.gameModel.MAXIMUM_PAIRS / 2) ? numberType : shapes[ i % (shapes.length - 1) ];
        var color = (type === numberType) ? 'rgb(0,0,0)' : this.gameModel.colorScheme[i % 3];
        newShapes.push( new SingleShapeModel( type, fraction, scaleFactor, color, fillType, this.toSimplify ) );

        // add partner: if was number - add shape, if was shape - add number or shape with another color
        type = shapes[_.random( shapes.length - (type === numberType ? 2 : 1) )];
        color = (type === numberType) ? 'rgb(0,0,0)' : this.gameModel.colorScheme[(i + 1) % 3];
        newShapes.push( new SingleShapeModel( type, fraction, scaleFactor, color, fillType, this.toSimplify ) );
      }

      newShapes = _.shuffle( newShapes );
      for ( i = 0; i < newShapes.length; i++ ) {
        newShapes[i].dropZone = i;
      }

      this.shapes = newShapes;
    },
    answerButton: function( buttonName ) {
      var self = this;
      switch( buttonName ) { //['none','ok','check','tryAgain','showAnswer']
        case "ok":
          this.lastChangedZone = -1;
          self.stepScore = 2;
          this.canDrag = true;
          this.buttonStatus = "none";
          if ( self.answers.length === self.gameModel.MAXIMUM_PAIRS ) {
            self.hiScore = Math.max( self.hiScore, self.score );
          }
          break;
        case "check":
          if ( self.isShapesEqual( self.shapes[this.dropZone[12]], self.shapes[this.dropZone[13]] ) ) {
            //answer correct
            this.buttonStatus = "ok";
            self.score += self.stepScore;
            self.gameModel.sounds.correct.play();
          }
          else {
            //answer incorrect
            self.gameModel.sounds.incorrect.play();
            self.stepScore--;
            this.buttonStatus = (self.stepScore) ? "tryAgain" : "showAnswer";
          }
          this.canDrag = false;
          break;
        case "tryAgain":
          this.canDrag = true;
          this.buttonStatus = "none";
          break;
        case "showAnswer":
          this.buttonStatus = "ok";
          break;
      }
    },
    isShapesEqual: function( shape1, shape2 ) {
      return Math.abs( shape1.getAnswer() - shape2.getAnswer() ) < 0.001;
    }
  } );

  return LevelModel;
} );
