// Copyright 2002-2013, University of Colorado Boulder

/**
 * Plus sign view for 'Fraction Matcher' simulation.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  "use strict";

  // imports
  var inherit = require( "PHET_CORE/inherit" );
  var Node = require( "SCENERY/nodes/Node" );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  function PlusSignsShape( options ) {
    options = _.extend( {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        numerator: 1,  // numerator / denominator
        denominator: 1, // numerator <= denominator
        fill: "#F00",
        freeFill: "#FFF",
        stroke: "#000"
      },
      options );
    var thisNode = this;
    Node.call( thisNode, {x: options.x, y: options.y} );
  }

  return inherit( Node, PlusSignsShape );
} );
