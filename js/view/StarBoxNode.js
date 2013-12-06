// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for box with 3 star in bottom of level button.
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( "SCENERY/nodes/Node" ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    StarNode = require( 'FRACTION_MATCHER/view/StarNode' ),
    Image = require( 'SCENERY/nodes/Image' );

  function StarBoxNode( options ) {
    var thisNode = this,
      starNode = new Node(),
      star = [],
      i, k;

    options = _.extend( {
        x: 0,
        y: 0,
        width: 130,
        fill: "#FFFFFF",
        stroke: "#808080",
        lineWidth: 2,
        starCount: 3, // 3..4
        round: 10,
        padding: 5
      },
      options
    );

    Node.call( thisNode, {x: options.x, y: options.y} );

    // create stars
    for ( i = 0; i < options.starCount; i++ ) {
      star.push( new StarNode( {x: i * 250} ) );
    }
    starNode.children = star;
    k = options.width / (starNode.width + 100); // scale stars according to box size
    starNode.scale( k );
    starNode.centerX = 0;
    starNode.centerY = 0;

    // add stars to node
    thisNode.addChild( new Rectangle( -(starNode.width / 2 + 50 * k), -(starNode.height / 2 + 50 * k), starNode.width + 100 * k, starNode.height + 100 * k, options.round, options.round, {fill: options.fill, stroke: options.stroke, lineWidth: options.lineWidth} ) );
    thisNode.addChild( starNode );

    // set new score and update view for stars
    thisNode.setScore = function( score ) {
      star.forEach( function( star, i ) {
        star.setScore( Math.max( 0, Math.min( 4, score - i * 4 ) ) );
      } );
    };
  }

  return inherit( Node, StarBoxNode );
} );
