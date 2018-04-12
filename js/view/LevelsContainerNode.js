// Copyright 2014-2017, University of Colorado Boulder

/**
 * Levels Container. Contains levels and common buttons and scales
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // modules
  var BackButton = require( 'SCENERY_PHET/buttons/BackButton' );
  var fractionMatcher = require( 'FRACTION_MATCHER/fractionMatcher' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LevelNode = require( 'FRACTION_MATCHER/view/LevelNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var RefreshButton = require( 'SCENERY_PHET/buttons/RefreshButton' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var myMatchesString = require( 'string!FRACTION_MATCHER/myMatches' );

  // images
  var scaleImage = require( 'image!FRACTION_MATCHER/scale.png' );

  /**
   *
   * @param {FractionMatcherModel} model
   * @param layoutBounds
   * @constructor
   */
  function LevelsContainerNode( model, layoutBounds ) {
    var margin = 15;
    this.model = model;

    var self = this;
    var i;
    var j;
    Node.call( this );

    //top gray targets                                          f
    this.answerRects = [];
    for ( i = 0; i < 6; i++ ) {
      this.answerRects.push( new Rectangle( margin + i * 125, margin, 115, 70, 10, 10, { fill: '#C0C0C0' } ) );
      self.addChild( this.answerRects[ i ] );
    }

    //My matches string
    self.addChild( new Text( myMatchesString, { font: new PhetFont( { size: 14, weight: 'bold' } ), x: 15, y: 100 } ) );

    //right buttons, reset and toLevelSelection
    var backButton = new BackButton( {
      listener: function() {model.currentLevelProperty.set( 0 );},
      y: 120,
      left: margin
    } );
    self.addChild( backButton );

    var refreshButton = new RefreshButton( {
      iconScale: 0.7,
      xMargin: 9,
      yMargin: 7,
      listener: function() {
        if ( model.levels[ model.currentLevelProperty.get() - 1 ] ) {
          model.levels[ model.currentLevelProperty.get() - 1 ].reset();
        }
        if ( self.levelNodes[ model.currentLevelProperty.get() - 1 ] ) {
          self.levelNodes[ model.currentLevelProperty.get() - 1 ].generateNewLevel();
        }
      },
      left: margin,
      y: backButton.bottom + 8
    } );
    self.addChild( refreshButton );

    //scales
    var scalesMarginFromCenter = 150;
    this.scales = [];
    var scalePositionY = 222;
    this.scales[ 0 ] = new Image( scaleImage, {
      centerX: model.width / 2 - scalesMarginFromCenter,
      y: scalePositionY,
      scale: 0.33
    } );
    this.scales[ 1 ] = new Image( scaleImage, {
      centerX: model.width / 2 + scalesMarginFromCenter,
      y: scalePositionY,
      scale: 0.33
    } );
    self.addChild( this.scales[ 0 ] );
    self.addChild( this.scales[ 1 ] );

    //source rectangles
    this.sourceRectangles = [];
    for ( i = 0; i < 6; i++ ) {
      for ( j = 0; j < 2; j++ ) {
        this.sourceRectangles.push( new Rectangle( 85 + i * 96, 315 + j * 90, 96, 90, 0, 0, {
          stroke: '#C0C0C0',
          lineWidth: 1
        } ) );
        self.addChild( this.sourceRectangles[ this.sourceRectangles.length - 1 ] );
      }
    }

    this.levelNodes = [];

    model.currentLevelProperty.link( function( newLevel ) {
      if ( newLevel > 0 ) {
        //generate each node levelNode on demand, to make loading faster
        if ( !self.levelNodes[ newLevel - 1 ] ) {
          self.levelNodes[ newLevel - 1 ] = new LevelNode( model.levels[ newLevel - 1 ], self, layoutBounds, self.model.stepEmitter );
        }

        //if we keep it in memory - append to dom
        if ( !self.levelNodes[ newLevel - 1 ].getParent() ) {
          self.addChild( self.levelNodes[ newLevel - 1 ] );
        }

        //if shapes not drawn, draw shapes then show level. Made this to not generate all levels at once as it freeze simulation for 1-2 seconds
        if ( !model.levels[ newLevel - 1 ].shapesProperty.value[ 0 ].view ) {
          self.levelNodes[ newLevel - 1 ].generateNewLevel();
        }

      }
    } );
  }

  fractionMatcher.register( 'LevelsContainerNode', LevelsContainerNode );

  return inherit( Node, LevelsContainerNode );
} );
