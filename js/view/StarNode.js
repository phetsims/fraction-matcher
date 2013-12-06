// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for a single star. Have 5 different states depends on score.
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
    var thisNode = this, star = [ // view for different score
      new Image( require( 'image!FRACTION_MATCHER/../images/star-0.png' ) ),
      new Image( require( 'image!FRACTION_MATCHER/../images/star-1.png' ) ),
      new Image( require( 'image!FRACTION_MATCHER/../images/star-2.png' ) ),
      new Image( require( 'image!FRACTION_MATCHER/../images/star-3.png' ) ),
      new Image( require( 'image!FRACTION_MATCHER/../images/star-4.png' ) )
    ];

    options = _.extend( {
        x: 0,
        y: 0
      },
      options
    );
    Node.call( thisNode, {x: options.x, y: options.y} );

    // add images to node
    thisNode.children = star;

    // set new score and update view according to score value
    thisNode.setScore = function( score ) {
      star.forEach( function( view, i ) {
        view.setVisible( i === score );
      } );
    };
  }

  return inherit( Node, StarNode );
} );
