// Copyright 2020-2023, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import type LocalizedStringProperty from '../../chipper/js/LocalizedStringProperty.js';
import fractionMatcher from './fractionMatcher.js';

type StringsType = {
  'fraction-matcher': {
    'title': string;
    'titleStringProperty': LocalizedStringProperty;
  };
  'fractionsTitle': string;
  'fractionsTitleStringProperty': LocalizedStringProperty;
  'mixedNumbersTitle': string;
  'mixedNumbersTitleStringProperty': LocalizedStringProperty;
};

const FractionMatcherStrings = getStringModule( 'FRACTION_MATCHER' ) as StringsType;

fractionMatcher.register( 'FractionMatcherStrings', FractionMatcherStrings );

export default FractionMatcherStrings;
