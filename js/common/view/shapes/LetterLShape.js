// Copyright 2002-2013, University of Colorado Boulder

/**
 * Letter L shape graph for the 'Fraction Matcher' screen.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  "use strict";

  // imports
  var inherit = require( "PHET_CORE/inherit" );
  var AbstractShape = require( 'common/view/shapes/AbstractShape' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  function LetterLShape( options ) {
    var self = this,
      max,
      size,
      denominator,
      numerator,
      dimension,
      letters = [];

    AbstractShape.call( this, options );
    options = this.options;
    denominator = options.denominator;
    numerator = options.numerator;


    if ( numerator <= 8 && denominator <= 8 ) {
      max = Math.max( denominator, numerator );
    }
    else {
      max = Math.ceil( Math.max( denominator, numerator ) / 8 ) * 8;
    }

    // determine size of shape
    dimension = this.findDimension( max );
    size = Math.min( options.width / dimension.x, options.height / dimension.y );

    // create letter L and add them to temporary array
    for ( var i = 0, len = max / 2; i < len; i++ ) {
      // TODO: stroke
      letters.push( new Path( this.getLetterL( size, 'top' ), {
        x: (i * 2 + Math.floor( i / 4 )) * size, y: i % 4 * size, fill: 'white', stroke: options.stroke, lineWidth: 1
      } ) );
      letters.push( new Path( this.getLetterL( size, 'bottom' ), {
        x: (i * 2 + Math.floor( i / 4 )) * size, y: i % 4 * size, fill: 'white', stroke: options.stroke, lineWidth: 1
      } ) );
    }

    // TODO: MIXED type support
    if ( options.fillType === 'RANDOM' ) {
      this.shuffle( letters );
    }

    // add letter to node
    letters.forEach( function( letter, i ) {
      if ( i < numerator ) {
        letter.fill = options.fill;
      }
      self.addChild( letter );
    } );

    this.setTranslation( -this.getWidth() / 2, -this.getHeight() / 2 );
  }

  var shapeDefinition = {
    top: [
      {x: 0, y: 0},
      {x: 2, y: 0},
      {x: 2, y: 3},
      {x: 1, y: 3},
      {x: 1, y: 1},
      {x: 0, y: 1},
      {x: 0, y: 0}
    ],
    bottom: [
      {x: 0, y: 1},
      {x: 1, y: 1},
      {x: 1, y: 3},
      {x: 2, y: 3},
      {x: 2, y: 4},
      {x: 0, y: 4},
      {x: 0, y: 1}
    ]
  };

  return inherit( AbstractShape, LetterLShape, {
    getLetterL: function( size, orientation ) {
      return this.pointsToShape( new Shape(), shapeDefinition[orientation], size );
    },
    findDimension: function( d ) {
      return {
        x: d + Math.floor( (d - 1) / 8 ),
        y: d >= 7 ? 7 :
           d >= 5 ? 6 :
           d >= 3 ? 5 : 4
      };
    }
  } );
} );
