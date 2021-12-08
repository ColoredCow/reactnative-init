import React from 'react';
import {View, ActivityIndicator} from 'react-native';

export default Loading = props => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <ActivityIndicator color={'green'} animating={true} size="small" />
    </View>
  );
};
