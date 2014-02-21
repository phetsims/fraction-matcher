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
      highScore: 0,
      answerShape: {zone: -1, indexShape: -1},
      time: 0,
      lastPair: [],
      stepScore: 0,
      answers: [],
      shapes: [],
      canDrag: true,
      buttonStatus: "none" // ['none','ok','check','tryAgain','showAnswer']
    } );

    this.dropZone = [];
    this.answerZone = [];

    for ( var i = 0; i < 2 * this.gameModel.MAXIMUM_PAIRS; i++ ) {
      this.dropZone[i] = -1;
      this.answerZone[i] = -1;
    }

    //two more dropZones - scales
    this.dropZone.push( -1 );
    this.dropZone.push( -1 );

    this.generateLevel();
  }

  inherit( PropertySet, LevelModel, {
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

      PropertySet.prototype.reset.call( this );
      this.shapes = newShapes;
    },
    resetLevel: function() {
      this.generateLevel();
    },
    answerButton: function( buttonName ) {
      var i, self = this;
      switch( buttonName ) { //['none','ok','check','tryAgain','showAnswer']
        case "ok":
          /*var lastAnswerZone = 0;
           while ( this.answerZone[lastAnswerZone] >= 0 ) {
           lastAnswerZone += 2;
           }*/
          self.shapes[self.lastPair[0]].dropZone = -1;
          //self.shapes[self.lastPair[0]].answerZone = lastAnswerZone;
          self.shapes[self.lastPair[1]].dropZone = -1;
          //self.shapes[self.lastPair[1]].answerZone = lastAnswerZone + 1;
          this.answerShape = {zone: -1, indexShape: -1};
          self.stepScore = 0;

          self.lastPair = [-1,-1];
          this.canDrag = true;
          this.buttonStatus = "none";

          if ( self.answers.length === self.gameModel.MAXIMUM_PAIRS ) {
            self.hiScore = Math.max( self.hiScore, self.score );
          }
          break;
        case "check":
          self.lastPair = [this.dropZone[12], this.dropZone[13]];
          if ( self.isShapesEqual( self.shapes[self.lastPair[0]], self.shapes[self.lastPair[1]] ) ) {
            //answer correct
            this.buttonStatus = "ok";
            self.score += 2 - self.stepScore;
            self.gameModel.sounds.correct.play();
          }
          else {
            //answer incorrect
            self.gameModel.sounds.incorrect.play();
            self.stepScore++;
            this.buttonStatus = (self.stepScore === 1) ? "tryAgain" : "showAnswer";
          }
          this.canDrag = false;
          break;
        case "tryAgain":
          this.canDrag = true;
          this.buttonStatus = "none";
          break;
        case "showAnswer":
          var findAnswer = self.shapes[self.answerShape].getAnswer();
          var zoneAnswer = self.answerShape.zone === 12 ? 13 : 12;
          for ( i = 0; i < self.shapes.length; i++ ) {
            if ( Math.abs( self.shapes[i].getAnswer() - findAnswer ) < 0.001 && self.shapes[i].dropZone < 12 && self.shapes[i].dropZone > -1 ) {
              //TODO var freeZone = this.nearDropZone( self.shapes[this.dropZone[zoneAnswer].indexShape].view, true );
              //self.shapes[this.dropZone[zoneAnswer].indexShape].dropZone = freeZone;
              //this.dropZone[freeZone].indexShape = this.dropZone[zoneAnswer].indexShape;
              self.shapes[i].dropZone = zoneAnswer;
              this.dropZone[zoneAnswer] = i;
              self.old12 = this.dropZone[12];
              self.old13 = this.dropZone[13];
              break;
            }
          }
          this.buttonStatus = "ok";
          this.changeStatus = !this.changeStatus;
          break;
      }
    },
    isShapesEqual: function( shape1, shape2 ) {
      return Math.abs( shape1.getAnswer() - shape2.getAnswer() ) < 0.001;
    }
  } );

  return LevelModel;
} );
