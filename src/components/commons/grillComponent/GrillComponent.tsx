import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function GrillComponent() {
  return (
    <View style={styleGrillCo.container}>
        <View style={styleGrillCo.row}>
            <View style={[styleGrillCo.block, styleGrillCo.blockTop]} />
            <View style={[styleGrillCo.block, styleGrillCo.blockTop, styleGrillCo.blockMiddle]} />
            <View style={[styleGrillCo.block, styleGrillCo.blockTop]} />
        </View>
        <View style={styleGrillCo.row}>
            <View style={[styleGrillCo.block, styleGrillCo.blockTop]} />
            <View style={[styleGrillCo.block, styleGrillCo.blockTop, styleGrillCo.blockMiddle]} />
            <View style={[styleGrillCo.block, styleGrillCo.blockTop]} />
        </View>
        <View style={styleGrillCo.row}>
            <View style={[styleGrillCo.block]} />
            <View style={[styleGrillCo.block, styleGrillCo.blockMiddle]} />
            <View style={[styleGrillCo.block]} />
        </View>
    </View>
  );
}

const styleGrillCo = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        opacity: 0.5,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    block: {
        flex: 1,
    },
    blockTop: {
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 1,
    },
    blockMiddle: {
        borderLeftColor: '#FFFFFF',
        borderLeftWidth: 1,
        borderRightColor: '#FFFFFF',
        borderRightWidth: 1,
    },
});
