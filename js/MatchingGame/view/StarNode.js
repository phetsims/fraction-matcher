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
    Image = require( 'SCENERY/nodes/Image' );

  function StarNode( options ) {
    options = _.extend( {
        x: 0,
        y: 0,
        score: 0
      },
      options
    );
    var thisNode = this;
    Node.call( thisNode, {x: options.x, y: options.y} );
    thisNode.score = options.score;
    var star = [
      new Image( require( 'image!FRACTION_MATCHER/../images/star-0.png' ) ),
      new Image( require( 'image!FRACTION_MATCHER/../images/star-1.png' ) ),
      new Image( require( 'image!FRACTION_MATCHER/../images/star-2.png' ) ),
      new Image( require( 'image!FRACTION_MATCHER/../images/star-3.png' ) ),
      new Image( require( 'image!FRACTION_MATCHER/../images/star-4.png' ) )
    ];
    thisNode.children = star;
    thisNode.setScore = function( score ) {
      thisNode.score = score;
      thisNode.update();
    };
    thisNode.update = function() {
      for ( var i = 0; i < star.length; i++ ) {
        star[i].setVisible( i === thisNode.score );
      }
    };
    thisNode.update();
  }

  return inherit( Node, StarNode );
} );
