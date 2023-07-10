import Button from '@src/components/commons/buttons/Button';
import Icon from '@src/components/commons/icon/Icon';
import LineCodeSemiCircle from '@src/components/commons/routeCode/LineCodeSemiCircle';
import Label from '@src/components/commons/text/Label';
import {useTranslate} from '@src/context/languageContext';
import {ThemeProps, useTheme} from '@src/context/themeContext';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface LineCardFavoriteProps {
  code?: string;
  transportMode?: number;
  routeColor?: string;
  routeTextColor?: string;
  name?: string;
  style?: StyleProp<ViewStyle>;
  alert?: any;
}

export default function LineCardFavorite(props: LineCardFavoriteProps) {
  const theme = useTheme();
  const t = useTranslate();

  return (
    <TouchableOpacity style={[styles(theme).card, props.style]}>
      <View style={styles(theme).row}>
        <LineCodeSemiCircle
          code={props.code}
          transportMode={props.transportMode}
          backgroundColor={
            props.routeColor ? `#${props.routeColor}` : undefined
          }
          textColor={
            props.routeTextColor ? `#${props.routeTextColor}` : undefined
          }
        />
        {props.name ? (
          <Label
            style={styles(theme).name}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
            {props.name}
          </Label>
        ) : undefined}
      </View>
      <View style={{flexShrink: 1}}>
        <Button
          buttonCategory="tertiary"
          buttonSizeStyle="extra-small"
          icon={theme.drawables.general.Ic_Delete}
          iconStyle={{marginRight: 0}}
          style={{
            flexShrink: 1,
            borderColor: theme.colors.primary_500,
            paddingHorizontal: 12,
          }}
          styleView={{alignItems: 'center', justifyContent: 'center'}}
        />
        {props.alert && (
          <Icon
            source={theme.drawables.general.Ic_Error}
            tint={theme.colors.tertiary_yellow}
            style={{alignSelf: 'flex-end', position: 'absolute', top: -18, right: -24}}
          />
        )}
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
      paddingHorizontal: 16,
      paddingVertical: 10.5,
      borderRadius: 16,
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      flexShrink: 1,
    },
    name: {
      color: theme.colors.gray_700,
      fontSize: 14,
      fontWeight: '700',
      lineHeight: 18.2,
      marginLeft: 8,
      textTransform: 'capitalize',
      flex: 1,
    },
  });
