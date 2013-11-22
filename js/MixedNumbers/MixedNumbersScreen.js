// Copyright 2002-2013, University of Colorado Boulder

/**
 * The 'Fraction Matcher' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var MixedNumbersModel = require( 'FRACTION_MATCHER/MixedNumbers/model/MixedNumbersModel' ),
    MixedNumbersView = require( 'FRACTION_MATCHER/MixedNumbers/view/MixedNumbersView' ),
    Image = require( 'SCENERY/nodes/Image' ),
    mixedNumbersTitleString = require( 'string!FRACTION_MATCHER/mixedNumbersTitle' ),
    ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' ),
    Screen = require( 'JOIST/Screen' ),
    inherit = require( 'PHET_CORE/inherit' );

  function MixedNumbersScreen() {

    var mvt = ModelViewTransform2.createIdentity();

    Screen.call( this,
      mixedNumbersTitleString,
      new Image( require( 'image!FRACTION_MATCHER/../images/MixedNumbers-icon.jpg' ) ),
      function() { return new MixedNumbersModel(); },
      function( model ) { return new MixedNumbersView( model, mvt ); }
    );
  }

  return inherit( Screen, MixedNumbersScreen );
} );