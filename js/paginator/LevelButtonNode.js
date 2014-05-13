// Copyright 2002-2013, University of Colorado Boulder

/**
 * Button for one level for the 'Build a Fraction'.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    PushButton = require( 'SUN/PushButton' ),
    StarBoxNode = require( 'FRACTION_COMMON/paginator/StarBoxNode' ),
    FONT = new PhetFont( { size: 14, weight: 'bold'} );

  function LevelButtonNode( options, highScoreProperty ) {
    var shadowBt,
      starBox,
      baseBt = new Node(),
      shadowOffset = {x: 3, y: 4};

    options = _.extend( {
        x: 0,
        y: 0,
        width: 130,
        height: 200,
        fill: "#F2F2F2",
        stroke: "#404040",
        lineWidth: 1,
        value: "",
        label: "",
        starCount: 3,
        shape: new Node(),
        round: 10,
        score: 0,
        padding: 10,
        callback: function() {}
      },
      options
    );

    Node.call( this, {x: options.x, y: options.y} );
    this.score = 0;

    var levelLabel = new Text( options.label, { font: FONT, centerX: 0, centerY: -(options.height / 2) + 12 } );
    options.width = Math.max (options.width, levelLabel.width+options.padding);

    // create base template
    baseBt.addChild( new Rectangle( -(options.width / 2), -(options.height / 2), options.width, options.height, options.round, options.round, {fill: options.fill, stroke: options.stroke, lineWidth: options.lineWidth} ) );
    baseBt.addChild( levelLabel );
    baseBt.addChild( new Node( {children: [options.shape], x: 0, y: 0} ) );
    baseBt.addChild( starBox = new StarBoxNode( {x: 0, width: options.width, starCount: options.starCount} ) );
    starBox.setY( (options.height - starBox.getHeight()) / 2 );

    // create shadow
    shadowBt = new Rectangle( -(options.width / 2) + shadowOffset.x, -(options.height / 2) + shadowOffset.y, options.width, options.height, options.round, options.round, {fill: options.stroke, stroke: options.stroke, lineWidth: options.lineWidth} );

    // create push button
    this.addChild( new PushButton(
      new Node( {children: [shadowBt, baseBt]} ),
      new Node( {children: [shadowBt, baseBt]} ),
      new Node( {children: [baseBt], x: shadowOffset.x, y: shadowOffset.y} ),
      new Node( {children: [baseBt]} ),
      {listener: options.callback} )
    );

    highScoreProperty.link( function( newHighScore ) {
      starBox.setScore( newHighScore );
    } );
  }

  return inherit( Node, LevelButtonNode );
} );
