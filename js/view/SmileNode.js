// Copyright 2002-2013, University of Colorado Boulder

/**
 * Smile add score node for the 'Fraction Matcher'.
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
    PhetFont = require( 'SCENERY_PHET/PhetFont' );

  function SmileNode( options ) {
    options = _.extend( {
        radius: 70,
        fill: "#FFFF00",
        stroke: "#000",
        lineWidth: 6
      },
      options );
    var thisNode = this, scoreText;
    Node.call( thisNode );

    thisNode.addChild( new Path( Shape.circle( 0, 0, options.radius ), {fill: options.fill} ) );
    thisNode.addChild( new Path( Shape.circle( Math.cos( 7 * Math.PI / 6 ) * options.radius * 0.5, Math.sin( 7 * Math.PI / 6 ) * options.radius * 0.5, options.lineWidth * 2 ), {fill: options.stroke} ) );
    thisNode.addChild( new Path( Shape.circle( Math.cos( -1 * Math.PI / 6 ) * options.radius * 0.5, Math.sin( -1 * Math.PI / 6 ) * options.radius * 0.5, options.lineWidth * 2 ), {fill: options.stroke} ) );
    thisNode.addChild( new Path( Shape.arc( 0, 0, options.radius * 0.6, Math.PI / 6, 5 * Math.PI / 6, false ), {stroke: options.stroke, lineWidth: options.lineWidth, lineCap: "round" } ) );
    thisNode.addChild( scoreText = new Text( "+2", { font: new PhetFont( { size: 19, weight: "bold"} ), centerX: 0, y: options.radius + 30  } ) );
    this.setValue = function( value ) {
      scoreText.text = "+" + value;
      this.setVisible( value > 0 );
    };
    this.mutate( options );
  }

  return inherit( Node, SmileNode );
} );
