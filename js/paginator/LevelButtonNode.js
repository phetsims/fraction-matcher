// Copyright 2002-2014, University of Colorado Boulder

/**
 * Button for one level for the 'Build a Fraction'.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var PushButtonDeprecated = require( 'SUN/PushButtonDeprecated' );
  var StarBoxNode = require( 'FRACTION_MATCHER/paginator/StarBoxNode' );

  var FONT = new PhetFont( { size: 14, weight: 'bold'} );

  function LevelButtonNode( highScoreProperty, options ) {
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
    options.width = Math.max( options.width, levelLabel.width + options.padding );

    // create base template
    baseBt.addChild( new Rectangle( -(options.width / 2), -(options.height / 2), options.width, options.height, options.round, options.round, {fill: options.fill, stroke: options.stroke, lineWidth: options.lineWidth} ) );
    baseBt.addChild( levelLabel );
    baseBt.addChild( new Node( {children: [options.shape], x: 0, y: 0} ) );
    baseBt.addChild( starBox = new StarBoxNode( {x: 0, width: options.width, starCount: options.starCount} ) );
    starBox.setY( (options.height - starBox.getHeight()) / 2 );

    // create shadow
    shadowBt = new Rectangle( -(options.width / 2) + shadowOffset.x, -(options.height / 2) + shadowOffset.y, options.width, options.height, options.round, options.round, {fill: options.stroke, stroke: options.stroke, lineWidth: options.lineWidth} );

    // create push button
    this.addChild( new PushButtonDeprecated(
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