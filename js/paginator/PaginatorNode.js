// Copyright 2002-2014, University of Colorado Boulder

/**
 * paginator for the 'Fractionss' screen.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  "use strict";

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Page1Node = require( 'FRACTION_MATCHER/paginator/Page1Node' );

  function PaginatorNode( options, pages, levelProperty, scoreArray, pageProperty, pageOptions ) {
    Node.call( this, options );

    // add pages
    for ( var i = 0; i < pages.length; i++ ) {
      this.addChild( new Page1Node( pages[i], i, levelProperty, pageProperty, scoreArray, pageOptions ) );
    }
  }

  return inherit( Node, PaginatorNode );
} );