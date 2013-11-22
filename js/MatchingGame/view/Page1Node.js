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
    matchingGameHeaderString = require( 'string!FRACTION_MATCHER/matchingGameHeader' ),
    patternLevelString = require( 'string!FRACTION_MATCHER/patternLevel' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    StringUtils = require( 'PHETCOMMON/util/StringUtils' ),
    LevelButtonNode = require( 'FRACTION_MATCHER/MatchingGame/view/LevelButtonNode' ),
    ShapeNode = require( 'FRACTION_MATCHER/common/view/shapes/ShapeNode' );

  function Page1Node( model ) {

    var thisNode = this;
    Node.call( thisNode );
    var header = new Text( matchingGameHeaderString, { font: new PhetFont( { size: 40, weight: "bold"} ), centerX: 1140 / 2, centerY: 40  } );
    var levelBt = [
      new LevelButtonNode( model, {
        x: 250,
        y: 200,
        label: StringUtils.format( patternLevelString, 1 ),
        shape: new ShapeNode( {
          type: 'PIES',
          x: 0,
          y: -10,
          width: 90,
          height: 90,
          numerator: 1,
          denominator: 1,
          undivided: 0,
          fill: "#E94646"
        } ),
        callback: function setLevel( x ) {model.setLevel( x );},
        value: 1 } ),
      new LevelButtonNode( model, {
        x: 450,
        y: 200,
        label: StringUtils.format( patternLevelString, 2 ),
        shape: new ShapeNode( {
          type: 'HORIZONTAL_BARS',
          x: 0,
          y: -10,
          width: 90,
          height: 90,
          numerator: 2,
          denominator: 2,
          undivided: 0,
          fill: "#8CC640"
        } ),
        callback: function setLevel( x ) {model.setLevel( x );},
        value: 2} ),
      new LevelButtonNode( model, {
        x: 650,
        y: 200,
        label: StringUtils.format( patternLevelString, 3 ),
        shape: new ShapeNode( {
          type: 'VERTICAL_BARS',
          x: 0,
          y: -10,
          width: 90,
          height: 90,
          numerator: 3,
          denominator: 3,
          undivided: 0,
          fill: "#58B6DD"
        } ),
        callback: function setLevel( x ) {model.setLevel( x );},
        value: 3} ),
      new LevelButtonNode( model, {
        x: 850,
        y: 200,
        label: StringUtils.format( patternLevelString, 4 )/*,
         shape: new ShapeNode( {
         type: 'TETRIS',
         x: 0,
         y: -10,
         width: 90,
         height: 90,
         numerator: 4,
         denominator: 4,
         undivided: 0,
         fill: model.CONSTANTS.COLORS.ORANGE
         } ),
         callback: function setLevel( x ) {model.setLevel( x );},
         value: 4*/} ),
      new LevelButtonNode( model, {
        x: 250,
        y: 450,
        label: StringUtils.format( patternLevelString, 5 )} ),
      new LevelButtonNode( model, {x: 450, y: 450, label: StringUtils.format( patternLevelString, 6 )} ),
      new LevelButtonNode( model, {x: 650, y: 450, label: StringUtils.format( patternLevelString, 7 )} ),
      new LevelButtonNode( model, {x: 850, y: 450, label: StringUtils.format( patternLevelString, 8 )} )
    ];

    thisNode.addChild( header );
    for ( var i = 0; i < levelBt.length; i++ ) {
      thisNode.addChild( levelBt[i] );
    }

    model.selectLevelProperty.link( function updateSelectLevel() {
      for ( var i = 0; i < levelBt.length; i++ ) {
        if ( model.levelStatus[i + 1] ) {
          levelBt[i].setScore( model.levelStatus[i + 1].hiScore );
        }
      }
    } );
  }

  return inherit( Node, Page1Node );
} );
