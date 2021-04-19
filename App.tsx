/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  DeviceEventEmitter,
  NativeModules,
  Button,
} from 'react-native';
import LiveDetect from './LiveDetect';
import LiveDetectTip from './LiveDetectTip';
import Modal from 'react-native-modal';

const AliveHelper = NativeModules.AliveHelper;
const App = () => {
  const [actions, setActions] = useState<number[]>([]);
  const [warnMessage, setWarnMessage] = useState<string>();
  const [tipMessage, setTipMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [resultMessage, setResultMessage] = useState<string>();
  const [token, setToken] = useState<string>();

  const handleActionChange = ({actions = ''}: {actions: string}) => {
    // 0——正面，1——右转，2——左转，3——张嘴，4——眨眼
    if (actions.length > 0) {
      setActions(actions.split('').map((item) => +item));
    }
  };

  const handleWarnChange = ({message}: {message?: string}) => {
    setWarnMessage(message);
  };

  const handleStepChange = ({
    message,
    currentStep,
  }: {
    message?: string;
    currentStep?: number;
  }) => {
    setWarnMessage('');
    if (message) {
      setTipMessage(message);
    }
    if (currentStep) {
      setCurrentStep(currentStep);
    }
  };

  const handleResultChange = useCallback(
    ({message, token}: {message?: string; token?: string}) => {
      setWarnMessage('');
      setVisible(true);
      setResultMessage(message);
      setToken(token);
    },
    [],
  );

  /** 监听在android上生效，在ios上不生效 */
  useEffect(() => {
    const actionListener = DeviceEventEmitter.addListener(
      'onActionChange',
      handleActionChange,
    );
    const warnListener = DeviceEventEmitter.addListener(
      'onWarnChange',
      handleWarnChange,
    );
    const stepListener = DeviceEventEmitter.addListener(
      'onStepChange',
      handleStepChange,
    );
    const resultListener = DeviceEventEmitter.addListener(
      'onResultChange',
      handleResultChange,
    );

    return () => {
      actionListener.remove();
      warnListener.remove();
      stepListener.remove();
      resultListener.remove();
    };
  }, [handleResultChange]);

  useEffect(() => {
    return () => AliveHelper.stopAlive();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
               
        <Button onPress={() =>  AliveHelper.initWithBusinessID('6a1a399443a54d31b91896a4208bf6e0',30,)} title="初始化SDK" />
        <Button onPress={() => AliveHelper.startAlive()} title="开始活体检测" />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
          }}>
          <Text style={{fontSize: 18, textAlign: 'center', fontWeight: '400'}}>
            {warnMessage}
          </Text>
        </View>
        <LiveDetect
          style={{
            width: 250,
            height: 250,
            borderRadius: 125,
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          /** 以下4个监听在IOS上生效，在android不生效 */
          onActionChange={(e) => handleActionChange(e.nativeEvent)}
          onWarnChange={(e) => handleWarnChange(e.nativeEvent)}
          onStepChange={(e) => handleStepChange(e.nativeEvent)}
          onResultChange={(e) => handleResultChange(e.nativeEvent)}
        />
        <LiveDetectTip {...{tipMessage, actions, currentStep}} />
      </View>
      <Modal isVisible={visible}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>{resultMessage}</Text>
          <Text>{token}</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default App;
