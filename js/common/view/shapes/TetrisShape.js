// Copyright 2002-2013, University of Colorado Boulder

/**
 * Tetris shape graph for the 'Fraction Matcher' screen.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  "use strict";

  // imports
  var inherit = require( "PHET_CORE/inherit" );
  var AbstractShape = require( 'common/view/shapes/AbstractShape' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  function TetrisShape( options ) {
    AbstractShape.call( this, options );
    options = this.options;

    this.addChild( new Path( getPart(), {fill: options.fill, stroke: options.stroke, lineWidth: 0} ) );

    //var side = Math.min( options.width, options.height );
    //this.addChild( new Path( Shape.rect( -side / 2, -side / 2, side, side ), {fill: options.freeFill, stroke: options.stroke, lineWidth: 4} ) );
  }

  var getPart = function() {
    var shape = new Shape(), size = 25;
    shape
      .rect( 0, 0, size, size )
      .rect( 0, -size, size, size )
      .rect( -size, -size, size, size )
      .rect( 0, size, size, size );
    return shape;
  };

  return inherit( AbstractShape, TetrisShape );
} );
