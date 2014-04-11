// Copyright 2002-2013, University of Colorado Boulder

/**
 * One page of paginator for the 'Build a Fraction'.
 * Contains buttons for choosing different levels.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    HBox = require( 'SCENERY/nodes/HBox' ),
    VBox = require( 'SCENERY/nodes/VBox' ),
    LevelButtonNode = require( 'FRACTION_COMMON/paginator/LevelButtonNode' ),
    ShapeNode = require( 'FRACTION_COMMON/shapes/ShapeNode' );

  function Page1Node( pages, number, targetProperty, pageProperty, scoreArray, options ) {
    var self = this,
      hBoxTop,
      hBoxBottom,
      vBox,
      levelNumber,
      i;

    Node.call( this );

    options = _.extend( {hSpacing: 45, vSpacing: 30}, options );

    hBoxTop = new HBox( {spacing: options.hSpacing} );
    hBoxBottom = new HBox( {spacing: options.hSpacing} );
    vBox = new VBox( {x: -25, spacing: options.vSpacing, children: [hBoxTop, hBoxBottom]} );

    this.addChild( vBox );

    // add level buttons
    for ( i = 0; i < pages.length; i++ ) {
      levelNumber = i + number * pages.length;
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
      }, scoreArray[levelNumber] ) );
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