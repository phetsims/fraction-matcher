// Copyright 2002-2013, University of Colorado Boulder

/**
 * Circle shape graph for the 'Build a Fraction' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    AbstractShape = require( 'FRACTION_COMMON/shapes/AbstractShape' ),
    Path = require( 'SCENERY/nodes/Path' ),
    Line = require( 'SCENERY/nodes/Line' ),
    Shape = require( 'KITE/Shape' );

  function CircleShape( options ) {
    var radius,
      numerator,
      denominator,
      segmentLength,
      temp = [],
      nodes = [];

    AbstractShape.call( this, options );
    options = this.options;
    numerator = Math.max( 1, options.numerator ); //if numerator 0, we still want shape, but not filled
    denominator = options.denominator;

    radius = Math.min( options.width / 2, options.height / 2 );
    this.radius = radius;

    // init arrays for shapes
    for ( var i = 0, j, len; i < Math.ceil( numerator / denominator ); i++ ) {
      nodes[i] = new Node();
      temp[i] = [];
    }

    // create pieces and add them to created array
    len = (options.onlyPiece ? numerator : denominator);
    segmentLength = Math.PI * 2 / denominator;
    for ( i = 0; i < nodes.length; i++ ) {
      for ( j = 0; j < len; j++ ) {
        temp[i].push( new Path( this.getPiece( radius, segmentLength * j, segmentLength * (j + 1) ), {
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

    // add dashed divisions
    if ( options.divisions ) {
      this.addDivisions( options.divisions );
    }
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
    },
    // create node and add divisions
    addDivisions: function( number ) {
      this.dashedDivisionNode = new Node();
      this.drawDivisions( number );
      this.addChild( this.dashedDivisionNode );
    },
    // update division's position
    updateDivisions: function( number ) {
      this.dashedDivisionNode.removeAllChildren();
      this.drawDivisions( number );
    },
    // add divisions to node
    drawDivisions: function( number ) {
      var angle = 2 * Math.PI / number,
        radius = this.radius,
        options = {stroke: 'rgb(125,125,125)', lineDash: [ 6, 3 ], lineWidth: 1};
      if ( number > 1 ) {
        for ( var i = 0; i < number; i++ ) {
          this.dashedDivisionNode.addChild( new Line( 0, 0, Math.cos( angle * i ) * radius, Math.sin( angle * i ) * radius, options ) );
        }
      }
    }
  } );
} );
