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
      offsetX,
      maxWidth = 0,
      linksToPages = [];
    Node.call( this, options );

    // add pages
    for ( var i = 0; i < pages.length; i++ ) {
      this.addChild( linksToPages[i] = new Page1Node( pages[i], i, levelProperty, pageProperty, scoreArray ) );
    }

    // add navigation bar
    if ( pages.length > 1 ) {
      this.addChild( navBar = new NavigationBar( pages, {y: this.getHeight() + 30}, pageProperty ) );

      // set offset for pages
      for ( i = 0; i < pages.length; i++ ) {
        offsetX = (self.getWidth() - linksToPages[i].getWidth()) / 2;
        linksToPages[i].setX( offsetX );
        maxWidth = Math.max( maxWidth, linksToPages[i].getWidth() );
      }

      // set offset for navigation bar
      navBar.setX( offsetX + (maxWidth - navBar.getWidth()) / 2 );
    }
  }

  return inherit( Node, PaginationNode );
} );
