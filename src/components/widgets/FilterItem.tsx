import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import Label from '../commons/text/Label';
import IconDynamic from '../commons/icon/IconDynamic';

const Item = ({ id, text, iconId, source, onPress, selected, style } : { id: number; text: string; iconId?: any; source?: any; onPress?: Function; selected?: boolean, style?: StyleProp<ViewStyle> }) => {

  return (
    <TouchableOpacity style={[styles.container, style]} key={id} onPress={() => onPress?.()}>
      <View style={styles.content}>
        <IconDynamic
              alt='Icono filtro'
              accessible={false}
              iconId={iconId}
              source={source}
              style={{ width: 40, height: 40 }}
        />
        {text ? <Label style={{ marginTop: 8, textAlign: 'center' }}>{text}</Label> : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        gap: 8,
        padding: 4,
        alignItems: 'center',
        display: 'flex',
    },
    content: {
        columnGap: 11.5,
        borderRadius: 5,
        alignItems: 'center',
    }
})

export const FilterItem = React.memo(Item);