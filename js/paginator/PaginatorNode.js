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
  var NavigationBar = require( 'FRACTION_MATCHER/paginator/NavigationBar' );

  function PaginatorNode( options, pages, levelProperty, scoreArray, pageProperty, pageOptions ) {
    var self = this,
      navBar,
      offsetX,
      maxWidth = 0,
      linksToPages = [];
    Node.call( this, options );

    // add pages
    for ( var i = 0; i < pages.length; i++ ) {
      this.addChild( linksToPages[i] = new Page1Node( pages[i], i, levelProperty, pageProperty, scoreArray, pageOptions ) );
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

  return inherit( Node, PaginatorNode );
} );
