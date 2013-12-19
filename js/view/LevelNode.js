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
    Node = require( "SCENERY/nodes/Node" ),
    Text = require( 'SCENERY/nodes/Text' ),
    Matrix3 = require( 'DOT/Matrix3' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    equallyAnswerSymbolString = require( 'string!FRACTION_MATCHER/equallyAnswerSymbol' ),
    ButtonBackNode = require( 'FRACTION_MATCHER/view/ButtonBackNode' ),
    ShapeNode = require( 'FRACTION_COMMON/shapes/ShapeNode' ),
    Image = require( 'SCENERY/nodes/Image' ),
    SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' ),
    Path = require( 'SCENERY/nodes/Path' ),
    Shape = require( 'KITE/Shape' ),
    TextPushButton = require( 'SUN/TextPushButton' ),
    ButtonNode = require( 'FRACTION_MATCHER/view/ButtonNode' );

  function LevelNode( model, options ) {

    var thisNode = this;
    Node.call( thisNode );

    var shapeNode = new Node();
    var dragLayer = new Node();
    var equallyAnswerSymbol = [];
    var offsetCursor = {};
    var i;
    var startDrag = function( event ) {
        if ( model.canDrag ) {
          model.drag = true;
          offsetCursor = {x: thisNode.globalToParentPoint( event.pointer.point ).x - event.currentTarget.x, y: thisNode.globalToParentPoint( event.pointer.point ).y - event.currentTarget.y};
          event.currentTarget.x = thisNode.globalToParentPoint( event.pointer.point ).x - offsetCursor.x;
          event.currentTarget.y = thisNode.globalToParentPoint( event.pointer.point ).y - offsetCursor.y;
          model.dropZone[model.levelStatus[model.selectLevel].shape[event.currentTarget.indexShape].dropZone].indexShape = -1;
          dragLayer.children = [event.currentTarget];
          if ( model.levelStatus[model.selectLevel].answerShape.zone === model.levelStatus[model.selectLevel].shape[event.currentTarget.indexShape].dropZone ) {
            model.levelStatus[model.selectLevel].answerShape = {zone: -1, indexShape: -1};
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
            var zone2 = model.nearDropZone( model.levelStatus[model.selectLevel].shape[model.dropZone[zone].indexShape].view, true );
            model.levelStatus[model.selectLevel].shape[model.dropZone[zone].indexShape].dropZone = zone2;
            model.levelStatus[model.selectLevel].shape[model.dropZone[zone].indexShape].view.x = model.dropZone[zone2].x;
            model.levelStatus[model.selectLevel].shape[model.dropZone[zone].indexShape].view.y = model.dropZone[zone2].y;
            model.dropZone[zone2].indexShape = model.dropZone[zone].indexShape;
            if ( model.levelStatus[model.selectLevel].answerShape.zone === zone ) {
              model.levelStatus[model.selectLevel].answerShape = {zone: -1, indexShape: -1};
            }
          }
          if ( zone >= 12 && model.levelStatus[model.selectLevel].answerShape.zone < 0 ) {
            model.levelStatus[model.selectLevel].answerShape = {zone: zone, indexShape: event.currentTarget.indexShape};
          }
          else if ( model.dropZone[12].indexShape >= 1 ) {
            model.levelStatus[model.selectLevel].answerShape = {zone: 12, indexShape: model.dropZone[12].indexShape};
          }
          else if ( model.dropZone[13].indexShape >= 1 ) {
            model.levelStatus[model.selectLevel].answerShape = {zone: 13, indexShape: model.dropZone[13].indexShape};
          }

          event.currentTarget.x = model.dropZone[zone].x;
          event.currentTarget.y = model.dropZone[zone].y;
          model.levelStatus[model.selectLevel].shape[event.currentTarget.indexShape].dropZone = zone;
          model.dropZone[zone].indexShape = event.currentTarget.indexShape;
          dragLayer.removeAllChildren();
          model.changeStatus = !model.changeStatus;
          model.drag = false;
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
    thisNode.addChild( dragLayer );

    this.refreshLevel = function() {
      var i, shape;
      shapeNode.removeAllChildren();
      dragLayer.removeAllChildren();
      for ( i = 0; i < model.dropZone.length; i++ ) {
        model.dropZone[i].indexShape = -1;
      }
      for ( i = 0; i < model.answerZone.length; i++ ) {
        model.answerZone[i].indexShape = -1;
      }
      if ( model.levelStatus[model.selectLevel] ) {
        for ( i = 0; i < model.levelStatus[model.selectLevel].shape.length; i++ ) {
          shape = model.levelStatus[model.selectLevel].shape[i];
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
        }
        for ( i = 0; i < model.answerZone.length / 2; i++ ) {
          equallyAnswerSymbol[i].setVisible( model.answerZone[i * 2].indexShape >= 0 );
        }
      }
      if ( model.buttonStatus === 'check' || model.buttonStatus === 'none' ) {
        if ( model.dropZone[12].indexShape >= 0 && model.dropZone[13].indexShape >= 0 && (model.dropZone[12].indexShape !== model.levelStatus[model.selectLevel].old12 || model.dropZone[13].indexShape !== model.levelStatus[model.selectLevel].old13) ) {
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

    this.mutate( options );

    model.changeStatusProperty.link( function updateLevel() {
      if ( model.selectLevel > 0 ) {
        thisNode.refreshLevel();
      }
    } );
  }

  return inherit( Node, LevelNode );
} );
