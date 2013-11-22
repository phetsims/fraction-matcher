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
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    PushButton = require( 'SUN/PushButton' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' );

  function ButtonNode( text, callback, options ) {
    options = _.extend( {
        x: 0,
        y: 0,
        stroke: "#000000",
        lineWidth: 1,
        shadowOffset: {x: 2, y: 3},
        shadowFill: "rgba(0,0,0,0.2)",

        font: new PhetFont( { size: 19, weight: "bold"} ),
        rectangleFillUp: "#FFD63F",
        rectangleFillDown: "#FFD63F",
        rectangleFillOver: "#FFEA9D",
        rectangleCornerRadius: 5,
        rectangleXMargin: 10,
        rectangleYMargin: 5
      },
      options
    );
    var thisNode = this;
    Node.call( thisNode, {x: options.x, y: options.y} );

    var textNode = new Text( text, { font: options.font } );
    textNode.centerX = 0;
    textNode.centerY = 0;
    var width = textNode.width + options.rectangleXMargin * 2;
    var height = textNode.height + options.rectangleYMargin * 2;

    var baseUpBt = new Node();
    baseUpBt.addChild( new Rectangle( -(width / 2), -(height / 2), width, height, options.rectangleCornerRadius, options.rectangleCornerRadius, {fill: options.rectangleFillUp, stroke: options.stroke, lineWidth: options.lineWidth} ) );
    baseUpBt.addChild( textNode );

    var baseDownBt = new Node();
    baseDownBt.addChild( new Rectangle( -(width / 2), -(height / 2), width, height, options.rectangleCornerRadius, options.rectangleCornerRadius, {fill: options.rectangleFillDown, stroke: options.stroke, lineWidth: options.lineWidth} ) );
    baseDownBt.addChild( textNode );
    var baseOverBt = new Node();
    baseOverBt.addChild( new Rectangle( -(width / 2), -(height / 2), width, height, options.rectangleCornerRadius, options.rectangleCornerRadius, {fill: options.rectangleFillOver, stroke: options.stroke, lineWidth: options.lineWidth} ) );
    baseOverBt.addChild( textNode );

    var shadowBt = new Rectangle( -(width / 2) + options.shadowOffset.x, -(height / 2) + options.shadowOffset.y, width, height, options.rectangleCornerRadius, options.rectangleCornerRadius, {fill: options.shadowFill, stroke: options.shadowFill, lineWidth: options.lineWidth} );

    thisNode.addChild( new PushButton(
      new Node( {children: [shadowBt, baseUpBt]} ),
      new Node( {children: [shadowBt, baseOverBt]} ),
      new Node( {children: [baseDownBt], x: options.shadowOffset.x, y: options.shadowOffset.y} ),
      new Node( {children: [baseUpBt]} ),
      {listener: function() {callback();}} ) );
  }

  return inherit( Node, ButtonNode );
} );
