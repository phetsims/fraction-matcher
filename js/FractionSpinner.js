// Copyright 2002-2013, University of Colorado Boulder

/**
 * Plus/Minus button group for fractions
 *
 * @author Vasily Shakhov (Mlearner)
 */

define( function( require ) {
  "use strict";

  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( "SCENERY/nodes/Node" ),
    PushButton = require( 'SUN/PushButton' ),
    Image = require( 'SCENERY/nodes/Image' ),
    HBox = require( 'SCENERY/nodes/HBox' );


  var images = {
    yellow: {
      plus: require( 'image!../../../images/right_yellow_up.png' ),
      plusPressed: require( 'image!../../../images/right_yellow_pressed.png' ),
      plusDisabled: require( 'image!../../../images/right_gray.png' ),
      minus: require( 'image!../../../images/left_yellow_up.png' ),
      minusPressed: require( 'image!../../../images/left_yellow_pressed.png' ),
      minusDisabled: require( 'image!../../../images/left_gray.png' )
    },
    green: {
      plus: require( 'image!../../../images/right_green_up.png' ),
      plusPressed: require( 'image!../../../images/right_green_pressed.png' ),
      plusDisabled: require( 'image!../../../images/right_gray.png' ),
      minus: require( 'image!../../../images/left_green_up.png' ),
      minusPressed: require( 'image!../../../images/left_green_pressed.png' ),
      minusDisabled: require( 'image!../../../images/left_gray.png' )
    }
  };

  function FractionSpinner( property, min, max, options ) {
    var self = this;
    // minimum and maximum value of property
    this.max = max;
    this.min = min;
    this.property = property;
    options = _.extend( {
      x: 0,
      y: 0,
      color: "yellow", //color of the button
      spacing: 5 //space between buttons
    }, options );

    this.plusButton = new PushButton(
      new Image( images[options.color].plus ),
      new Image( images[options.color].plus ),
      new Image( images[options.color].plusPressed ),
      new Image( images[options.color].plusDisabled ),
      {listener: function() {property.set( property.get() + 1 );}}
    );

    this.minusButton = new PushButton(
      new Image( images[options.color].minus ),
      new Image( images[options.color].minus ),
      new Image( images[options.color].minusPressed ),
      new Image( images[options.color].minusDisabled ),
      {listener: function() {property.set( property.get() - 1 );}}
    );


    options.children = [self.minusButton, self.plusButton];

    property.link( function() {
      self.update();
    } );

    HBox.call( this, options );


  }

  return inherit( HBox, FractionSpinner, {
    setMax: function( newMax ) {
      this.max = newMax;
      this.update();
    },
    setMin: function( newMin ) {
      this.min = newMin;
      this.update();
    },
    update: function() {
      this.plusButton.enabled = this.property.get() < this.max;
      this.minusButton.enabled = this.property.get() > this.min;
    }
  } );
} )
;
