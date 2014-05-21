// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for navigation bar of paginator.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var CircleButton = require( 'FRACTION_MATCHER/paginator/CircleButton' );

  function NavigationBar( pages, options, pageProperty ) {
    var FONT = new PhetFont( {size: 16, weight: 'bold'} );
    var marks = [],
      hBox = new HBox( {spacing: 15} ), // container for bar
      backButton,
      nextButton;
    Node.call( this, options );

    // add "back" button
    hBox.addChild( backButton = new CircleButton( {type: 'back', callback: function() {
      if ( pageProperty.get() > 0 ) {
        pageProperty.set( pageProperty.get() - 1 );
      }
    }} ) );

    // add pages
    for ( var i = 0, text; i < pages.length; i++ ) {
      text = new Text( Math.round( (pages[i].length * i + 1) / 2 ) + '-' + pages[i].length * (i + 1) / 2, {font: FONT, fill: 'gray'} );

      // save link to text and circle
      marks[i] = {
        text: text,
        circle: new Circle( 4, {visible: false, x: text.getWidth() / 2, y: 10, fill: 'black'} )
      };

      // add numbers of levels to paginator
      hBox.addChild( new Node( {children: [
        text,
        marks[i].circle,
        new Circle( 4, {x: text.getWidth() / 2, y: 10, fill: 'none', stroke: 'gray', lineWidth: 1} )
      ]} ) );
    }

    // add "next" button
    hBox.addChild( nextButton = new CircleButton( {type: 'next', callback: function() {
      if ( pageProperty.get() < (pages.length - 1) ) {
        pageProperty.set( pageProperty.get() + 1 );
      }
    }} ) );

    this.addChild( hBox );
    hBox.updateLayout();

    pageProperty.link( function( newPage, prevPage ) {
      if ( prevPage !== null ) {
        // unselected mark
        marks[prevPage].circle.setVisible( false );
        marks[prevPage].text.fill = 'gray';
      }
      // selected mark
      marks[newPage].circle.setVisible( true );
      marks[newPage].text.fill = 'black';

      backButton.enabled = (newPage !== 0);
      nextButton.enabled = (newPage !== (pages.length - 1));
    } );
  }

  return inherit( Node, NavigationBar );
} );
