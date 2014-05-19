// Copyright 2002-2014, University of Colorado Boulder

/**
 * Card shape for the 'Fractions' sim.
 * Expected denominator equal to 1.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var AbstractShape = require( 'FRACTION_COMMON/shapes/AbstractShape' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  function NumericSimplifiedShape( options ) {
    var width,
      height,
      text,
      cardTop,
      numerator,
      cards = new Node(), // container for all cards
      offset = 3;

    AbstractShape.call( this, options );
    options = this.options;
    numerator = options.numerator;
    width = options.width;
    height = width * 1.43;

    // create top card with number
    cardTop = this.getCardNode( width, height );
    text = new Text( numerator, {centerX: 0, centerY: 0, font: new PhetFont( { size: options.width, weight: 'bold'} )} );
    cardTop.addChild( text );

    if ( options.deck ) {
      // add all cards except top one
      for ( var i = 0; i < numerator - 1; i++ ) {
        cards.addChild( this.getCardNode( width, height ).setTranslation( offset * i, offset * i ) );
      }

      // set translations
      cardTop.setTranslation( offset * (numerator - 1), offset * (numerator - 1) );
      cards.setTranslation( -offset * (numerator - 1) / 2, -offset * (numerator - 1) / 2 );
    }

    // add top card
    cards.addChild( cardTop );
    this.addChild( cards );
  }

  return inherit( AbstractShape, NumericSimplifiedShape, {
    getCardNode: function( width, height ) {
      return new Node( {children: [new Rectangle( -width / 2, -height / 2, width, height, width / 10, width / 10, {fill: 'white', stroke: 'black', lineWidth: 1} )]} );
    }
  } );
} );
