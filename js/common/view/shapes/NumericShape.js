// Copyright 2002-2013, University of Colorado Boulder

/**
 * Circle shape graph for the 'Fraction Matcher' screen.
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  "use strict";

  // imports
  var inherit = require( "PHET_CORE/inherit" );
  var AbstractShape = require( 'common/view/shapes/AbstractShape' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' );

  function NumericShape( options ) {
    var self = this,
      side = Math.min( options.width, options.height ),
      shape = new Shape(),
      numeratorLabel,
      denominatorLabel;

    AbstractShape.call( this, options );
    options = this.options;

    self.addChild( new Path( Shape.rect( -side / 2, -side / 2, side, side ), {/*fill: options.freeFill, stroke: options.stroke, lineWidth: 4*/} ) );
    self.addChild( numeratorLabel = new Text( options.numerator * options.scaleFactor, { font: new PhetFont( { size: 44, weight: "normal"} ), centerX: 0, centerY: -side / 4  } ) );
    self.addChild( denominatorLabel = new Text( options.denominator * options.scaleFactor, { font: new PhetFont( { size: 44, weight: "normal"} ), centerX: 0, centerY: +side / 4  } ) );
    shape.moveTo( Math.min( numeratorLabel.left, denominatorLabel.left ) - 10, 0 );
    shape.lineTo( Math.max( numeratorLabel.right, denominatorLabel.right ) + 10, 0 );
    self.addChild( new Path( shape, {stroke: options.stroke, lineWidth: 3} ) );
  }

  return inherit( AbstractShape, NumericShape );
} );
