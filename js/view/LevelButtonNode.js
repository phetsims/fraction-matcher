// Copyright 2002-2013, University of Colorado Boulder

/**
 * Scene graph for the 'Fraction Matcher' screen.
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( "SCENERY/nodes/Node" ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    PushButton = require( 'SUN/PushButton' ),
    StarBoxNode = require( 'FRACTION_MATCHER/view/StarBoxNode' );

  function LevelButtonNode( model, options ) {
    options = _.extend( {
        x: 0,
        y: 0,
        width: 130,
        height: 200,
        fill: "#F2F2F2",
        stroke: "#404040",
        lineWidth: 1,
        value: "",
        label: "Level 0",
        starCount: 3,
        shape: new Node(),
        round: 10,
        shadowOffset: {x: 3, y: 4},
        score: 0,
        callback: function noFunction() {}
      },
      options
    );
    var thisNode = this;
    Node.call( thisNode, {x: options.x, y: options.y} );
    thisNode.score = 0;
    var starBox;
    var baseBt = new Node();
    baseBt.addChild( new Rectangle( -(options.width / 2), -(options.height / 2), options.width, options.height, options.round, options.round, {fill: options.fill, stroke: options.stroke, lineWidth: options.lineWidth} ) );
    baseBt.addChild( new Text( options.label, { font: new PhetFont( { size: 18, weight: "bold"} ), centerX: 0, centerY: -(options.height / 2) + 15 } ) );
    baseBt.addChild( new Node( {children: [options.shape], x: 0, y: 0} ) );
    baseBt.addChild( starBox = new StarBoxNode( {x: 0, y: options.height / 2 - 25, width: options.width, starCount: options.starCount} ) );


    var shadowBt = new Rectangle( -(options.width / 2) + options.shadowOffset.x, -(options.height / 2) + options.shadowOffset.y, options.width, options.height, options.round, options.round, {fill: options.stroke, stroke: options.stroke, lineWidth: options.lineWidth} );

    thisNode.addChild( new PushButton(
      new Node( {children: [shadowBt, baseBt]} ),
      new Node( {children: [shadowBt, baseBt]} ),
      new Node( {children: [baseBt], x: options.shadowOffset.x, y: options.shadowOffset.y} ),
      new Node( {children: [baseBt]} ),
      {listener: function() {options.callback( options.value );}} ) );

    thisNode.setScore = function( score ) {
      starBox.setScore( score );
    };
    thisNode.setScore( options.score );
  }

  return inherit( Node, LevelButtonNode );
} );
