// Copyright 2002-2013, University of Colorado Boulder

/**
 * Numeric shape for the 'Fraction Matcher' screen.
 *
 * @author Anton Ulyanov, Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    AbstractShape = require( 'common/view/shapes/AbstractShape' ),
    Path = require( 'SCENERY/nodes/Path' ),
    Shape = require( 'KITE/Shape' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    FONTSMALL = new PhetFont( 44 ),
    FONTBIG = new PhetFont( 90 );

  function NumericSimplifiedShape( options ) {
    var side,
      fractionNode,
      spaceX,
      offsetX,
      numerator,
      denominator,
      integralPart;

    AbstractShape.call( this, options );
    options = this.options;
    numerator = options.numerator;
    denominator = options.denominator;
    integralPart = Math.floor( numerator / denominator );
    side = Math.min( options.width, options.height ); // define size of fraction

    if ( integralPart && options.toSimplify ) {
      // add simplified fraction node
      fractionNode = this.getFractionNode( numerator % denominator, denominator, options.scaleFactor, side );
      this.addChild( fractionNode );

      // correct it's position
      spaceX = Math.min( fractionNode.shapeWidth / 2, 26 ); // space between fraction node and integral node
      offsetX = -Math.max( 0, fractionNode.shapeWidth / 2 - 26 ); // offset left
      fractionNode.setX( offsetX + spaceX );

      // add integral part
      this.addChild( new Text( integralPart, {font: FONTBIG, centerY: 0, centerX: offsetX - spaceX } ) );
    }
    else {
      // add fraction node
      this.addChild( this.getFractionNode( numerator, denominator, options.scaleFactor, side ) );
    }
  }

  return inherit( AbstractShape, NumericSimplifiedShape, {
    getFractionNode: function( numerator, denominator, scaleFactor, side ) {
      var fractionNode = new Node(),
        shape = new Shape(),
        numeratorLabel,
        denominatorLabel;

      fractionNode.addChild( new Path( Shape.rect( -side / 2, -side / 2, side, side ) ) );
      fractionNode.addChild( numeratorLabel = new Text( numerator * scaleFactor, { font: FONTSMALL, centerX: 0, centerY: -side / 4  } ) );
      fractionNode.addChild( denominatorLabel = new Text( denominator * scaleFactor, { font: FONTSMALL, centerX: 0, centerY: +side / 4  } ) );
      shape.moveTo( Math.min( numeratorLabel.left, denominatorLabel.left ) - 10, 0 );
      shape.lineTo( Math.max( numeratorLabel.right, denominatorLabel.right ) + 10, 0 );
      fractionNode.addChild( new Path( shape, {stroke: 'black', lineWidth: 3} ) );

      fractionNode.shapeWidth = shape.bounds.width;
      return fractionNode;
    }
  } );
} );
