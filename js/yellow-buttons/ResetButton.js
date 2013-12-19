// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for a reset button.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    resetString = require( 'string!FRACTION_COMMON/reset' ),
    YellowButton = require( 'FRACTION_COMMON/yellow-buttons/YellowButton' ),
    FONT = new PhetFont( 21 );

  function ResetButton( options, callback ) {
    var text = new Text( resetString, {font: FONT} );
    Node.call( this, options );

    this.addChild( new YellowButton( {
      labelWidth: text.getWidth(),
      labelHeight: -3 * text.getHeight() / 5,
      label: text,
      callback: callback
    } ) );
  }

  return inherit( Node, ResetButton );
} );
