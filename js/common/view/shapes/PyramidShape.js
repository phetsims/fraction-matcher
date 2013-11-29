// Copyright 2002-2013, University of Colorado Boulder

/**
 * Pyramid shape graph for the 'Fraction Matcher' screen.
 * Only for fractions with denominator equal to 1, 4 or 9.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var AbstractShape = require( 'common/view/shapes/AbstractShape' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  function PyramidShape( options ) {
    var diameter,
      size,
      denominator,
      numerator,
      pieces = [];

    AbstractShape.call( this, options );
    options = this.options;
    denominator = options.denominator;
    numerator = options.numerator;

    // determine diameter of shape
    diameter = Math.min( options.width, options.height ); // diameter of container to fill
    size = 1.1 * diameter / Math.sqrt( denominator ); // size of one piece

    // init arrays for shapes
    for ( var i = 0; i < Math.ceil( numerator / denominator ); i++ ) {
      pieces[i] = [];
    }

    // TODO: stroke
    // create pyramids and add them to created array
    for ( i = 0; i < pieces.length; i++ ) {
      if ( denominator === 1 ) {
        this.addSingle( pieces[i], size );
      }
      else if ( denominator === 4 ) {
        this.addFour( pieces[i], size );
      }
      else if ( denominator === 9 ) {
        this.addNine( pieces[i], size );
      }
    }

    // add pyramids to node
    this.arrayToShapes( pieces, size / 2 );
    this.setY( options.height / 8 );
  }

  var SQRT_3 = Math.sqrt( 3 ),
    map = { // positions of triangles in pyramid
      four: [
        {x: 0, y: -0.5, type: 'top'},
        {x: -SQRT_3 / 4, y: 0.25, type: 'top'},
        {x: 0, y: 0, type: 'bottom'},
        {x: SQRT_3 / 4, y: 0.25, type: 'top'}
      ],
      nine: [
        {x: 0, y: -1, type: 'top'},
        {x: -SQRT_3 / 4, y: -0.25, type: 'top'},
        {x: 0, y: -0.5, type: 'bottom'},
        {x: SQRT_3 / 4, y: -0.25, type: 'top'},
        {x: -SQRT_3 / 2, y: 0.5, type: 'top'},
        {x: -SQRT_3 / 4, y: 0.25, type: 'bottom'},
        {x: 0, y: 0.5, type: 'top'},
        {x: SQRT_3 / 4, y: 0.25, type: 'bottom'},
        {x: SQRT_3 / 2, y: 0.5, type: 'top'}
      ]
    };

  return inherit( AbstractShape, PyramidShape, {
    getPiece: function( size, orientation ) {
      var shape;
      if ( orientation === 'top' ) {
        shape = this.pointsToShape( new Shape(), [
          {x: 0, y: -0.5},
          {x: SQRT_3 / 4, y: 0.25},
          {x: -SQRT_3 / 4, y: 0.25},
          {x: 0, y: -0.5}
        ], size );
      }
      else if ( orientation === 'bottom' ) {
        shape = this.pointsToShape( new Shape(), [
          {x: 0, y: 0.5},
          {x: SQRT_3 / 4, y: -0.25},
          {x: -SQRT_3 / 4, y: -0.25},
          {x: 0, y: 0.5}
        ], size );
      }
      return shape;
    },
    addSingle: function( target, size ) {
      target.push( new Path( this.getPiece( size, 'top' ), {
        fill: 'white', stroke: this.options.stroke, lineWidth: 1
      } ) );
    },
    addFour: function( target, size ) {
      for ( var i = 0, path; i < 4; i++ ) {
        path = new Path( this.getPiece( size, map.four[i].type ), {
          x: map.four[i].x * size, y: map.four[i].y * size, fill: 'white', stroke: this.options.stroke, lineWidth: 1
        } );
        target.push( path );
      }
    },
    addNine: function( target, size ) {
      for ( var i = 0, path; i < 9; i++ ) {
        path = new Path( this.getPiece( size, map.nine[i].type ), {
          x: map.nine[i].x * size, y: map.nine[i].y * size, fill: 'white', stroke: this.options.stroke, lineWidth: 1
        } );
        target.push( path );
      }
    }
  } );
} );
