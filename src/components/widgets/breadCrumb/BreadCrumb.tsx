import { View, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '@src/resources/styles/theme';
import { TOTAL_STEPS } from '@src/utils/constants';

interface IBreadCrumb {
    step: number;
}

export default function BreadCrumb({step}: IBreadCrumb) {
    const done = step * 100 / TOTAL_STEPS;
    const pendent = 100 - done;
  return (

    <View style={stylesBreadC(done, pendent).container}>
        <View style={stylesBreadC(done, pendent).done} />
        <View style={stylesBreadC(done, pendent).pendent} />
    </View>
  );
}


const stylesBreadC = (done: number, pendent: number) => StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        height: 5,
    },
    done: {
        backgroundColor: colors.buttonAction,
        width: done + '%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    pendent: {
        color: 'white',
        backgroundColor: colors.graySecundary,
        width: pendent + '%',
    },
 });
