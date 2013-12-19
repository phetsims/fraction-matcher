// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for a back button.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    YellowButton = require( 'FRACTION_COMMON/yellow-buttons/YellowButton' ),
    backImage = require( 'image!FRACTION_COMMON/images/back-button.png' ),
    Image = require( 'SCENERY/nodes/Image' );

  function BackButton( options, callback ) {
    Node.call( this, options );

    this.addChild( new YellowButton( {
      labelWidth: backImage.width,
      labelHeight: backImage.height,
      label: new Image( backImage ),
      callback: callback
    } ) );
  }

  return inherit( Node, BackButton );
} );
