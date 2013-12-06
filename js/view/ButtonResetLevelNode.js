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
    Image = require( 'SCENERY/nodes/Image' );

  function ButtonResetLevelNode( options ) {
    var thisNode = this,
      image = new Image( require( 'image!FRACTION_MATCHER/../images/view-refresh.png' ), {scale: 0.27} ),
      baseBt = new Node(),
      shadowBt;

    options = _.extend( {
        x: 0,
        y: 0,
        width: 70,
        height: 35,
        fill: "#FEF452",
        stroke: "#000000",
        lineWidth: 1,
        value: "",
        label: "Level 0",
        starCount: 3,
        shape: new Node(),
        round: 4,
        shadowOffset: {x: 2, y: 3},
        shadowFill: "#CCCCCC",
        score: 0,
        callback: function() {}
      },
      options
    );

    Node.call( thisNode, {x: options.x, y: options.y} );

    baseBt.addChild( new Rectangle( -(options.width / 2), -(options.height / 2), options.width, options.height, options.round, options.round, {fill: options.fill, stroke: options.stroke, lineWidth: options.lineWidth} ) );
    baseBt.addChild( image );
    image.setTranslation( -Math.round( image.width / 2 ) + 0.5, -Math.round( image.height / 2 ) + 0.5 );

    shadowBt = new Rectangle( -(options.width / 2) + options.shadowOffset.x, -(options.height / 2) + options.shadowOffset.y, options.width, options.height, options.round, options.round, {fill: options.shadowFill, stroke: options.shadowFill, lineWidth: options.lineWidth} );

    thisNode.addChild( new PushButton(
      new Node( {children: [shadowBt, baseBt]} ),
      new Node( {children: [shadowBt, baseBt]} ),
      new Node( {children: [baseBt], x: options.shadowOffset.x, y: options.shadowOffset.y} ),
      new Node( {children: [baseBt]} ),
      {listener: function() {options.callback( options.value );}} )
    );
  }

  return inherit( Node, ButtonResetLevelNode );
} );
