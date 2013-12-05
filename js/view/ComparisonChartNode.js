// Copyright 2002-2013, University of Colorado Boulder

/**
 * Comparison chart for the 'Fraction Matcher'.
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( "SCENERY/nodes/Node" ),
    Path = require( 'SCENERY/nodes/Path' ),
    Shape = require( 'KITE/Shape' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    Image = require( 'SCENERY/nodes/Image' );

  function ComparisonChartNode( options ) {
    options = _.extend( {
        radius: 70,

        symbolFill: "#FFFF00",
        symbolWidth: 2,
        stroke: "#000",
        lineBaseWidth: 3,
        lineOtherWidth: 1,
        lineWeight: 100,
        lineHeight: 200
      },
      options );
    var thisNode = this;

    var lessShape = new Shape();
    lessShape.moveTo( -options.lineWeight / 8, 0 );
    lessShape.lineTo( options.lineWeight / 4, -options.lineWeight / 8 );
    lessShape.lineTo( options.lineWeight / 4, -options.lineWeight / 4 );
    lessShape.lineTo( -options.lineWeight / 4, -options.lineWeight / 16 );
    lessShape.lineTo( -options.lineWeight / 4, options.lineWeight / 16 );
    lessShape.lineTo( options.lineWeight / 4, options.lineWeight / 4 );
    lessShape.lineTo( options.lineWeight / 4, options.lineWeight / 8 );
    lessShape.close();
    var eqShape = new Shape();
    eqShape.moveTo( -3 * options.lineWeight / 8, -3 * options.lineWeight / 16 );
    eqShape.lineTo( 3 * options.lineWeight / 8, -3 * options.lineWeight / 16 );
    eqShape.lineTo( 3 * options.lineWeight / 8, -options.lineWeight / 16 );
    eqShape.lineTo( -3 * options.lineWeight / 8, -options.lineWeight / 16 );
    eqShape.lineTo( -3 * options.lineWeight / 8, -3 * options.lineWeight / 16 );

    eqShape.moveTo( -3 * options.lineWeight / 8, 3 * options.lineWeight / 16 );
    eqShape.lineTo( 3 * options.lineWeight / 8, 3 * options.lineWeight / 16 );
    eqShape.lineTo( 3 * options.lineWeight / 8, options.lineWeight / 16 );
    eqShape.lineTo( -3 * options.lineWeight / 8, options.lineWeight / 16 );
    eqShape.lineTo( -3 * options.lineWeight / 8, 3 * options.lineWeight / 16 );

    var rectLeft = new Path( null, {stroke: options.stroke, lineWidth: options.lineOtherWidth} ), rectRight = new Path( null, {stroke: options.stroke, lineWidth: options.lineOtherWidth} ),
      less = new Path( lessShape, {y: options.lineWeight / 4 + 10, stroke: options.stroke, lineWidth: options.symbolWidth, fill: options.symbolFill} ), eq = new Path( eqShape, {y: options.lineWeight / 4 + 10, stroke: options.stroke, lineWidth: options.symbolWidth, fill: options.symbolFill} ), more = new Node();
    more.addChild( new Path( lessShape, {y: options.lineWeight / 4 + 10, stroke: options.stroke, lineWidth: options.symbolWidth, fill: options.symbolFill} ) );
    more.scale( -1, 1 );

    Node.call( thisNode );

    thisNode.addChild( new Path( Shape.lineSegment( 0, 0, 0, -options.lineHeight - 20 ), {stroke: options.stroke, lineWidth: options.lineBaseWidth} ) );

    thisNode.addChild( new Path( Shape.lineSegment( -options.lineWeight / 2, 0, options.lineWeight / 2, 0 ), {stroke: options.stroke, lineWidth: options.lineBaseWidth} ) );
    thisNode.addChild( new Path( Shape.lineSegment( -options.lineWeight / 2, -options.lineHeight / 2, options.lineWeight / 2, -options.lineHeight / 2 ), {stroke: options.stroke, lineWidth: options.lineBaseWidth} ) );
    thisNode.addChild( new Path( Shape.lineSegment( -options.lineWeight / 2, -options.lineHeight, options.lineWeight / 2, -options.lineHeight ), {stroke: options.stroke, lineWidth: options.lineBaseWidth} ) );

    thisNode.addChild( new Path( Shape.lineSegment( -options.lineWeight / 4, -options.lineHeight / 8, options.lineWeight / 4, -options.lineHeight / 8 ), {stroke: options.stroke, lineWidth: options.lineOtherWidth} ) );
    thisNode.addChild( new Path( Shape.lineSegment( -3 * options.lineWeight / 8, -2 * options.lineHeight / 8, 3 * options.lineWeight / 8, -2 * options.lineHeight / 8 ), {stroke: options.stroke, lineWidth: options.lineOtherWidth} ) );
    thisNode.addChild( new Path( Shape.lineSegment( -options.lineWeight / 4, -3 * options.lineHeight / 8, options.lineWeight / 4, -3 * options.lineHeight / 8 ), {stroke: options.stroke, lineWidth: options.lineOtherWidth} ) );

    thisNode.addChild( new Path( Shape.lineSegment( -options.lineWeight / 4, -5 * options.lineHeight / 8, options.lineWeight / 4, -5 * options.lineHeight / 8 ), {stroke: options.stroke, lineWidth: options.lineOtherWidth} ) );
    thisNode.addChild( new Path( Shape.lineSegment( -3 * options.lineWeight / 8, -6 * options.lineHeight / 8, 3 * options.lineWeight / 8, -6 * options.lineHeight / 8 ), {stroke: options.stroke, lineWidth: options.lineOtherWidth} ) );
    thisNode.addChild( new Path( Shape.lineSegment( -options.lineWeight / 4, -7 * options.lineHeight / 8, options.lineWeight / 4, -7 * options.lineHeight / 8 ), {stroke: options.stroke, lineWidth: options.lineOtherWidth} ) );

    thisNode.addChild( new Text( "0", { font: new PhetFont( { size: 18, weight: "normal"} ), centerX: -options.lineWeight / 2 - 10, centerY: 0 } ) );
    thisNode.addChild( new Text( "0", { font: new PhetFont( { size: 18, weight: "normal"} ), centerX: options.lineWeight / 2 + 10, centerY: 0 } ) );

    thisNode.addChild( new Text( "1", { font: new PhetFont( { size: 18, weight: "normal"} ), centerX: -options.lineWeight / 2 - 10, centerY: -options.lineHeight / 2  } ) );
    thisNode.addChild( new Text( "1", { font: new PhetFont( { size: 18, weight: "normal"} ), centerX: options.lineWeight / 2 + 10, centerY: -options.lineHeight / 2  } ) );

    thisNode.addChild( new Text( "2", { font: new PhetFont( { size: 18, weight: "normal"} ), centerX: -options.lineWeight / 2 - 10, centerY: -options.lineHeight } ) );
    thisNode.addChild( new Text( "2", { font: new PhetFont( { size: 18, weight: "normal"} ), centerX: options.lineWeight / 2 + 10, centerY: -options.lineHeight } ) );

    thisNode.addChild( rectLeft );
    thisNode.addChild( rectRight );
    thisNode.addChild( less );
    thisNode.addChild( eq );
    thisNode.addChild( more );
    var widthRect = options.lineWeight / 4 * 0.6;

    rectLeft.shape = Shape.rectangle( -options.lineWeight / 8 - widthRect / 2, 0, widthRect, -50 );
    rectLeft.fill = "#F00";
    rectRight.shape = Shape.rectangle( options.lineWeight / 8 - widthRect / 2, 0, widthRect, -100 );
    rectRight.fill = "#0F0";

    less.setVisible( false );
    eq.setVisible( false );
    more.setVisible( false );
    this.compare = function( left, right ) {
      rectLeft.shape = Shape.rectangle( -options.lineWeight / 8 - widthRect / 2, 0, widthRect, -left.getAnswer() * 100 );
      rectLeft.fill = left.fill;
      rectRight.shape = Shape.rectangle( options.lineWeight / 8 - widthRect / 2, 0, widthRect, -right.getAnswer() * 100 );
      rectRight.fill = right.fill;

      less.setVisible( left.getAnswer() < right.getAnswer() );
      eq.setVisible( left.getAnswer() === right.getAnswer() );
      more.setVisible( left.getAnswer() > right.getAnswer() );
    };
    this.reset = function() {
      this.setVisible( true );
      less.setVisible( false );
      eq.setVisible( false );
      more.setVisible( false );
      rectLeft.shape = Shape.rectangle( -options.lineWeight / 8 - widthRect / 2, 0, widthRect, 0 );
      rectRight.shape = Shape.rectangle( options.lineWeight / 8 - widthRect / 2, 0, widthRect, 0 );
    };
    this.hide = function() {
      this.setVisible( false );
      less.setVisible( false );
      eq.setVisible( false );
      more.setVisible( false );
      rectLeft.shape = Shape.rectangle( -options.lineWeight / 8 - widthRect / 2, 0, widthRect, 0 );
      rectRight.shape = Shape.rectangle( options.lineWeight / 8 - widthRect / 2, 0, widthRect, 0 );
    };
    this.reset();
    this.mutate( options );
  }

  return inherit( Node, ComparisonChartNode );
} );
