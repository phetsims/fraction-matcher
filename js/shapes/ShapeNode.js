// Copyright 2002-2014, University of Colorado Boulder

/**
 * Shape for the 'Fractions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  "use strict";

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumericShape = require( 'FRACTION_COMMON/shapes/NumericShape' );
  var Pattern = require( 'FRACTION_COMMON/shapes/Pattern' );
  var AbstractShape = require( 'FRACTION_COMMON/shapes/AbstractShape' );

  function ShapeNode( options ) {
    //default parameters
    options = _.extend( {
        type: 'PIES',
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        numerator: 1,
        denominator: 1,
        toSimplify: false,
        fill: '#F00',
        outlineWidth: 2,
        stroke: "#000"
      },
      options );

    Node.call( this );

    this.addChild( this.createShapeFromPattern( options.type, options ) );
  }

  return inherit( Node, ShapeNode, {
    createShapeFromPattern: function( shapeType, options ) {
      if ( shapeType === 'NUMBER' ) {
        return new NumericShape( options );
      }
      else {
        options.createdPaths = Pattern.createShapes( options );
        return new AbstractShape( options );
      }
    }
  } );
} );
