// Copyright 2014-2017, University of Colorado Boulder

/**
 * MixedNumbersNavigationBarIcon - for navbar and homepage icons
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Constants = require( 'FRACTION_MATCHER/model/Constants' );
  var fractionMatcher = require( 'FRACTION_MATCHER/fractionMatcher' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ShapeNode = require( 'FRACTION_MATCHER/shapes/ShapeNode' );

  /**
   * @constructor
   */
  function MixedNumbersNavigationBarIcon() {
    Rectangle.call( this, 0, 0, 548, 373, { fill: 'black' } );

    var shapeNode = ShapeNode.create( {
      x: 0,
      y: 0,
      type: 'FLOWER',
      numerator: 9,
      denominator: 6,
      value: 1.5,
      fill: new Constants().COLORS.LIGHT_RED,
      width: 180,
      height: 180
    } );
    this.addChild( shapeNode.mutate( { scale: 2.9, center: this.center } ) );
  }

  fractionMatcher.register( 'MixedNumbersNavigationBarIcon', MixedNumbersNavigationBarIcon );

  return inherit( Rectangle, MixedNumbersNavigationBarIcon );
} );