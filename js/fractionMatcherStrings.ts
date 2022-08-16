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
    'titleProperty': TReadOnlyProperty<string>;
  };
  'fractionsTitle': string;
  'fractionsTitleProperty': TReadOnlyProperty<string>;
  'mixedNumbersTitle': string;
  'mixedNumbersTitleProperty': TReadOnlyProperty<string>;
};

const fractionMatcherStrings = getStringModule( 'FRACTION_MATCHER' ) as StringsType;

fractionMatcher.register( 'fractionMatcherStrings', fractionMatcherStrings );

export default fractionMatcherStrings;
