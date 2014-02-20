// Copyright 2002-2013, University of Colorado Boulder

/**
 * Comparison chart for the 'Fraction Matcher'.
 * Contains signs shapes (more, equal, less), scale, indicators.
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Path = require( 'SCENERY/nodes/Path' ),
    Shape = require( 'KITE/Shape' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' );

  function ComparisonChartNode( gameModel, options ) {
    var thisNode = this,
      lessShape = new Shape(),
      eqShape = new Shape();

    options = _.extend( {
        symbolFill: "#FFFF00",
        symbolWidth: 2,
        stroke: "#000",
        lineBaseWidth: 3,
        lineOtherWidth: 1,
        lineWeight: 70,
        lineHeight: 140
      },
      options );
    Node.call( thisNode );


    // create less shape
    lessShape.moveTo( -options.lineWeight / 8, 0 )
      .lineTo( options.lineWeight / 4, -options.lineWeight / 8 )
      .lineTo( options.lineWeight / 4, -options.lineWeight / 4 )
      .lineTo( -options.lineWeight / 4, -options.lineWeight / 16 )
      .lineTo( -options.lineWeight / 4, options.lineWeight / 16 )
      .lineTo( options.lineWeight / 4, options.lineWeight / 4 )
      .lineTo( options.lineWeight / 4, options.lineWeight / 8 ).close();


    // create equal shape
    eqShape.moveTo( -3 * options.lineWeight / 8, -3 * options.lineWeight / 16 )
      .lineTo( 3 * options.lineWeight / 8, -3 * options.lineWeight / 16 )
      .lineTo( 3 * options.lineWeight / 8, -options.lineWeight / 16 )
      .lineTo( -3 * options.lineWeight / 8, -options.lineWeight / 16 )
      .lineTo( -3 * options.lineWeight / 8, -3 * options.lineWeight / 16 )
      .moveTo( -3 * options.lineWeight / 8, 3 * options.lineWeight / 16 )
      .lineTo( 3 * options.lineWeight / 8, 3 * options.lineWeight / 16 )
      .lineTo( 3 * options.lineWeight / 8, options.lineWeight / 16 )
      .lineTo( -3 * options.lineWeight / 8, options.lineWeight / 16 )
      .lineTo( -3 * options.lineWeight / 8, 3 * options.lineWeight / 16 );


    var less = new Path( lessShape, {visible: false, y: options.lineWeight / 4 + 10, stroke: options.stroke, lineWidth: options.symbolWidth, fill: options.symbolFill} ),
      eq = new Path( eqShape, {visible: false, y: options.lineWeight / 4 + 10, stroke: options.stroke, lineWidth: options.symbolWidth, fill: options.symbolFill} ),
      more = new Node( {visible: false} );

    // create more shape
    more.addChild( new Path( lessShape, {y: options.lineWeight / 4 + 10, stroke: options.stroke, lineWidth: options.symbolWidth, fill: options.symbolFill} ) );
    more.scale( -1, 1 );


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


    //compare rectangles
    var widthRect = options.lineWeight / 4 * 0.6;
    var rectLeft = new Rectangle( -options.lineWeight / 8 - widthRect / 2, 0, widthRect, 0, {stroke: options.stroke, lineWidth: options.lineOtherWidth, fill: "#F00"} ),
      rectRight = new Rectangle( options.lineWeight / 8 - widthRect / 2, 0, widthRect, 0, {stroke: options.stroke, lineWidth: options.lineOtherWidth, fill: "#0F0"} );


    thisNode.addChild( rectLeft );
    thisNode.addChild( rectRight );
    thisNode.addChild( less );
    thisNode.addChild( eq );
    thisNode.addChild( more );

    // function for comparing shapes on scales
    this.compare = function( left, right ) {

      // set indicator's height
      new TWEEN.Tween( rectLeft ).to( { y: -left.getAnswer() * 100 }, gameModel.ANIMATION_TIME ).onUpdate(function( step ) {
        rectLeft.setRectHeight( left.getAnswer() * 100 * step );
      } ).start();
      new TWEEN.Tween( rectRight ).to( { y: -right.getAnswer() * 100 }, gameModel.ANIMATION_TIME ).onUpdate(function( step ) {
        rectRight.setRectHeight( right.getAnswer() * 100 * step );
      } ).start();

      less.setVisible( left.getAnswer() < right.getAnswer() );
      eq.setVisible( left.getAnswer() === right.getAnswer() );
      more.setVisible( left.getAnswer() > right.getAnswer() );
    };

    // reset all nodes
    this.reset = function() {
      rectLeft.y = 0;
      rectRight.y = 0;
      rectRight.setRectHeight(0);
      rectLeft.setRectHeight(0);

      less.setVisible( false );
      eq.setVisible( false );
      more.setVisible( false );

      this.setVisible( true );
    };
    // hide all nodes
    this.hide = function() {
      this.setVisible( false );
    };
    this.mutate( options );
  }

  return inherit( Node, ComparisonChartNode );
} );
