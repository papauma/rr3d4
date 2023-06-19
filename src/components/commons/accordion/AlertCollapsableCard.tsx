import {ThemeProps, useTheme} from '@src/context/themeContext';
import React, {useState} from 'react';
import {
  Linking,
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from '../icon/Icon';
import Label from '../text/Label';
import {useTranslate} from '@src/context/languageContext';

interface AlertCollapsableCardProps {
  style?: StyleProp<ViewStyle>;
  title: string;
  startTime?: any;
  endTime?: any;
  description?: string;
  linkPdf?: string;
}

export default function AlertCollapsableCard(props: AlertCollapsableCardProps) {
  const theme = useTheme();
  const t = useTranslate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <View style={[styles(theme).content, props.style]}>
      <Pressable
        style={styles(theme).spaceRow}
        onPress={() => setCollapsed(!collapsed)}
        accessibilityState={{expanded: collapsed}}    
        >
        <View style={styles(theme).row}>
          <Icon
            source={theme.drawables.general.Ic_Error}
            tint={theme.colors.tertiary_yellow}
          />
          <Label style={[styles(theme).title, {marginLeft: 8}]}>
            {t('notices')}
          </Label>
        </View>
        <Icon
          source={
            !collapsed
              ? theme.drawables.general.Ic_Chevron_Down
              : theme.drawables.general.Ic_Chevron_Up
          }
        />
      </Pressable>
      {collapsed && (
        <>
          {props.title ? (
            <Label style={[styles(theme).title, {fontWeight: '600', marginTop: 6}]}>{props.title}</Label>
          ) : null}
          {props.startTime ? (
            <View style={styles(theme).row}>
              <Icon
                source={theme.drawables.general.Ic_Clock}
                tint={theme.colors.gray_600}
                size={18}
              />
              <Label style={styles(theme).date}>
                {'Desde el 1 de junio 2023 a las 09:12h.'}
              </Label>
            </View>
          ) : null}
          {props.endTime ? (
            <View style={styles(theme).row}>
              <Icon
                source={theme.drawables.general.Ic_Clock}
                tint={theme.colors.gray_600}
                size={18}
              />
              <Label style={styles(theme).date}>
                {'Hasta el 12 de junio 2023 a las 19:08h.'}
              </Label>
            </View>
          ) : null}
          <View style={styles(theme).separator} />
          {props.description ? (
            <Label style={styles(theme).description}>{props.description}</Label>
          ) : null}
          {props.linkPdf && (
            <TouchableOpacity
              style={styles(theme).row}
              onPress={async () => {
                await Linking.canOpenURL(props.linkPdf)
                  .then(async result => {
                    if (result) {
                      await Linking.openURL(props.linkPdf);
                    }
                  })
                  .catch(() => {});
              }}>
              <Icon source={theme.drawables.general.Ic_Download} size={18}/>
              <Label
                style={[
                  styles(theme).description,
                  {
                    textDecorationLine: 'underline',
                    textDecorationStyle: 'solid',
                    textDecorationColor: theme.colors.gray_600,
                    marginLeft: 8,
                  },
                ]}>
                {t('alert_download_pdf')}
              </Label>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}

const styles = (theme: ThemeProps) =>
  StyleSheet.create({
    content: {
      backgroundColor: '#FFECCF',
      padding: 16,
      borderRadius: 16,
    },
    spaceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      color: theme.colors.gray_700,
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 20.8,
    },
    date: {
      color: theme.colors.gray_600,
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 18,
      marginLeft: 8,
    },
    description: {
      color: theme.colors.gray_600,
      fontSize: 12,
      lineHeight: 18,
      fontWeight: '400',
    },
    separator: {
      borderBottomWidth: 1,
      borderColor: theme.colors.gray_400,
      flex: 1,
      width: '100%',
      marginBottom: 8,
      marginTop: 11,
    },
  });
