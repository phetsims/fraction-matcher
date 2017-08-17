// Copyright 2017, University of Colorado Boulder

/**
 *
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var fractionMatcher = require( 'FRACTION_MATCHER/fractionMatcher' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );

  /**
   * @constructor
   */
  function AllShapesNode() {
    Node.call( this, {
      children: []
    } );
  }

  fractionMatcher.register( 'AllShapesNode', AllShapesNode );

  return inherit( Node, AllShapesNode );
} );