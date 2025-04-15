// utils/scaling.ts
import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

// Base dimensions (iPhone 13 portrait)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

// Device detection
export const isTablet = width >= 600 && height >= 600;
export const isTV = Platform.isTV;
export const isLandscape = width > height;

// Scaling factors
const scaleFactor = Math.min(width / BASE_WIDTH, height / BASE_HEIGHT);
const tvScaleFactor = isTV ? 1.8 : 1;
const tabletScaleFactor = isTablet ? 1.4 : 1;

// Responsive scaling functions
export const scaleSize = size =>
  Math.ceil(
    size *
      scaleFactor *
      tabletScaleFactor *
      tvScaleFactor *
      (isLandscape ? 1.1 : 1),
  );

export const scaleFont = size =>
  Math.ceil(
    size *
      scaleFactor *
      tabletScaleFactor *
      tvScaleFactor *
      (isLandscape ? 1.05 : 1),
  );

// Orientation-aware padding
export const responsivePadding = base =>
  scaleSize(base) * (isLandscape ? 0.8 : 1);

// Responsive border radius
export const responsiveBorderRadius = base =>
  scaleSize(base) * (isTV ? 1.5 : 1);
