// Copyright 2002-2013, University of Colorado Boulder

/**
 * One page of paginator for the 'Build a Fraction'.
 * Contains buttons for choosing different levels.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    HBox = require( 'SCENERY/nodes/HBox' ),
    VBox = require( 'SCENERY/nodes/VBox' ),
    LevelButtonNode = require( 'FRACTION_COMMON/pagination/LevelButtonNode' ),
    ShapeNode = require( 'FRACTION_COMMON/shapes/ShapeNode' );

  function Page1Node( pages, number, targetProperty, pageProperty, scoreArray ) {
    var self = this, hBoxTop = new HBox( {spacing: 20} ),
      hBoxBottom = new HBox( {spacing: 20} ),
      vBox = new VBox( {x: -25, spacing: 20, children: [hBoxTop, hBoxBottom]} );

    Node.call( this );
    this.addChild( vBox );

    // add level buttons
    for ( var i = 0; i < pages.length; i++ ) {
      (i >= pages.length / 2 ? hBoxBottom : hBoxTop).addChild( new LevelButtonNode( {
        width: pages[i].width || 90,
        height: pages[i].height || 150,
        starCount: number > 0 ? 4 : 3,
        label: pages[i].label,
        shape: new ShapeNode( _.assign( {
          numerator: 1,
          denominator: 1,
          x: 0,
          y: -5,
          width: 50,
          height: 50
        }, pages[i].shape ) ),
        callback: getCallback( targetProperty, pages[i].value )
      }, scoreArray, number * (pages.length - 1) + i ) );
      (i >= pages.length / 2 ? hBoxBottom : hBoxTop).updateLayout();
      vBox.updateLayout();
    }

    if ( pageProperty ) {
      pageProperty.link( function( page ) {
        self.setVisible( (page === number) );
      } );
    }
  }

  var getCallback = function( targetProperty, value ) {
    return function() {targetProperty.set( value );};
  };

  return inherit( Node, Page1Node );
} );