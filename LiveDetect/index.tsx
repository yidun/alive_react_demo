import React from 'react';
import {requireNativeComponent, StyleProp, ViewStyle} from 'react-native';
const NTESRNLiveDetectView = requireNativeComponent('NTESRNLiveDetect');

export default (props: {
  style: StyleProp<ViewStyle>;
  onActionChange: (e: {nativeEvent: {actions: string}}) => void;
  onWarnChange: (e: {nativeEvent: {message?: string}}) => void;
  onStepChange: (e: {
    nativeEvent: {message?: string; currentStep: number};
  }) => void;
  onResultChange: (e: {
    nativeEvent: {message?: string; token?: string};
  }) => void;
}) => <NTESRNLiveDetectView {...props} />;
