import { colors } from '@src/resources/styles/theme';
import { IButton } from '@src/types/interfaces';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ButtonSecondary({text, onPress}: IButton) {
    return (
        <TouchableOpacity onPress={onPress} style={stylesButton.button}>
            <Text style={stylesButton.text}>{text}</Text>
        </TouchableOpacity>
      );
    }

const stylesButton = StyleSheet.create({
    button: {
        backgroundColor: colors.graySecundary,
        padding: 10,
        borderRadius: 6,
    },
    text: {
        color: 'white',
    },
    });
