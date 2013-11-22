// Copyright 2002-2013, University of Colorado Boulder

/**
 * Scene graph for the 'Fraction Matcher' screen.
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( "SCENERY/nodes/Node" );

  function PaginationNode( model, page ) {
    var thisNode = this;
    Node.call( thisNode );

    for ( var i = 0; i < page.length; i++ ) {
      thisNode.addChild( page[i] );
    }
  }

  return inherit( Node, PaginationNode );
} );
