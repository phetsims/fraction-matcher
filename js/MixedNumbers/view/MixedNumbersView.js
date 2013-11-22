// Copyright 2002-2013, University of Colorado Boulder

/**
 * Scene graph for the 'Mixed Numbers' screen.
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var Bounds2 = require( 'DOT/Bounds2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );

  function MixedNumbersView( model, mvt ) {
    var thisView = this;
    ScreenView.call( thisView, { renderer: 'svg' } );
  }

  inherit( ScreenView, MixedNumbersView, { layoutBounds: new Bounds2( 0, 0, 1140, 700 ) } );

  return MixedNumbersView;
} );
