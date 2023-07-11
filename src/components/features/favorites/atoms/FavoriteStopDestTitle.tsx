import Icon from '@src/components/commons/icon/Icon';
import Label from '@src/components/commons/text/Label';
import {useTheme} from '@src/context/themeContext';
import React from 'react';
import {View} from 'react-native';

interface FavoriteStopDestTitleProps {
  name: string;
  icon: any;
}

export default function FavoriteStopDestTitle(
  props: FavoriteStopDestTitleProps,
) {
  const theme = useTheme();

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
      <Icon source={props.icon} tint={theme.colors.gray_700} />
      <Label
        style={{
          marginLeft: 8,
          color: theme.colors.gray_700,
          fontWeight: '700',
          fontSize: 14,
          lineHeight: 18.2,
        }}>
        {props.name}
      </Label>
    </View>
  );
}
