import Icon from '@src/components/commons/icon/Icon';
import {Menu} from '@src/components/commons/menu/Menu';
import {MenuItem} from '@src/components/commons/menu/MenuItem';
import ScreenTitle from '@src/components/commons/text/ScreenTitle';
import {useTranslate} from '@src/context/languageContext';
import {ThemeProps, useTheme} from '@src/context/themeContext';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

export default function AlertsScreen() {
  const t = useTranslate();
  const theme = useTheme();
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScreenTitle
        title={t('notices')}
        showThirdButton={true}
        onPressOptionalButton={() => setShowFilterMenu(!showFilterMenu)}
        childrenThirdButton={
          <View style={styles(theme).button}>
            <Icon source={theme.drawables.general.Ic_filters} />
            <Menu
              visible={showFilterMenu}
              onRequestClose={() => setShowFilterMenu(false)}
              anchor={<View />}>
              <MenuItem style={[styles(theme).menuItem]}>
                {t('alerts_sections_favorites')}
              </MenuItem>
              <MenuItem
                style={[styles(theme).menuItem, styles(theme).centerMenuItem]}>
                {t('alerts_sections_general')}
              </MenuItem>
              <MenuItem style={styles(theme).menuItem}>
                {t('alerts_sections_all')}
              </MenuItem>
            </Menu>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = (theme: ThemeProps) =>
  StyleSheet.create({
    button: {
      backgroundColor: theme.colors.white,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
    },
    menuItem: {
      paddingVertical: 9.5,
      paddingHorizontal: 18,
    },
    centerMenuItem: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors.gray_300,
    },
    topMenuItem: {
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
    }
  });
