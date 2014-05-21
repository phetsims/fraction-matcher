// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for a refresh button.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var YellowButton = require( 'FRACTION_MATCHER/view/YellowButton' );
  var Image = require( 'SCENERY/nodes/Image' );

  //images
  var refreshImage = require( 'image!FRACTION_MATCHER/images/view-refresh.png' );

  function RefreshButton( options, callback ) {
    var image = new Image( refreshImage, {scale: 0.25} );
    Node.call( this, options );

    this.addChild( new YellowButton( {
      labelWidth: image.getWidth(),
      labelHeight: image.getHeight(),
      label: image,
      callback: callback
    } ) );
  }

  return inherit( Node, RefreshButton );
} );
