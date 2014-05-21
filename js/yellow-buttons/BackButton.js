// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for a back button.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var YellowButton = require( 'FRACTION_MATCHER/yellow-buttons/YellowButton' );
  var Image = require( 'SCENERY/nodes/Image' );

  var backImage = require( 'image!FRACTION_MATCHER/images/back-button.png' );

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
