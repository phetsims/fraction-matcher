// Copyright 2002-2013, University of Colorado Boulder

/**
 * Pagination for the 'Build a Fraction' screen.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Page1Node = require( 'FRACTION_COMMON/pagination/Page1Node' ),
    NavigationBar = require( 'FRACTION_COMMON/pagination/NavigationBar' );

  function PaginationNode( options, pages, levelProperty, scoreArray, pageProperty ) {
    var self = this,
      navBar,
      linksToPages = [];
    Node.call( this, options );

    // add pages
    for ( var i = 0; i < pages.length; i++ ) {
      this.addChild( linksToPages[i] = new Page1Node( pages[i], i, levelProperty, pageProperty, scoreArray ) );
    }

    // add navigation bar
    if ( pages.length > 1 ) {
      this.addChild( navBar = new NavigationBar( pages, { x: this.getWidth() / 2, y: this.getHeight() + 30}, pageProperty ) );
      navBar.setX( (linksToPages[0].getWidth() - navBar.getWidth()) / 2 );
    }

    // tune position of page
    pageProperty.link( function( page ) {
      var offsetX = (self.getWidth() - linksToPages[page].getWidth()) / 2;
      linksToPages[page].setX( offsetX );
      navBar.setX( offsetX + (linksToPages[page].getWidth() - navBar.getWidth()) / 2 );
    } );
  }

  return inherit( Node, PaginationNode );
} );
