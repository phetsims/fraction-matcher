// Copyright 2002-2013, University of Colorado Boulder

/**
 * Shape for the 'Fraction Matcher' screen.
 *
 * @author Anton Ulyanov, Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  "use strict";

  // imports
  var inherit = require( "PHET_CORE/inherit" ),
    Node = require( "SCENERY/nodes/Node" );

  var map = {
    PIES: require( 'FRACTION_MATCHER/common/view/shapes/CircleShape' ),
    VERTICAL_BARS: require( 'FRACTION_MATCHER/common/view/shapes/VRectangleShape' ),
    HORIZONTAL_BARS: require( 'FRACTION_MATCHER/common/view/shapes/HRectangleShape' ),
    /*PLUSES: require( 'FRACTION_MATCHER/common/view/shapes/PlusSignsShape' ),*/
    LETTER_L_SHAPES: require( 'FRACTION_MATCHER/common/view/shapes/LetterLShape' ),
    NUMBER: require( 'FRACTION_MATCHER/common/view/shapes/NumericShape' )
  };

  function ShapeNode( options ) {
    var thisNode = this;
    options = _.extend( {
        type: 'PIES',
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        numerator: 1,
        denominator: 1,
        undivided: 0,
        fill: "#F00"
      },
      options );
    Node.call( thisNode, {x: options.x, y: options.y} );
    options.x = 0;
    options.y = 0;

    if ( map[options.type] ) {
      thisNode.addChild( new map[options.type]( options ) );
    }
    else {
      thisNode.addChild( new map.PIES( options ) );
    }
  }

  return inherit( Node, ShapeNode );
} );
