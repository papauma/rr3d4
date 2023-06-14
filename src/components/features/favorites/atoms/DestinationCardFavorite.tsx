import Button from '@src/components/commons/buttons/Button';
import Icon from '@src/components/commons/icon/Icon';
import IconDynamic from '@src/components/commons/icon/IconDynamic';
import Label from '@src/components/commons/text/Label';
import {useTranslate} from '@src/context/languageContext';
import {ThemeProps, useTheme} from '@src/context/themeContext';
import {IMarker} from '@src/types/interfaces';
import React from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';

interface DestinationCardFavoriteProps {
  marker: IMarker;
  style?: StyleProp<ViewStyle>;
  staticIcon?: any;
  iconId?: any;
}

export default function DestinationCardFavorite(
  props: DestinationCardFavoriteProps,
) {
  const theme = useTheme();
  const t = useTranslate();

  return (
    <TouchableOpacity style={[styles(theme).card, props.style]}>
      <View style={styles(theme).row}>
        <IconDynamic
          source={props.staticIcon}
          iconId={props.iconId}
          color={props.staticIcon ? theme.colors.primary_300 : undefined}
        />
        {props.marker.data?.name ? (
          <Label
            style={styles(theme).name}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
            {props.marker.data?.name}
          </Label>
        ) : undefined}
      </View>
      <View style={[styles(theme).row, {flex: 0.5, justifyContent: 'flex-end'}]}>
        <Button
          icon={theme.drawables.general.Ic_Plan}
          iconStyle={{tintColor: theme.colors.white}}
          style={{padding: 10, paddingHorizontal: 10, width: 38, height: 38}}
          buttonSizeStyle="extra-small"
          onPress={() => {}}
        />
        <Button
          buttonCategory="tertiary"
          icon={theme.drawables.general.Ic_Star}
          iconStyle={{tintColor: theme.colors.tertiary_yellow, alignSelf: 'center'}}
          buttonSizeStyle="extra-small"
          style={{ marginLeft: 4, padding: 10, paddingHorizontal: 10, width: 38, height: 38}}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = (theme: ThemeProps) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.white,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
      borderRadius: 16,
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 20.8,
      marginLeft: 8,
      textTransform: 'capitalize',
      flex: 1,
    },
  });
