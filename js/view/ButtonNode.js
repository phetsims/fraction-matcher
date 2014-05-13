// Copyright 2002-2014, University of Colorado Boulder

/**
 * Single Button Constructor
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( "SCENERY/nodes/Node" );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var PushButton = require( 'SUN/PushButton' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  function ButtonNode( text, callback, options ) {
    var thisNode = this,
      textNode = new Text( text, { font: options.font } ),
      width, height,
      baseUpBt = new Node(),
      baseDownBt = new Node(),
      baseOverBt = new Node(),
      shadowBt;

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
        rectangleXMargin: 5,
        rectangleYMargin: 3
      },
      options
    );

    Node.call( thisNode, {x: options.x, y: options.y} );

    textNode.centerX = 0;
    textNode.centerY = 0;
    width = textNode.width + options.rectangleXMargin * 2;
    height = textNode.height + options.rectangleYMargin * 2;

    baseUpBt.addChild( new Rectangle( -(width / 2), -(height / 2), width, height, options.rectangleCornerRadius, options.rectangleCornerRadius, {fill: options.rectangleFillUp, stroke: options.stroke, lineWidth: options.lineWidth} ) );
    baseUpBt.addChild( textNode );

    baseDownBt.addChild( new Rectangle( -(width / 2), -(height / 2), width, height, options.rectangleCornerRadius, options.rectangleCornerRadius, {fill: options.rectangleFillDown, stroke: options.stroke, lineWidth: options.lineWidth} ) );
    baseDownBt.addChild( textNode );

    baseOverBt.addChild( new Rectangle( -(width / 2), -(height / 2), width, height, options.rectangleCornerRadius, options.rectangleCornerRadius, {fill: options.rectangleFillOver, stroke: options.stroke, lineWidth: options.lineWidth} ) );
    baseOverBt.addChild( textNode );

    shadowBt = new Rectangle( -(width / 2) + options.shadowOffset.x, -(height / 2) + options.shadowOffset.y, width, height, options.rectangleCornerRadius, options.rectangleCornerRadius, {fill: options.shadowFill, stroke: options.shadowFill, lineWidth: options.lineWidth} );

    thisNode.addChild( new PushButton(
        new Node( {children: [shadowBt, baseUpBt]} ),
        new Node( {children: [shadowBt, baseOverBt]} ),
        new Node( {children: [baseDownBt], x: options.shadowOffset.x, y: options.shadowOffset.y} ),
        new Node( {children: [baseUpBt]} ),
        {listener: callback} )
    );
  }

  return inherit( Node, ButtonNode );
} );
