// Copyright 2002-2014, University of Colorado Boulder

/**
 * Contains all nodes for single level. Shapes, strings, buttons.
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    equallyAnswerSymbolString = require( 'string!FRACTION_MATCHER/equallyAnswerSymbol' ),
    ShapeNode = require( 'FRACTION_COMMON/shapes/ShapeNode' ),
    ButtonNode = require( 'FRACTION_MATCHER/view/ButtonNode' ),
    SmileNode = require( 'FRACTION_MATCHER/view/SmileNode' ),
    ComparisonChartNode = require( 'FRACTION_MATCHER/view/ComparisonChartNode' ),
    GameOverNode = require( 'FRACTION_MATCHER/view/GameOverNode' ),
    VBox = require( 'SCENERY/nodes/VBox' ),
    StringUtils = require( 'PHETCOMMON/util/StringUtils' ),
    Util = require( 'DOT/Util' ),
    Vector2 = require( 'DOT/Vector2' ),
    SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  //strings
  var buttonCheckString = require( 'string!FRACTION_MATCHER/buttonCheck' ),
    buttonOkString = require( 'string!FRACTION_MATCHER/buttonOk' ),
    buttonTryAgainString = require( 'string!FRACTION_MATCHER/buttonTryAgain' ),
    patternLevelString = require( 'string!FRACTION_MATCHER/patternLevel' ),
    patternScoreString = require( 'string!FRACTION_MATCHER/patternScore' ),
    patternTimeString = require( 'string!FRACTION_MATCHER/time.pattern' ),
    buttonShowAnswerString = require( 'string!FRACTION_MATCHER/buttonShowAnswer' );


  function LevelNode( model, levelsContainer, options ) {
    var margin = 15;
    var thisNode = this;

    Node.call( this );

    this.levelsContainer = levelsContainer;
    this.model = model;

    //labels at the right
    var levelLabel = new Text( StringUtils.format( patternLevelString, model.levelNumber ), { font: new PhetFont( { size: 12, weight: "bold"} )} );
    var scoreLabel = new Text( StringUtils.format( patternScoreString, 0 ), { font: new PhetFont( { size: 12, weight: "bold"} )} );
    var timeLabel = new Text( StringUtils.format( patternScoreString, 0 ), { font: new PhetFont( { size: 12, weight: "bold"} )} );
    var vBox = new VBox( {
      children: [levelLabel, scoreLabel, timeLabel],
      spacing: 5,
      y: 85,
      right: model.gameModel.width - margin,
      align: 'right'
    } );
    thisNode.addChild( vBox );

    //smile
    var smile = new SmileNode( {centerX: 170 / 2, centerY: 190} );
    thisNode.addChild( smile );

    //left part buttons, check, ok, tryAgain, showAnswer
    var commonButtonStyle = {
      font: new PhetFont( { size: 14, weight: "bold"} ),
      x: smile.centerX,
      y: smile.bottom + margin,
      rectangleCornerRadius: 5,
      rectangleXMargin: 10
    };


    var buttonCheck = new ButtonNode( buttonCheckString, function() {model.answerButton( "check" );}, _.extend( commonButtonStyle, {rectangleFillUp: "#FFD63F", rectangleFillDown: "#FFD63F", rectangleFillOver: "#FFEA9D"} ) );
    thisNode.addChild( buttonCheck );

    var buttonOk = new ButtonNode( buttonOkString,
      function() {
        model.answerButton( "ok" );
        //animate to answers area and remove listeners
        thisNode.moveShapesOnScalesToAnswer();
      },
      _.extend( commonButtonStyle, {rectangleFillUp: "#44FF44", rectangleFillDown: "#44FF44", rectangleFillOver: "#9FFF9F"} ) );
    thisNode.addChild( buttonOk );

    var buttonTryAgain = new ButtonNode( buttonTryAgainString, function() {model.answerButton( "tryAgain" );},
      _.extend( commonButtonStyle, {rectangleFillUp: "#FF7C3B", rectangleFillDown: "#FF7C3B", rectangleFillOver: "#FFBE9D"} ) );
    thisNode.addChild( buttonTryAgain );

    var buttonShowAnswer = new ButtonNode( buttonShowAnswerString, function() {
      model.answerButton( "showAnswer" );
      thisNode.showCorrectAnswer();
    }, _.extend( commonButtonStyle, {rectangleFillUp: "#FF7C3B", rectangleFillDown: "#FF7C3B", rectangleFillOver: "#FFBE9D"} ) );
    thisNode.addChild( buttonShowAnswer );

    this.comparisonChart = new ComparisonChartNode( model.gameModel, {centerX: model.gameModel.width / 2, y: 250} );
    thisNode.addChild( this.comparisonChart );

    this.gameOverNode = new GameOverNode( model, thisNode, {visible: false} );
    thisNode.addChild( this.gameOverNode );

    this.equallyAnswerSymbol = [];
    this.levelsContainer.answerRects.forEach( function( answerRect, i ) {
      thisNode.equallyAnswerSymbol[i] = new Text( equallyAnswerSymbolString, { font: new PhetFont( { size: 22, _weight: "bold"} ), center: answerRect.center, visible: false  } );
      thisNode.addChild( thisNode.equallyAnswerSymbol[i] );
    } );
    var shapeNode = new Node();
    var offsetCursor = {};
    var startDrag = function( event ) {
        if ( model.canDrag ) {
          event.currentTarget.moveToFront();
          offsetCursor = {x: thisNode.globalToParentPoint( event.pointer.point ).x - event.currentTarget.x, y: thisNode.globalToParentPoint( event.pointer.point ).y - event.currentTarget.y};
          model.dropZone[model.shapes[event.currentTarget.indexShape].dropZone] = -1;
          if ( model.lastChangedZone === model.shapes[event.currentTarget.indexShape].dropZone ) {
            model.lastChangedZone = -1;
          }
        }
      },
      moveDrag = function( event ) {
        if ( model.canDrag ) {
          event.currentTarget.x = thisNode.globalToParentPoint( event.pointer.point ).x - offsetCursor.x;
          event.currentTarget.y = thisNode.globalToParentPoint( event.pointer.point ).y - offsetCursor.y;
        }
      },
      endDrag = function( event ) {
        if ( model.canDrag ) {
          var zone = thisNode.getClosestDropZone( event.currentTarget.center, true );
          if ( zone >= 12 && model.dropZone[zone] >= 0 ) { //if scale and scale not empty
            var zone2 = thisNode.getClosestDropZone( model.shapes[model.dropZone[zone]].view.center, false ); //get free zone, not scale
            thisNode.dropShapeToZone( model.shapes[model.dropZone[zone]], zone2 );
          }
          if ( zone === 12 || zone === 13 ) {
            model.lastChangedZone = zone;
            model.lastPair[zone - 12] = event.currentTarget.indexShape;
          }
          thisNode.dropShapeToZone( model.shapes[event.currentTarget.indexShape], zone );
          if ( model.buttonStatus === 'check' || model.buttonStatus === 'none' ) {
            if ( model.dropZone[12] >= 0 && model.dropZone[13] >= 0 && (model.dropZone[12].indexShape !== model.lastPair[0] || model.dropZone[13].indexShape !== model.lastPair[1]) ) {
              model.buttonStatus = 'check';
            }
            else {
              model.buttonStatus = 'none';
            }
          }
        }
      },
      dragParamers = {
        allowTouchSnag: true,
        start: startDrag,
        drag: moveDrag,
        end: endDrag
      };

    thisNode.addChild( shapeNode );

    this.generateNewLevel = function() {
      var i, shape;
      shapeNode.removeAllChildren();

      for ( i = 0; i < model.shapes.length; i++ ) {
        shape = model.shapes[i];
        if ( shape.view === undefined ) {
          shape.view = new ShapeNode( shape );
          shape.view.cursor = "pointer";
          shape.view.addInputListener( new SimpleDragHandler( dragParamers ) );
          shape.view.indexShape = i;
        }
        shapeNode.addChild( shape.view );
        if ( shape.dropZone >= 0 ) {
          shape.view.center = thisNode.getShapeDropPosition( shape.dropZone );
          thisNode.model.dropZone[shape.dropZone] = shape.view.indexShape;
        }
      }

      for ( var j = 0; j < model.gameModel.MAXIMUM_PAIRS; j++ ) {
        thisNode.equallyAnswerSymbol[j].setVisible( false );
      }
      this.gameOverNode.setVisible( false );
    };


    model.buttonStatusProperty.link( function updateButtonStatus( value ) {
      buttonOk.setVisible( value === 'ok' );
      buttonCheck.setVisible( value === 'check' );
      buttonTryAgain.setVisible( value === 'tryAgain' );
      buttonShowAnswer.setVisible( value === 'showAnswer' );
      if ( model.buttonStatus === 'ok' ) {
        smile.setValue( model.stepScore );
      }
      else {
        smile.setValue( 0 );
      }
      if ( model.buttonStatus !== 'none' ) {
        thisNode.comparisonChart.reset();
        if ( model.buttonStatus !== 'check' ) {
          thisNode.comparisonChart.compare( model.shapes[model.dropZone[12]], model.shapes[model.dropZone[13]] );
        }
      }
      else {
        thisNode.comparisonChart.hide();
      }
    } );

    model.gameModel.isTimerProperty.link( function( isTimer ) {
      timeLabel.visible = isTimer;
      vBox.right = model.gameModel.width - margin;
    } );

    model.timeProperty.link( function( newTime ) {
      timeLabel.text = StringUtils.format( patternTimeString, Util.toFixed( newTime, 0 ) );
      vBox.right = model.gameModel.width - margin;
    } );

    model.scoreProperty.link( function( newScore ) {
      scoreLabel.text = StringUtils.format( patternScoreString, newScore );
      vBox.right = model.gameModel.width - margin;
    } );

    this.mutate( options );
  }

  return inherit( Node, LevelNode, {
      getShapeDropPosition: function( position ) {
        //inside dropZones at the bottom
        if ( position < this.model.gameModel.MAXIMUM_PAIRS * 2 ) {
          return this.levelsContainer.sourceRectangles[position].center;
        }
        else {
          //one of two scales
          var scale = this.levelsContainer.scales[position - this.model.gameModel.MAXIMUM_PAIRS * 2];
          return new Vector2( scale.centerX, scale.top );
        }
      },
      getShapeAnswerPosition: function( position ) {
        var targetRect = this.levelsContainer.answerRects[Math.floor( position / 2 )];
        var diff = (position % 2 === 0) ? -targetRect.width / 4 : targetRect.width / 4;
        return new Vector2( targetRect.centerX + diff, targetRect.centerY );
      },
      getClosestDropZone: function( coord, canDropOnScale ) {
        var closestZone = -1,
          min = 1e10;
        for ( var i = 0; i < this.model.dropZone.length; i++ ) {
          //if empty or one of two scales and canDropOnScale
          if ( this.model.dropZone[i] < 0 || (canDropOnScale && (i === 12 || i === 13)) ) {
            var dist = coord.distanceSquared( this.getShapeDropPosition( i ) );
            if ( min > dist ) {
              min = dist;
              closestZone = i;
            }
          }
        }
        return closestZone;
      },
      dropShapeToZone: function( shape, zoneIndex ) {
        //target dropZone now = indexShape
        this.model.dropZone[zoneIndex] = shape.view.indexShape;
        shape.dropZone = zoneIndex;
        var targetPosition = this.getShapeDropPosition( zoneIndex );
        if ( zoneIndex > this.model.gameModel.MAXIMUM_PAIRS * 2 - 1 ) {
          targetPosition.y -= shape.view.height / 2 - 13; //adjust position on scales
        }
        new TWEEN.Tween( shape.view ).to( { centerX: targetPosition.x, centerY: targetPosition.y }, this.model.gameModel.ANIMATION_TIME ).start();
      },
      showCorrectAnswer: function() {
        var thisNode = this;
        //the unchanged shape on scale
        var correctShape = this.model.shapes[this.model.dropZone[this.model.lastChangedZone === 12 ? 13 : 12]];
        var secondCorrectShape;
        for ( var i = 0; i < this.model.dropZone.length; i++ ) {
          if ( this.model.dropZone[i] !== -1 && thisNode.model.isShapesEqual( correctShape, this.model.shapes[this.model.dropZone[i]] ) ) {
            secondCorrectShape = this.model.shapes[this.model.dropZone[i]];
            break;
          }
        }
        var lastShapeOnScale = this.model.shapes[this.model.dropZone[this.model.lastChangedZone]];
        this.model.dropZone[secondCorrectShape.dropZone] = -1;
        this.dropShapeToZone( secondCorrectShape, this.model.lastChangedZone );
        this.dropShapeToZone( lastShapeOnScale, this.getClosestDropZone( lastShapeOnScale.view.center, false ) );
        thisNode.comparisonChart.compare( thisNode.model.shapes[thisNode.model.dropZone[12]], thisNode.model.shapes[thisNode.model.dropZone[13]] );
      },
      moveShapesOnScalesToAnswer: function() {
        var thisNode = this;
        thisNode.equallyAnswerSymbol[thisNode.model.answers.length / 2].setVisible( true );
        [0, 1].forEach( function( i ) {
          var shape = thisNode.model.shapes[thisNode.model.dropZone[thisNode.model.gameModel.MAXIMUM_PAIRS * 2 + i]];
          var newPosition = thisNode.getShapeAnswerPosition( thisNode.model.answers.length );
          new TWEEN.Tween( shape.view ).to( { x: newPosition.x, y: newPosition.y }, thisNode.model.gameModel.ANIMATION_TIME ).onUpdate(function( step ) {
            shape.view.scale( (1 - step * 0.5) / shape.view.matrix.scaleVector.x );
          } ).start();
          thisNode.model.answers.push( thisNode.model.dropZone[thisNode.model.gameModel.MAXIMUM_PAIRS * 2 + i] );
          thisNode.model.dropZone[thisNode.model.gameModel.MAXIMUM_PAIRS * 2 + i] = -1;
          shape.view.removeInputListener( shape.view.getInputListeners()[0] );
        } );
        if ( this.model.answers.length === this.model.gameModel.MAXIMUM_PAIRS * 2 ) {
          this.gameOverNode.showGameOver();
        }
      }
    }
  );

} );
