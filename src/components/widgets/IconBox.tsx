import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import Label from '../commons/text/Label';
import IconDynamic from '../commons/icon/IconDynamic';
import { useTheme } from '@src/context/themeContext';

interface IconBoxProps {
    code?: string;
    staticIcon?: any;
    iconId?: number;
    styleBox?: StyleProp<ViewStyle>;
    alt?: string;
}

export default function IconBox(props: IconBoxProps) {
  const theme = useTheme();

  return (
    <View style={[{alignItems: 'center', 
                  paddingHorizontal: 4, 
                  paddingVertical: 10, 
                  backgroundColor: theme.colors.primary_300, 
                  borderRadius: 8, 
                  flexDirection: 'row'}, 
                  props.styleBox]}
                  accessible={true}>
          <IconDynamic
            source={props.staticIcon}
            alt={props.alt}
            iconId={props.iconId}
            color={theme.colors.white}
            size={16}
            />
          {props.code
            ? (<Label style={{marginLeft: 6, 
              color: theme.colors.white, 
              fontSize: 14, 
              fontWeight: '700', 
              lineHeight: 18.2}}>{props.code}</Label>) 
            : null
          }
        </View>
  )
}
