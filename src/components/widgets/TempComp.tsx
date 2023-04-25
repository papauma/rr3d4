import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { navigationPages } from '@src/utils/constants';

export default function TempComp() {
    const navigation = useNavigation() as any;

  return (
    <View style={styles.container}>
        <Pressable style={styles.boton}
            onPress={() => {
                navigation.navigate(navigationPages.language);
            }}>
            <Text>Idioma</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 100,
    },
    boton: {
        fontSize: 5,
        borderColor: 'grey',
        borderWidth: 1,
        backgroundColor: 'fff003',
    },
});
