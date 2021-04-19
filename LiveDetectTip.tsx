/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const LiveDetectTip: React.FC<{
  tipMessage: string;
  actions: number[];
  currentStep: number;
}> = ({tipMessage, actions, currentStep}) => {
  const gifImages = [
    {index: 0, source: require('./images/front.png')},
    {index: 1, source: require('./images/turn-right.gif')},
    {index: 2, source: require('./images/turn-left.gif')},
    {index: 3, source: require('./images/open-mouth.gif')},
    {index: 4, source: require('./images/open-eyes.gif')},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.tipText}>{tipMessage}</Text>
      <Image
        source={gifImages.find((ele) => ele.index === currentStep)!.source}
        style={styles.image}
      />
      <View style={styles.dotContainer}>
        {actions.map((item, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentStep === item
                ? {
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                  }
                : {},
            ]}>
            {currentStep === item && (
              <Text style={styles.dotText}>{index + 1}</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  tipText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '400',
  },
  image: {
    width: 140,
    height: 140,
  },
  dotContainer: {
    flexDirection: 'row',
    width: 120,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotText: {
    color: '#ffffff',
  },
});

export default React.memo(LiveDetectTip);
