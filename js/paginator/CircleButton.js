// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for "back", "next", "plus" and "minus" button in 'Build a Fraction' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var PushButtonDeprecated = require( 'SUN/PushButtonDeprecated' );

  var colors = {
    back: {from: '#ff1', to: '#ff0'},
    next: {from: '#ff1', to: '#ff0'}
  };

  function CircleButton( options ) {
    var radius = options.radius || 16,
      lineWidth = radius / 5,
      colorFrom = colors[options.type].from,
      colorTo = colors[options.type].to,
      circleDefault = new Circle( radius, { // default circle sample for buttons "next" and "back"
        fill: new RadialGradient( -radius * 0.2, -radius * 0.3, 1, -radius * 0.2, -radius * 0.3, radius * 1.75 )
          .addColorStop( 0, colorFrom )
          .addColorStop( 0.5, colorTo )
          .addColorStop( 1, '#000' )
      } ),
      circlePressed = new Circle( radius + 1, { // pressed circle sample for buttons "next" and "back"
        fill: new RadialGradient( 0, 0, 1, 0, 0, radius * 1.8 )
          .addColorStop( 0, colorFrom )
          .addColorStop( 0.5, colorTo )
          .addColorStop( 1, '#000' )
      } ) ,
      circleDisabled = new Circle( radius, { // disabled circle sample for buttons "next" and "back"
        fill: new RadialGradient( -radius * 0.2, -radius * 0.3, 1, -radius * 0.2, -radius * 0.3, radius * 1.75 )
          .addColorStop( 0, '#dfdfdf' )
          .addColorStop( 0.5, '#d3d3d3' )
          .addColorStop( 1, '#000' )
      } ),
    // arrow shape for button
      shape = this.shape( options.type, radius );
    Node.call( this );

    return new PushButtonDeprecated(
      new Node( {children: [ // default state
        circleDefault, new Path( shape, {stroke: 'black', lineCap: 'round', lineWidth: lineWidth} )]} ),
      new Node( {children: [ // hover state
        circleDefault, new Path( shape, {stroke: 'black', lineCap: 'round', lineWidth: lineWidth} )]} ),
      new Node( {children: [ // press state
        circlePressed, new Path( shape, {stroke: 'black', lineCap: 'round', lineWidth: lineWidth} )]} ),
      new Node( {children: [ // disable state
        circleDisabled, new Path( shape, {stroke: 'gray', lineCap: 'round', lineWidth: lineWidth} )]} ),
      {listener: options.callback} );
  }

  return inherit( Node, CircleButton, {
    shape: function( type, radius ) {
      var shape = new Shape();
      if ( type === 'back' ) {
        // arrow shape for back button
        shape.moveTo( radius / 4, -radius / 2 ).lineTo( -radius / 3, 0 ).lineTo( radius / 4, radius / 2 );
      }
      else if ( type === 'next' ) {
        // arrow shape for next button
        shape.moveTo( -radius / 4, -radius / 2 ).lineTo( radius / 3, 0 ).lineTo( -radius / 4, radius / 2 );
      }
      return shape;
    }
  } );
} );
