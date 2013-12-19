// Copyright 2002-2013, University of Colorado Boulder

/**
 * Card shape for the 'Build a Fraction' sim.
 * Expected denominator equal to 1.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    AbstractShape = require( 'FRACTION_COMMON/shapes/AbstractShape' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    FONT = new PhetFont( {size: 45, weight: 'bold'} );

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
    height = width * 1.3;

    // create top card with number
    cardTop = this.getCardNode( width, height );
    text = new Text( numerator, {font: FONT} );
    text.setTranslation( -text.getWidth() / 2, text.getHeight() / 4 );
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
      return new Node( {children: [new Rectangle( -width / 2, -height / 2, width, height, 5, 5, {fill: '#F2F2F2', stroke: 'black', lineWidth: 1} )]} );
    }
  } );
} );
