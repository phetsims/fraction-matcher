//  Copyright 2002-2014, University of Colorado Boulder

/**
 * MixedNumbersHomeScreenIcon - for navbar and homepage icons
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ShapeNode = require( 'FRACTION_MATCHER/shapes/ShapeNode' );
  var Constants = require( 'FRACTION_MATCHER/model/Constants' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  /**
   * @constructor
   */
  function MixedNumbersHomeScreenIcon() {
    Rectangle.call( this, 0, 0, 548, 373, {fill: '#e7e9cc'} );

    var shapeNode = new ShapeNode( {
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

    var shapeNode2 = new ShapeNode( {
      x: 0,
      y: 0,
      type: 'INTERLEAVED_L_SHAPES',
      numerator: 3,
      denominator: 2,
      value: 1.5,
      fill: new Constants().COLORS.GREEN,
      width: 180,
      height: 180
    } );

    this.addChild( new HBox( {
      spacing: 20,
      children: [
        shapeNode,
        new Text( '=', {fill: 'black', font: new PhetFont( 160 )} ),
        shapeNode2
      ],
      center: this.center
    } ) );
  }

  return inherit( Rectangle, MixedNumbersHomeScreenIcon );
} );