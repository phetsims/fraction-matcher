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
  var Node = require( "SCENERY/nodes/Node" );
  var AbstractShape = require( 'common/view/shapes/AbstractShape' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  function CircleShape( options ) {
    var radius,
      numerator,
      denominator,
      temp = [],
      nodes = [];

    AbstractShape.call( this, options );
    options = this.options;
    numerator = options.numerator;
    denominator = options.denominator;

    radius = Math.min( options.width / 2, options.height / 2 );

    // init arrays for shapes
    for ( var i = 0, j; i < Math.ceil( numerator / denominator ); i++ ) {
      nodes[i] = new Node();
      temp[i] = [];
    }

    // TODO: add stroke
    // create pieces and add them to created array
    for ( i = 0; i < nodes.length; i++ ) {
      for ( j = 0; j < denominator; j++ ) {
        temp[i].push( new Path( this.getPiece( radius, ((Math.PI * 2) / denominator) * j, ((Math.PI * 2) / denominator) * (j + 1) ), {
          fill: 'white', stroke: options.stroke, lineWidth: 1
        } ) );
      }
    }

    // fill shapes
    this.fillShapes( temp );

    // add nodes
    temp.forEach( function( pieces, i ) {
      pieces.forEach( function( piece ) {
        nodes[i].addChild( piece );
      } );
    } );

    // add shapes to node
    this.addNodes( nodes, radius / 2 );
    this.setX( -(nodes.length - 1) * radius / 2 );
  }

  return inherit( AbstractShape, CircleShape, {
    getPiece: function( radius, s, e ) {
      var shape = new Shape();
      if ( (s / 2) % Math.PI !== (e / 2) % Math.PI ) {
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
