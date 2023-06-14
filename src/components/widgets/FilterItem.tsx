import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Label from '../commons/text/Label';
import IconDynamic from '../commons/icon/IconDynamic';
import {useTheme} from '@src/context/themeContext';
import Icon from '../commons/icon/Icon';

const Item = ({
  id,
  text,
  iconId,
  source,
  onPress,
  selected,
  style,
}: {
  id: number;
  text: string;
  iconId?: any;
  source?: any;
  onPress?: Function;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      key={id}
      onPress={() => onPress?.()}
      accessibilityState={{selected: selected}}>
      <View style={styles.content}>
        <View
          style={[
            styles.square,
            {
              borderColor: theme.colors.primary_300,
              backgroundColor: theme.colors.white,
            },
          ]}>
          {selected && (
            <Icon
              source={theme.drawables.general.Ic_Success}
              tint={theme.colors.success_02}
              size={18}
              style={styles.selectedIcon}
            />
          )}
          <IconDynamic
            //alt='Icono filtro'
            accessible={false}
            iconId={iconId}
            source={source}
            color={theme.colors.primary_300}
          />
        </View>

        {text ? (
          <Label style={{marginTop: 8, textAlign: 'center'}}>{text}</Label>
        ) : null}
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
  },
  square: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedIcon: {
    position: 'absolute',
    top: -8,
    alignSelf: 'flex-end',
    right: -6,
  },
});

export const FilterItem = React.memo(Item);
