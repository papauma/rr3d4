import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { IContextualMessage } from '@src/types/interfaces';
import { useDispatch } from 'react-redux';
import { resetContextual } from '@src/redux/slices/contextualSlice';

const iconError = require('@images/error.png');

export default function ContextualMessage({result, text}: IContextualMessage) {

  const dispatch = useDispatch();

  setTimeout(()=> {
    dispatch(resetContextual());
  }, 4000);

  return (
    <View style={result === 'OK' ? stylesContextualMes.resultOK : stylesContextualMes.resultKO}>
        {result === 'KO' ? <Image source={iconError} style={stylesContextualMes.image}  accessible={true} accessibilityLabel={'KO'} /> : <></>}
        <Text style={stylesContextualMes.text}>{text}</Text>
    </View>
  );
}

const stylesContextualMes = StyleSheet.create({
    resultOK: {
     borderColor: '#26910c',
     borderWidth: 2,
     backgroundColor: '#a9d49f',
     justifyContent: 'center',
     alignItems: 'center',
     padding: 20,
     borderRadius: 6,
     position: 'absolute',
     bottom: 50,
     width: '100%',
    },
    resultKO: {
      backgroundColor: '#d32f2f',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      position: 'absolute',
      bottom: 50,
      width: '100%',
      flex:1,
      flexDirection: 'row',
      gap: 5,
    },
    text: {
       color: 'white',
       fontWeight: '500',
     },
     image: {
      width: 20,
      height: 20,
     },
  });
