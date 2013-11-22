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

  function CircleShape( options ) {
    var self = this,
      radius = Math.min( options.width / 2, options.height / 2 );

    AbstractShape.call( this, options );
    options = this.options;

    self.addChild( new Path( Shape.circle( 0, 0, radius ), {fill: options.freeFill, stroke: options.stroke, lineWidth: 4} ) );

    if ( options.numerator / options.denominator === 1 && options.denominator === 1 ) {
      self.addChild( new Path( Shape.circle( 0, 0, radius ), {fill: options.fill, stroke: options.stroke, lineWidth: 1} ) );
    }
    else {
      var s, e, f, shape;
      for ( var i = 0; i < options.denominator; i++ ) {
        s = ((Math.PI * 2) / options.denominator) * i;
        e = ((Math.PI * 2) / options.denominator) * (i + 1);
        f = (i < options.numerator) ? options.fill : options.freeFill;
        shape = new Shape();
        shape.moveTo( 0, 0 );
        shape.lineTo( Math.cos( s ) * radius, Math.sin( s ) * radius );
        shape.arc( 0, 0, radius, s, e, false );
        shape.close();
        self.addChild( new Path( shape, {fill: f, stroke: options.stroke, lineWidth: 1} ) );
      }
    }
  }

  return inherit( AbstractShape, CircleShape );
} );
