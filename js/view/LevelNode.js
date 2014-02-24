// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main page for the 'Fraction Matcher' screen.
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Text = require( 'SCENERY/nodes/Text' ),
    Matrix3 = require( 'DOT/Matrix3' ),
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
    var levelLabel = new Text( StringUtils.format( patternLevelString, model.levelNumber ), { font: new PhetFont( { size: 19, weight: "bold"} )} );
    var scoreLabel = new Text( StringUtils.format( patternScoreString, 0 ), { font: new PhetFont( { size: 19, weight: "bold"} )} );
    var timeLabel = new Text( StringUtils.format( patternScoreString, 0 ), { font: new PhetFont( { size: 19, weight: "bold"} )} );
    var vBox = new VBox( {
      children: [levelLabel, scoreLabel, timeLabel],
      spacing: 0,
      y: 85,
      right: model.gameModel.width - margin,
      align: 'right'
    } );
    thisNode.addChild( vBox );

    //smile
    var smile = new SmileNode( {centerX: 170 / 2, centerY: 190} );
    thisNode.addChild( smile );

    //left part buttons, check, ok, tryAgain, showAnswer
    var buttonCheck = new ButtonNode( buttonCheckString, function() {model.answerButton( "check" );}, {font: new PhetFont( { size: 14, weight: "bold"} ), rectangleFillUp: "#FFD63F", rectangleFillDown: "#FFD63F", rectangleFillOver: "#FFEA9D", x: smile.centerX, y: smile.bottom + margin, rectangleCornerRadius: 5, rectangleXMargin: 10} );
    thisNode.addChild( buttonCheck );

    var buttonOk = new ButtonNode( buttonOkString,
      function() {
        model.answerButton( "ok" );
        //animate to answers area and remove listeners
        equallyAnswerSymbol[model.answers.length / 2].setVisible( true );
        [0, 1].forEach( function( i ) {
          var shape = model.shapes[model.dropZone[model.gameModel.MAXIMUM_PAIRS * 2 + i]];
          var newPosition = thisNode.getShapeAnswerPosition( model.answers.length );
          new TWEEN.Tween( shape.view ).to( { x: newPosition.x, y: newPosition.y }, model.gameModel.ANIMATION_TIME ).onUpdate(function( step ) {
            shape.view.scale( (1 - step * 0.5) / shape.view.matrix.scaleVector.x );
          } ).start();
          model.answers.push( model.dropZone[model.gameModel.MAXIMUM_PAIRS * 2 + i] );
          model.dropZone[model.gameModel.MAXIMUM_PAIRS * 2 + i] = -1;
          shape.view.removeInputListener( shape.view.getInputListeners()[0] );
        } );
      },
      {font: new PhetFont( { size: 14, weight: "bold"} ), rectangleFillUp: "#44FF44", rectangleFillDown: "#44FF44", rectangleFillOver: "#9FFF9F", x: smile.centerX, y: smile.bottom + margin, rectangleCornerRadius: 5, rectangleXMargin: 10} );
    thisNode.addChild( buttonOk );

    var buttonTryAgain = new ButtonNode( buttonTryAgainString, function() {model.answerButton( "tryAgain" );}, {font: new PhetFont( { size: 14, weight: "bold"} ), rectangleFillUp: "#FF7C3B", rectangleFillDown: "#FF7C3B", rectangleFillOver: "#FFBE9D", x: smile.centerX, y: smile.bottom + margin, rectangleCornerRadius: 5, rectangleXMargin: 10} );
    thisNode.addChild( buttonTryAgain );

    var buttonShowAnswer = new ButtonNode( buttonShowAnswerString, function() {model.answerButton( "showAnswer" );}, {font: new PhetFont( { size: 14, weight: "bold"} ), rectangleFillUp: "#FF7C3B", rectangleFillDown: "#FF7C3B", rectangleFillOver: "#FFBE9D", x: smile.centerX, y: smile.bottom + margin, rectangleCornerRadius: 5, rectangleXMargin: 10} );
    thisNode.addChild( buttonShowAnswer );

    var comparisonChart = new ComparisonChartNode( model.gameModel, {centerX: model.gameModel.width / 2, y: 250} );
    thisNode.addChild( comparisonChart );

    this.gameOverNode = new GameOverNode( model, {visible: false} );
    thisNode.addChild( this.gameOverNode );

    var equallyAnswerSymbol = [];
    this.levelsContainer.answerRects.forEach( function( answerRect, i ) {
      equallyAnswerSymbol[i] = new Text( equallyAnswerSymbolString, { font: new PhetFont( { size: 22, _weight: "bold"} ), center: answerRect.center, visible: false  } );
      thisNode.addChild( equallyAnswerSymbol[i] );
    } );
    var shapeNode = new Node();
    var offsetCursor = {};
    var draggableShape = '';
    var startDrag = function( event ) {
        if ( model.canDrag ) {
          event.currentTarget.moveToFront();
          offsetCursor = {x: thisNode.globalToParentPoint( event.pointer.point ).x - event.currentTarget.x, y: thisNode.globalToParentPoint( event.pointer.point ).y - event.currentTarget.y};
          draggableShape = model.shapes[event.currentTarget.indexShape];
          model.dropZone[draggableShape.dropZone] = -1;
          if ( model.lastChangedZone === draggableShape.dropZone ) {
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
            thisNode.dropShapeToZone( model.shapes[model.dropZone[zone]].view, zone2 );
            /*
             if ( model.answerShape.zone === zone ) {
             model.answerShape = {zone: -1, indexShape: -1};
             }
             */
          }
          if ( zone >= 12 && model.lastChangedZone < 0 ) {
            model.lastChangedZone = zone;
          }
          else if ( model.dropZone[12] >= -1 ) {
            model.lastChangedZone = 12;
          }
          else if ( model.dropZone[13] >= -1 ) {
            model.lastChangedZone = 13;
          }
          thisNode.dropShapeToZone( event.currentTarget, zone );
          /*model.shapes[.indexShape].dropZone = zone;
           model.dropZone[zone] = event.currentTarget.indexShape;*/
          //thisNode.resetLevel();
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

    this.resetLevel = function() {
      var i, shape;
      shapeNode.removeAllChildren();
      for ( i = 0; i < model.dropZone.length; i++ ) {
        model.dropZone[i] = -1;
      }
      model.lastPair = [-1, -1];

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
          model.dropZone[shape.dropZone] = i;
        }

        model.answerZone = [];
        for ( var j = 0; j < model.gameModel.MAXIMUM_PAIRS; j++ ) {
          equallyAnswerSymbol[j].setVisible( false );
        }
      }
    };


    model.buttonStatusProperty.link( function updateButtonStatus( value ) {
      buttonOk.setVisible( value === 'ok' );
      buttonCheck.setVisible( value === 'check' );
      buttonTryAgain.setVisible( value === 'tryAgain' );
      buttonShowAnswer.setVisible( value === 'showAnswer' );
      if ( model.buttonStatus === 'ok' ) {
        smile.setValue( 2 - model.stepScore );
      }
      else {
        smile.setValue( 0 );
      }
      if ( model.buttonStatus !== 'none' ) {
        comparisonChart.reset();
        if ( model.buttonStatus !== 'check' ) {
          comparisonChart.compare( model.shapes[model.lastPair[0]], model.shapes[model.lastPair[1]] );
        }
      }
      else {
        comparisonChart.hide();
      }
    } );

    model.buttonStatusProperty.link( function updateLevel() {
      //thisNode.resetLevel();
    } );

    model.gameModel.isTimerProperty.link( function( isTimer ) {
      timeLabel.visible = isTimer;
    } );

    model.timeProperty.link( function( newTime ) {
      timeLabel.text = StringUtils.format( patternTimeString, Util.toFixed( newTime, 0 ) );
      timeLabel.right = levelLabel.right;
    } );

    model.scoreProperty.link( function( newScore ) {
      scoreLabel.text = StringUtils.format( patternScoreString, newScore );
      scoreLabel.right = levelLabel.right;
    } );

    this.mutate( options );
    this.resetLevel();
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
      dropShapeToZone: function( shapeView, zoneIndex ) {
        //source dropZone empty
        this.model.dropZone[this.model.shapes[shapeView.indexShape].dropZone] = -1;
        //target dropZone now = indexShape
        this.model.dropZone[zoneIndex] = shapeView.indexShape;
        shapeView.dropZone = zoneIndex;
        var targetPosition = this.getShapeDropPosition( zoneIndex );
        new TWEEN.Tween( shapeView ).to( { x: targetPosition.x, y: targetPosition.y } ).start();
      }
    }
  );

} );
