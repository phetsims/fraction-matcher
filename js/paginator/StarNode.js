// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for a single star. Have 5 different states depends on score.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );

  function StarNode( options ) {
    var star = [ // view for different score
      new Image( require( 'image!FRACTION_MATCHER/images/star-0.png' ) ),
      new Image( require( 'image!FRACTION_MATCHER/images/star-1.png' ) ),
      new Image( require( 'image!FRACTION_MATCHER/images/star-2.png' ) ),
      new Image( require( 'image!FRACTION_MATCHER/images/star-3.png' ) ),
      new Image( require( 'image!FRACTION_MATCHER/images/star-4.png' ) )
    ];

    Node.call( this, {x: options.x, y: options.y} );

    // add images to node
    this.children = star;

    // set new score and update view according to score value
    this.setScore = function( score ) {
      star.forEach( function( view, i ) {
        view.setVisible( i === score );
      } );
    };
  }

  return inherit( Node, StarNode );
} );
