// Copyright 2002-2014, University of Colorado Boulder

/**
 * Pie shape graph for the 'Fractions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  "use strict";

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var AbstractShape = require( 'FRACTION_COMMON/shapes/AbstractShape' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Shape = require( 'KITE/Shape' );

  function PieShape( options ) {
    var radius,
      numerator,
      denominator,
      segmentLength,
      nodesContainer = [],
      nodes = [];

    AbstractShape.call( this, options );
    options = this.options;
    numerator = options.numerator;
    denominator = options.denominator;

    radius = Math.min( options.width / 2, options.height / 2 );
    this._nodes = nodes;
    this._radius = radius;

    // init arrays for shapes
    for ( var i = 0, j; i < Math.ceil( numerator / denominator ); i++ ) {
      nodes[i] = new Node();
      nodesContainer[i] = [];
    }

    // create pieces and add them to created array
    segmentLength = Math.PI * 2 / denominator;
    for ( i = 0; i < nodes.length; i++ ) {
      for ( j = 0; j < denominator; j++ ) {
        nodesContainer[i].push( new Path( this.getPiece( segmentLength * j, segmentLength * (j + 1) ), {
          fill: 'white', stroke: options.stroke, lineWidth: 1
        } ) );
      }
    }

    this.arrayToShapes( nodesContainer, radius / 5 );
  }

  return inherit( AbstractShape, PieShape, {
    getPiece: function( s, e ) {
      var shape = new Shape(),
        radius = this._radius;
      if ( Math.abs( (s / 2) % Math.PI - (e / 2) % Math.PI ) > 0.001 ) {
        shape.moveTo( 0, 0 );
        shape.lineTo( Math.cos( s ) * radius, Math.sin( s ) * radius );
        shape.arc( 0, 0, radius, s, e, false );
        shape.close();
      }
      else {
        shape.circle( 0, 0, radius );
      }
      return shape;
    }
  } );
} );
