// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model container for single shape. Responds for single piece in LevelNode screen, coordinates and view parameters
 *
 * @author Anton Ulyanov, Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  /**
   *  @param {String}  type of shape (PIES, HORIZONTAL_BARS, etc)
   *  @param {Array} fraction of shape [1,2] corresponds for 1/2 fraction
   *  @param {String} fill color of shape
   *  @param {FRACTION_COMMON/FillType} type of filling piece(SEQUENTIAL, MIXED, etc)
   *  @param {Boolean} whether we must show shape in form of 13/5 or 2 3/5
   * */

  function SingleShapeModel( type, fraction, fill, fillType, toSimplify ) {
    this.x = 0;
    this.y = 0;
    this.type = type;
    this.numerator = fraction[0];
    this.denominator = fraction[1];
    this.toSimplify = toSimplify;
    this.fill = fill;
    this.fillType = fillType;
    //dropZone - index of rectangle at the bottom in LevelNode where this shape currently placed
    this.dropZone = -1;
    //width and height of view of current shape, required for creating view of shape
    this.width = 60;
    this.height = 60;
    if ( this.numerator / this.denominator > 1 ) {
      this.width = 80;
      this.height = 80;
    }

    this.getAnswer = function() {
      return this.numerator / this.denominator;
    };
  }

  return SingleShapeModel;
} );
