// Copyright 2002-2014, University of Colorado Boulder

/**
 * Pattern for creation shapes for the 'Fractions' sim.
 *
 * @author Vasily Shakhov (Mlearner)
 */

define( function( require ) {
  'use strict';

  var Path = require( 'SCENERY/nodes/Path' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Shape = require( 'KITE/Shape' );

  var Pattern = {
    createShapes: function( options ) {
      var shapes = []; //each shape[i] contains all paths, relative to i's single shape
      var outlines = []; //array of outlines of shapes
      for ( var i = 0; i < Math.ceil( options.numerator / options.denominator ); i++ ) {
        shapes.push( [] );
      }
      options.diameter = Math.min( options.width, options.height );

      var createdPaths = this[options.type]( shapes, outlines, options ); // {shapes:[Array], outlines:[]}
      return _.extend( {margin: options.diameter / 10}, createdPaths );
    },
    //array of points to Shape
    pointsToShape: function( s, array, size ) {
      size = size || 1;
      for ( var i = 0; i < array.length; i++ ) {
        s.lineTo( array[i].x * size, array[i].y * size );
      }
      s.close();
      return s;
    },
    VERTICAL_BARS: function( shapes, outlines, options ) {
      for ( var i = 0, l = shapes.length; i < l; i++ ) {
        for ( var j = 0; j < options.denominator; j++ ) {
          shapes[i].push( new Path( new Shape.rect( 0, 0, options.width / options.denominator, options.height ), {
            x: j / options.denominator * options.width, fill: 'white', stroke: options.stroke, lineWidth: 1
          } ) );
        }
        //outlines
        outlines.push( new Path( new Shape.rect( 0, 0, options.width, options.height ), {stroke: options.stroke, lineWidth: options.outlineWidth} ) );
      }
      return {
        shapes: shapes,
        outlines: outlines
      };
    },
    HORIZONTAL_BARS: function( shapes, outlines, options ) {
      for ( var i = 0, l = shapes.length; i < l; i++ ) {
        for ( var j = 0; j < options.denominator; j++ ) {
          shapes[i].push( new Path( new Shape.rect( 0, 0, options.width, options.height / options.denominator ), {
            y: j / options.denominator * options.height, fill: 'white', stroke: options.stroke, lineWidth: 1
          } ) );
        }
        //outlines
        outlines.push( new Path( new Shape.rect( 0, 0, options.width, options.height ), {stroke: options.stroke, lineWidth: options.outlineWidth} ) );
      }
      return {
        shapes: shapes,
        outlines: outlines
      };
    },
    PIES: function( shapes, outlines, options ) {
      var radiansPerSlice = Math.PI * 2 / options.denominator;
      //single slice of shape
      var getSlice = function( startAngle, endAngle ) {
        var shape = new Shape();
        if ( Math.abs( (startAngle / 2) % Math.PI - (endAngle / 2) % Math.PI ) > 0.001 ) {
          shape.moveTo( 0, 0 )
            .lineTo( Math.cos( startAngle ) * options.diameter/2, Math.sin( startAngle ) * options.diameter/2 )
            .arc( 0, 0, options.diameter/2, startAngle, endAngle, false )
            .close();
        }
        else {
          shape.circle( 0, 0, options.diameter/2);
        }
        return shape;
      };

      for ( var i = 0, l = shapes.length; i < l; i++ ) {
        for ( var j = 0; j < options.denominator; j++ ) {
          shapes[i].push( new Path( getSlice( radiansPerSlice * j, radiansPerSlice * ( j + 1 ) ), {fill: 'white', stroke: options.stroke, lineWidth: 1} ) );
        }
        //outlines
        outlines.push( new Path( getSlice( 0, radiansPerSlice * options.denominator ), {stroke: options.stroke, lineWidth: options.outlineWidth} ) );
      }
      return {
        shapes: shapes,
        outlines: outlines
      };
    },
    POLYGON: function( shapes, outlines, options ) {
      var radiansPerSlice = Math.PI * 2 / options.denominator;
      //single slice of shape
      var getSlice = function( startAngle, endAngle ) {
        return Pattern.pointsToShape( new Shape(), [
          {x: 0, y: 0},
          {x: -Math.sin( startAngle ), y: -Math.cos( startAngle )},
          {x: -Math.sin( endAngle ), y: -Math.cos( endAngle )}
        ], options.diameter / 2 );
      };

      var getOutline = function() {
        var keyPoints = [];
        for ( var i = 0; i < options.denominator; i++ ) {
          keyPoints.push( {x: -Math.sin( radiansPerSlice * i ), y: -Math.cos( radiansPerSlice * i )} );
        }
        return Pattern.pointsToShape( new Shape(), keyPoints, options.diameter / 2 );
      };

      for ( var i = 0, l = shapes.length; i < l; i++ ) {
        for ( var j = 0; j < options.denominator; j++ ) {
          shapes[i].push( new Path( getSlice( radiansPerSlice * j, radiansPerSlice * ( j + 1 ) ), {fill: 'white', stroke: options.stroke, lineWidth: 1} ) );
        }
        //outlines
        outlines.push( new Path( getOutline(), {stroke: options.stroke, lineWidth: options.outlineWidth} ) );
      }
      return {
        shapes: shapes,
        outlines: outlines
      };
    }
  };

  /*

   FLOWER: require( 'FRACTION_COMMON/shapes/FlowerShape' ),
   RING_OF_HEXAGONS: require( 'FRACTION_COMMON/shapes/RingOfHexagonsShape' ),
   LETTER_L_SHAPES: require( 'FRACTION_COMMON/shapes/LetterLShape' ),
   PLUSES: require( 'FRACTION_COMMON/shapes/PlusSignsShape' ),
   PYRAMID: require( 'FRACTION_COMMON/shapes/PyramidShape' ),
   GRID: require( 'FRACTION_COMMON/shapes/GridShape' ),
   INTERLEAVED_L_SHAPES: require( 'FRACTION_COMMON/shapes/InterleavedLShape' ),
   TETRIS: require( 'FRACTION_COMMON/shapes/TetrisPieceShape' ),
   NINJA_STAR: require( 'FRACTION_COMMON/shapes/NinjaStarShape' ),
   */


  return Pattern;
} );