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
  var AbstractShape = require( "common/view/shapes/AbstractShape" );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  function VRectangleShape( options ) {
    var thisNode = this,
      side = Math.min( options.width, options.height );

    AbstractShape.call( this, options );
    options = this.options;

    thisNode.addChild( new Path( Shape.rect( -side / 2, -side / 2, side, side ), {fill: options.freeFill, stroke: options.stroke, lineWidth: 4} ) );

    if ( options.numerator / options.denominator === 1 && options.denominator === 1 ) {
      thisNode.addChild( new Path( Shape.rect( -side / 2, -side / 2, side, side ), {fill: options.fill, stroke: options.stroke, lineWidth: 1} ) );
    }
    else {
      var s, h = side / options.denominator, f;

      for ( var i = 0; i < options.denominator; i++ ) {
        s = side / 2 - h * (i + 1);
        f = (i < options.numerator) ? options.fill : options.freeFill;
        thisNode.addChild( new Path( Shape.rect( -side / 2, s, side, h ), {fill: f, stroke: options.stroke, lineWidth: 1} ) );
      }
    }
  }

  return inherit( AbstractShape, VRectangleShape );
} );
