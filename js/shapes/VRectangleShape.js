// Copyright 2002-2013, University of Colorado Boulder

/**
 * Rectangle with vertical lines shape graph for the 'Build a Fraction' sim.
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

  function VRectangleShape( options ) {
    var pieces = [],
      denominator,
      numerator;

    AbstractShape.call( this, options );
    options = this.options;
    denominator = options.denominator;
    numerator = Math.max( 1, options.numerator ); //if numerator 0, we still want shape, but not filled

    // init arrays for shapes
    for ( var i = 0, j, len; i < ( Math.ceil( numerator / denominator ) ); i++ ) {
      pieces[i] = [];
    }

    // create pieces and add them to created array
    len = (options.onlyPiece ? numerator : denominator);
    for ( i = 0; i < pieces.length; i++ ) {
      for ( j = 0; j < len; j++ ) {
        pieces[i].push( new Path( this.getPiece( options.width / denominator, options.height ), {
          x: j / denominator * options.width, fill: 'white', stroke: options.stroke, lineWidth: 1
        } ) );
      }
    }

    // add shapes to node
    this.arrayToShapes( pieces, options.width / 4 );
    this.setTranslation( -this.width / 2, -this.height / (2 * pieces.length) );

    // add dashed divisions
    if ( options.divisions ) {
      this.addDivisions( options.divisions );
    }
  }

  return inherit( AbstractShape, VRectangleShape, {
    getPiece: function( width, height ) {
      return new Shape.rect( 0, 0, width, height );
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
      var width = this.options.width,
        height = this.options.height,
        dx = width / number,
        options = {stroke: 'rgb(125,125,125)', lineDash: [ 4, 2 ], lineWidth: 1};

      if ( number > 1 ) {
        for ( var i = 1; i < number; i++ ) {
          this.dashedDivisionNode.addChild( new Line( dx * i, 0, dx * i, height, options ) );
        }
      }
    }
  } );
} );
