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
    numerator = Math.max( 1, options.numerator ); // if numerator 0, we still want shape, but not filled
    denominator = options.denominator;

    radius = Math.min( options.width / 2, options.height / 2 );
    this._nodes = nodes;
    this._radius = radius;

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
        temp[i].push( new Path( this.getPiece( segmentLength * j, segmentLength * (j + 1) ), {
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

    // add dashed divisions
    if ( options.divisions ) {
      this.addDivisions( nodes, options.divisions );
    }

    // add shapes to node
    this.addNodes( nodes, radius / 2, (options.onlyPiece && denominator > 1) );
  }

  return inherit( AbstractShape, CircleShape, {
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
    },
    drawDivisions: function( node, number ) {
      var angle = 2 * Math.PI / number,
        options = {stroke: 'rgb(125,125,125)', lineDash: [ 4, 2 ], lineWidth: 1};

      if ( number > 1 ) {
        for ( var i = 0; i < number; i++ ) {
          node._divisions.addChild( new Line( 0, 0, Math.cos( angle * i ) * this._radius, Math.sin( angle * i ) * this._radius, options ) );
        }
      }
    },
    // update division's position
    updateDivisions: function( number ) {
      var self = this;

      this._nodes.forEach( function( node ) {
        node._divisions.removeAllChildren();
        self.drawDivisions( node, number );
      } );
    },
    // add divisions to node
    addDivisions: function( nodes, number ) {
      var self = this;

      nodes.forEach( function( node ) {
        node.addChild( node._divisions = new Node() );
        self.drawDivisions( node, number );
      } );
    }
  } );
} );
