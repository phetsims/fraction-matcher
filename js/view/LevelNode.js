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
    SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  //strings
  var buttonCheckString = require( 'string!FRACTION_MATCHER/buttonCheck' ),
    buttonOkString = require( 'string!FRACTION_MATCHER/buttonOk' ),
    buttonTryAgainString = require( 'string!FRACTION_MATCHER/buttonTryAgain' ),
    patternLevelString = require( 'string!FRACTION_MATCHER/patternLevel' ),
    patternScoreString = require( 'string!FRACTION_MATCHER/patternScore' ),
    patternTimeString = require( 'string!FRACTION_MATCHER/time.pattern' ),
    buttonShowAnswerString = require( 'string!FRACTION_MATCHER/buttonShowAnswer' );


  function LevelNode( model, options ) {
    var margin = 15;
    var thisNode = this;

    Node.call( this );

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
    var buttonOk = new ButtonNode( buttonOkString, function() {model.answerButton( "ok" );}, {font: new PhetFont( { size: 14, weight: "bold"} ), rectangleFillUp: "#44FF44", rectangleFillDown: "#44FF44", rectangleFillOver: "#9FFF9F", x: smile.centerX, y: smile.bottom + margin, rectangleCornerRadius: 5, rectangleXMargin: 10} );
    var buttonTryAgain = new ButtonNode( buttonTryAgainString, function() {model.answerButton( "tryAgain" );}, {font: new PhetFont( { size: 14, weight: "bold"} ), rectangleFillUp: "#FF7C3B", rectangleFillDown: "#FF7C3B", rectangleFillOver: "#FFBE9D", x: smile.centerX, y: smile.bottom + margin, rectangleCornerRadius: 5, rectangleXMargin: 10} );
    var buttonShowAnswer = new ButtonNode( buttonShowAnswerString, function() {model.answerButton( "showAnswer" );}, {font: new PhetFont( { size: 14, weight: "bold"} ), rectangleFillUp: "#FF7C3B", rectangleFillDown: "#FF7C3B", rectangleFillOver: "#FFBE9D", x: smile.centerX, y: smile.bottom + margin, rectangleCornerRadius: 5, rectangleXMargin: 10} );
    thisNode.addChild( buttonCheck );
    thisNode.addChild( buttonOk );
    thisNode.addChild( buttonTryAgain );
    thisNode.addChild( buttonShowAnswer );
    buttonCheck.right = Math.min( buttonCheck.right, 290 );
    buttonOk.right = Math.min( buttonOk.right, 290 );
    buttonTryAgain.right = Math.min( buttonTryAgain.right, 290 );
    buttonShowAnswer.right = Math.min( buttonShowAnswer.right, 290 );

    var comparisonChart = new ComparisonChartNode( {centerX: model.gameModel.width / 2, y: 250} );
    thisNode.addChild( comparisonChart );

    this.gameOverNode = new GameOverNode( model );
    this.gameOverNode.visible = false;
    thisNode.addChild( this.gameOverNode );

    var shapeNode = new Node();
    var equallyAnswerSymbol = [];
    var offsetCursor = {};
    var i;
    var startDrag = function( event ) {
        if ( model.canDrag ) {
          offsetCursor = {x: thisNode.globalToParentPoint( event.pointer.point ).x - event.currentTarget.x, y: thisNode.globalToParentPoint( event.pointer.point ).y - event.currentTarget.y};
          event.currentTarget.x = thisNode.globalToParentPoint( event.pointer.point ).x - offsetCursor.x;
          event.currentTarget.y = thisNode.globalToParentPoint( event.pointer.point ).y - offsetCursor.y;
          model.dropZone[model.shape[event.currentTarget.indexShape].dropZone].indexShape = -1;
          if ( model.answerShape.zone === model.shape[event.currentTarget.indexShape].dropZone ) {
            model.answerShape = {zone: -1, indexShape: -1};
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
          var zone = model.nearDropZone( event.currentTarget, false );
          if ( zone >= 12 && model.dropZone[zone].indexShape >= 0 ) {
            var zone2 = model.nearDropZone( model.shape[model.dropZone[zone].indexShape].view, true );
            model.shape[model.dropZone[zone].indexShape].dropZone = zone2;
            model.shape[model.dropZone[zone].indexShape].view.x = model.dropZone[zone2].x;
            model.shape[model.dropZone[zone].indexShape].view.y = model.dropZone[zone2].y;
            model.dropZone[zone2].indexShape = model.dropZone[zone].indexShape;
            if ( model.answerShape.zone === zone ) {
              model.answerShape = {zone: -1, indexShape: -1};
            }
          }
          if ( zone >= 12 && model.answerShape.zone < 0 ) {
            model.answerShape = {zone: zone, indexShape: event.currentTarget.indexShape};
          }
          else if ( model.dropZone[12].indexShape >= 1 ) {
            model.answerShape = {zone: 12, indexShape: model.dropZone[12].indexShape};
          }
          else if ( model.dropZone[13].indexShape >= 1 ) {
            model.answerShape = {zone: 13, indexShape: model.dropZone[13].indexShape};
          }

          event.currentTarget.x = model.dropZone[zone].x;
          event.currentTarget.y = model.dropZone[zone].y;
          model.shape[event.currentTarget.indexShape].dropZone = zone;
          model.dropZone[zone].indexShape = event.currentTarget.indexShape;
          model.changeStatus = !model.changeStatus;
          thisNode.refreshLevel();
        }
      },
      dragParamers = {
        allowTouchSnag: true,
        start: startDrag,
        drag: moveDrag,
        end: endDrag
      };

    thisNode.addChild( shapeNode );

    this.refreshLevel = function() {
      var i, shape;
      shapeNode.removeAllChildren();
      for ( i = 0; i < model.dropZone.length; i++ ) {
        model.dropZone[i].indexShape = -1;
      }
      for ( i = 0; i < model.answerZone.length; i++ ) {
        model.answerZone[i].indexShape = -1;
      }

      for ( i = 0; i < model.shape.length; i++ ) {
        shape = model.shape[i];
        if ( shape.view === undefined ) {
          shape.view = new ShapeNode( shape );
          shape.view.cursor = "pointer";
          shape.view.addInputListener( new SimpleDragHandler( dragParamers ) );
          shape.view.indexShape = i;
        }
        shapeNode.addChild( shape.view );
        if ( shape.dropZone >= 0 ) {
          shape.view.x = model.dropZone[shape.dropZone].x;
          shape.view.y = model.dropZone[shape.dropZone].y;
          model.dropZone[shape.dropZone].indexShape = i;
        }
        else if ( shape.answerZone >= 0 ) {
          shape.view.matrix = new Matrix3();
          shape.view.x = model.answerZone[shape.answerZone].x;
          shape.view.y = model.answerZone[shape.answerZone].y;
          shape.view.scale( model.answerZone[shape.answerZone].scale );
          shape.view.cursor = "normal";
          if ( shape.view.getInputListeners().length > 0 ) {
            shape.view.removeInputListener();
          }
          model.answerZone[shape.answerZone].indexShape = i;
        }

        for ( var j = 0; j < model.answerZone.length / 2; j++ ) {
          equallyAnswerSymbol[j].setVisible( model.answerZone[j * 2].indexShape >= 0 );
        }
      }
      if ( model.buttonStatus === 'check' || model.buttonStatus === 'none' ) {
        if ( model.dropZone[12].indexShape >= 0 && model.dropZone[13].indexShape >= 0 && (model.dropZone[12].indexShape !== model.old12 || model.dropZone[13].indexShape !== model.old13) ) {
          model.buttonStatus = 'check';
        }
        else {
          model.buttonStatus = 'none';
        }
      }
    };

    for ( i = 0; i < model.answerZone.length / 2; i++ ) {
      equallyAnswerSymbol[i] = new Text( equallyAnswerSymbolString, { font: new PhetFont( { size: 22, _weight: "bold"} ), centerX: (model.answerZone[i * 2].x + model.answerZone[i * 2 + 1].x) / 2, centerY: model.answerZone[i * 2].y  } );
      thisNode.addChild( equallyAnswerSymbol[i] );
      equallyAnswerSymbol[i].setVisible( false );
    }


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
          comparisonChart.compare( model.shape[model.old12], model.shape[model.old13] );
        }
      }
      else {
        comparisonChart.hide();
      }
    } );

    model.buttonStatusProperty.link( function updateLevel() {
      thisNode.refreshLevel();
    } );

    model.gameModel.isTimerProperty.link( function( isTimer ) {
      timeLabel.visible = isTimer;
    } );

    model.timeProperty.link( function( newTime ) {
      timeLabel.text = StringUtils.format( patternTimeString, Util.toFixed( newTime, 0 ) );
      timeLabel.right = levelLabel.right;
    } );


    this.mutate( options );
  }

  return inherit( Node, LevelNode );
} );
