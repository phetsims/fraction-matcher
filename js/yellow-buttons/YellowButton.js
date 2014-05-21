// Copyright 2002-2014, University of Colorado Boulder

/**
 * Abstract class for back, reset and refresh buttons in 'Build a Fraction' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );

  function YellowButton( options ) {

    RectangularPushButton.call( this, _.extend( {
      content: options.label,
      minWidth: 70,
      minHeight: 35,
      listener: options.callback,
      baseColor: '#FEF452',
      scale: 0.75
    }, options ) );
  }

  return inherit( RectangularPushButton, YellowButton );
} );
