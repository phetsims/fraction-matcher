// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for a refresh button.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    YellowButton = require( 'FRACTION_COMMON/yellow-buttons/YellowButton' ),
    refreshImage = require( 'image!FRACTION_COMMON/images/view-refresh.png' ),
    Image = require( 'SCENERY/nodes/Image' );

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
