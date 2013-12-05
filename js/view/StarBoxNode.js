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
    StarNode = require( 'FRACTION_MATCHER/MatchingGame/view/StarNode' );

  var Image = require( 'SCENERY/nodes/Image' );

  function StarBoxNode( options ) {
    options = _.extend( {
        x: 0,
        y: 0,
        width: 130,
        //height: 200,
        fill: "#FFFFFF",
        stroke: "#808080",
        lineWidth: 2,
        starCount: 3, // 3..4
        round: 10,
        padding: 5,
        score: 0
      },
      options
    );
    var thisNode = this;
    thisNode.score = options.score;
    Node.call( thisNode, {x: options.x, y: options.y} );
    var starNode = new Node();
    var star = [];
    for ( var i = 0; i < options.starCount; i++ ) {
      star.push( new StarNode( {x: i * 250} ) );
    }
    starNode.children = star;
    var k = options.width / (starNode.width + 100);
    starNode.scale( k );
    starNode.centerX = 0;
    starNode.centerY = 0;
    thisNode.addChild( new Rectangle( -(starNode.width / 2 + 50 * k), -(starNode.height / 2 + 50 * k), starNode.width + 100 * k, starNode.height + 100 * k, options.round, options.round, {fill: options.fill, stroke: options.stroke, lineWidth: options.lineWidth} ) );
    thisNode.addChild( starNode );
    thisNode.setScore = function( score ) {
      thisNode.score = score;
      for ( var i = 0; i < star.length; i++ ) {
        star[i].setScore( Math.max( 0, Math.min( 4, thisNode.score - i * 4 ) ) );
      }
    };
  }

  return inherit( Node, StarBoxNode );
} );
