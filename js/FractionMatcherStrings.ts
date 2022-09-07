// Copyright 2020-2022, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import TReadOnlyProperty from '../../axon/js/TReadOnlyProperty.js';
import fractionMatcher from './fractionMatcher.js';

type StringsType = {
  'fraction-matcher': {
    'title': string;
    'titleStringProperty': TReadOnlyProperty<string>;
  };
  'fractionsTitle': string;
  'fractionsTitleStringProperty': TReadOnlyProperty<string>;
  'mixedNumbersTitle': string;
  'mixedNumbersTitleStringProperty': TReadOnlyProperty<string>;
};

const FractionMatcherStrings = getStringModule( 'FRACTION_MATCHER' ) as StringsType;

fractionMatcher.register( 'FractionMatcherStrings', FractionMatcherStrings );

export default FractionMatcherStrings;
