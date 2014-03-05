// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model container single shape.
 *
 * @author Anton Ulyanov, Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  function SingleShapeModel( type, fraction, scaleFactor, fill, fillType, toSimplify ) {
    this.x = 0;
    this.y = 0;
    this.type = type;
    this.numerator = fraction[0];
    this.denominator = fraction[1];
    this.toSimplify = toSimplify;
    this.scaleFactor = scaleFactor;
    this.fill = fill;
    this.fillType = fillType;
    this.answerZone = -1;
    this.dropZone = -1;
    this.width = 60;
    this.height = 60;

    this.getAnswer = function() {
      return this.numerator / this.denominator;
    };
  }

  return SingleShapeModel;
} );
