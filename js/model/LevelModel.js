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
    ShapeGame = require( 'FRACTION_MATCHER/model/ShapeGame' );

  function LevelModel( gameModel, levelDescription, levelNumber ) {
    this.gameModel = gameModel;
    this.levelNumber = levelNumber;

    PropertySet.call( this, {
      score: 0,
      highScore: 0,
      answerShape: {zone: -1, indexShape: -1},
      time: 0,
      old12: -1,
      old13: -1,
      step: 0,
      answer: [],
      canDrag: true,
      buttonStatus: "none" // ['none','ok','check','tryAgain','showAnswer']
    } );

    this.dropZone = [
      {x: 245, y: 485, radius: 50, indexShape: -1},
      {x: 375, y: 485, radius: 50, indexShape: -1},
      {x: 505, y: 485, radius: 50, indexShape: -1},
      {x: 635, y: 485, radius: 50, indexShape: -1},
      {x: 765, y: 485, radius: 50, indexShape: -1},
      {x: 895, y: 485, radius: 50, indexShape: -1},

      {x: 245, y: 615, radius: 50, indexShape: -1},
      {x: 375, y: 615, radius: 50, indexShape: -1},
      {x: 505, y: 615, radius: 50, indexShape: -1},
      {x: 635, y: 615, radius: 50, indexShape: -1},
      {x: 765, y: 615, radius: 50, indexShape: -1},
      {x: 895, y: 615, radius: 50, indexShape: -1},

      {x: 395, y: 290, radius: 80, indexShape: -1}, //[12]
      {x: 750, y: 290, radius: 80, indexShape: -1}  //[13]
    ];

    this.answerZone = [
      {x: 70, y: 70, scale: 0.5, radius: 50, indexShape: -1},
      {x: 140, y: 70, scale: 0.5, radius: 50, indexShape: -1},

      {x: 255, y: 70, scale: 0.5, radius: 50, indexShape: -1},
      {x: 325, y: 70, scale: 0.5, radius: 50, indexShape: -1},

      {x: 440, y: 70, scale: 0.5, radius: 50, indexShape: -1},
      {x: 510, y: 70, scale: 0.5, radius: 50, indexShape: -1},

      {x: 625, y: 70, scale: 0.5, radius: 50, indexShape: -1},
      {x: 695, y: 70, scale: 0.5, radius: 50, indexShape: -1},

      {x: 810, y: 70, scale: 0.5, radius: 50, indexShape: -1},
      {x: 880, y: 70, scale: 0.5, radius: 50, indexShape: -1},

      {x: 995, y: 70, scale: 0.5, radius: 50, indexShape: -1},
      {x: 1065, y: 70, scale: 0.5, radius: 50, indexShape: -1}
    ];
    this.generateLevel();
  }

  inherit( PropertySet, LevelModel, {
    nearDropZone: function( coord, onlyFree ) {
      var near = -1,
        min = 9999;
      for ( var i = 0; i < this.dropZone.length; i++ ) {
        if ( min > this.distanceSquared( coord, this.dropZone[i] ) && (this.dropZone[i].indexShape < 0 || (!onlyFree && (i === 12 || i === 13))) && (!onlyFree || i < 12) ) {
          min = this.distanceSquared( coord, this.dropZone[i] );
          near = i;
        }
      }
      return near;
    },
    distanceSquared: function( pt1, pt2 ) {
      return Math.pow( pt1.x - pt2.x, 2 ) + Math.pow( pt1.y - pt2.y, 2 );
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
      var levelDescription = this.gameModel.CONSTANTS.LEVEL_DESCRIPTION[this.levelNumber-1], // get description for selected level
        numericScaleFactors = levelDescription.numericScaleFactors.slice( 0 ),
        shapesAll = levelDescription.shapes.slice( 0 ), // get possible shaped for selected level
        colorScheme = this.gameModel.colorScheme, // get possible color scheme for selected level
        max = 6, // number of shapes to add
        fractions = _.shuffle( levelDescription.fractions.slice( 0 ) ).splice( 0, max ),
        toSimplify = this.toSimplify,
        numberType = 'NUMBER',
        newLevel = [],
        scaleFactor,
        fillType,
        fraction,
        shapes,
        color,
        type,
        i;

      shapesAll.push( numberType ); // add fractions to possible shapes

      // add shapes
      for ( i = 0; i < max; i++ ) {
        fraction = fractions[i];
        shapes = this.filterShapes( shapesAll, fraction[1] );
        scaleFactor = numericScaleFactors[_.random( numericScaleFactors.length - 1 )];
        fillType = levelDescription.fillType[_.random( levelDescription.fillType.length - 1 )];

        // first 3 fractions - number, last 3 fractions - shapes with different colors (3 numbers and 3 shapes at least)
        type = (i < max / 2) ? numberType : shapes[ i % (shapes.length - 1) ];
        color = (type === numberType) ? 'rgb(0,0,0)' : colorScheme[i % 3];
        newLevel.push( new ShapeGame( type, fraction, scaleFactor, color, fillType, toSimplify ) );

        // add partner: if was number - add shape, if was shape - add number or shape with another color
        type = shapes[_.random( shapes.length - (type === numberType ? 2 : 1) )];
        color = (type === numberType) ? 'rgb(0,0,0)' : colorScheme[(i + 1) % 3];
        newLevel.push( new ShapeGame( type, fraction, scaleFactor, color, fillType, toSimplify ) );
      }

      newLevel = _.shuffle( newLevel );
      for ( i = 0; i < newLevel.length; i++ ) {
        newLevel[i].dropZone = i;
      }

      PropertySet.prototype.reset.call( this );
      this.shape = newLevel;
    },
    resetLevel: function() {
      this.generateLevel();
      //TODO
      //this.levelStatus[this.currentLevel].hiScore = hiScore;
      //this.changeStatus = !this.changeStatus;
    },
    answerButton: function( buttonName ) {
      var i, levelStatus = this.levelStatus[this.currentLevel];
      switch( buttonName ) { //['none','ok','check','tryAgain','showAnswer']
        case "ok":
          var lastAnswerZone = 0;
          while ( this.answerZone[lastAnswerZone].indexShape >= 0 ) {
            lastAnswerZone += 2;
          }
          levelStatus.shape[levelStatus.old12].dropZone = -1;
          levelStatus.shape[levelStatus.old12].answerZone = lastAnswerZone;
          levelStatus.shape[levelStatus.old13].dropZone = -1;
          levelStatus.shape[levelStatus.old13].answerZone = lastAnswerZone + 1;
          this.answerZone[lastAnswerZone].indexShape = levelStatus.old12;
          this.answerZone[lastAnswerZone + 1].indexShape = levelStatus.old13;

          this.answerShape = {zone: -1, indexShape: -1};
          levelStatus.step = 0;
          levelStatus.old12 = -1;
          levelStatus.old13 = -1;
          this.canDrag = true;
          this.buttonStatus = "none";

          if ( this.answerZone[this.answerZone.length - 1].indexShape >= 0 ) {
            levelStatus.hiScore = Math.max( levelStatus.hiScore, levelStatus.score );
          }

          this.changeStatus = !this.changeStatus;
          break;
        case "check":
          levelStatus.old12 = this.dropZone[12].indexShape;
          levelStatus.old13 = this.dropZone[13].indexShape;

          if ( Math.abs( levelStatus.shape[levelStatus.old12].getAnswer() - levelStatus.shape[levelStatus.old13].getAnswer() ) < 0.001 ) {
            //answer true
            this.buttonStatus = "ok";
            levelStatus.score += 2 - levelStatus.step;
            this.changeStatus = !this.changeStatus;
          }
          else {
            //answer false
            levelStatus.step++;
            if ( levelStatus.step > 1 ) {
              this.buttonStatus = "showAnswer";
            }
            else {
              this.buttonStatus = "tryAgain";
            }
          }
          this.canDrag = false;
          break;
        case "tryAgain":
          this.canDrag = true;
          this.buttonStatus = "none";
          break;
        case "showAnswer":
          var findAnswer = levelStatus.shape[levelStatus.answerShape.indexShape].getAnswer();
          var zoneAnswer = levelStatus.answerShape.zone === 12 ? 13 : 12;

          for ( i = 0; i < levelStatus.shape.length; i++ ) {
            if ( Math.abs( levelStatus.shape[i].getAnswer() - findAnswer ) < 0.001 && levelStatus.shape[i].dropZone < 12 && levelStatus.shape[i].answerZone < 0 ) {
              var freeZone = this.nearDropZone( levelStatus.shape[this.dropZone[zoneAnswer].indexShape].view, true );
              levelStatus.shape[this.dropZone[zoneAnswer].indexShape].dropZone = freeZone;
              this.dropZone[freeZone].indexShape = this.dropZone[zoneAnswer].indexShape;
              levelStatus.shape[i].dropZone = zoneAnswer;
              this.dropZone[zoneAnswer].indexShape = i;
              levelStatus.old12 = this.dropZone[12].indexShape;
              levelStatus.old13 = this.dropZone[13].indexShape;
              break;
            }
          }
          this.buttonStatus = "ok";
          this.changeStatus = !this.changeStatus;
          break;
      }
    }
  } );

  return LevelModel;
} );
