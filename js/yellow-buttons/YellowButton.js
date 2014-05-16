// Copyright 2002-2013, University of Colorado Boulder

/**
 * Abstract class for back, reset and refresh buttons in 'Build a Fraction' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    PushButtonDeprecated = require( 'SUN/PushButtonDeprecated' );

  function YellowButton( options ) {
    var width = 70,
      height = 35,
      round = 4,
      shadowOffset = {x: 3, y: 4},
    // main view
      base = new Node( {children: [new Rectangle( 0, 0, width, height, round, round, {fill: '#FEF452', stroke: 'black', lineWidth: 1} )]} ),
    // shadow view
      shadowBt = new Rectangle( shadowOffset.x, shadowOffset.y, width, height, round, round, {fill: '#CCC'} );

    Node.call( this, options );

    options.label.setTranslation( (width - options.labelWidth) / 2, (height - options.labelHeight) / 2 );
    base.addChild( options.label );

    // create push button
    this.addChild( new PushButtonDeprecated(
      new Node( {children: [shadowBt, base]} ),
      new Node( {children: [shadowBt, base]} ),
      new Node( {children: [base], x: shadowOffset.x, y: shadowOffset.y} ),
      new Node( {children: [base]} ),
      {listener: options.callback} )
    );

    this.scale( 0.75 );
  }

  return inherit( Node, YellowButton );
} );
