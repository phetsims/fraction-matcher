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
  var Shape = require( 'KITE/Shape' );

  function HRectangleShape( options ) {
    var self = this,
      side = Math.min( options.width, options.height );

    AbstractShape.call( this, options );
    options = this.options;

    self.addChild( new Path( Shape.rect( -side / 2, -side / 2, side, side ), {fill: options.freeFill, stroke: options.stroke, lineWidth: 4} ) );

    if ( options.numerator / options.denominator === 1 && options.denominator === 1 ) {
      self.addChild( new Path( Shape.rect( -side / 2, -side / 2, side, side ), {fill: options.fill, stroke: options.stroke, lineWidth: 1} ) );
    }
    else {
      var s, w = side / options.denominator, f;

      for ( var i = 0; i < options.denominator; i++ ) {
        s = -side / 2 + w * (i);
        f = (i < options.numerator) ? options.fill : options.freeFill;
        self.addChild( new Path( Shape.rect( s, -side / 2, w, side ), {fill: f, stroke: options.stroke, lineWidth: 1} ) );
      }
    }
  }

  return inherit( AbstractShape, HRectangleShape );
} );
