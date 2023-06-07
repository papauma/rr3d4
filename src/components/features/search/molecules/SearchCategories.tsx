import {useNavigation} from '@react-navigation/native';
import DirectoryButton from '@src/components/commons/buttons/DirectoryButton';
import Icon from '@src/components/commons/icon/Icon';
import Label from '@src/components/commons/text/Label';
import {useTranslate} from '@src/context/languageContext';
import {ThemeProps, useTheme} from '@src/context/themeContext';
import {navigationPages} from '@src/utils/constants';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

export default function SearchCategories() {
  const theme = useTheme();
  const t = useTranslate();
  const navigation = useNavigation();

  const sections: Array<any> = [
    {
      id: '1-1',
      name: t('search_directories_lines'),
      accessibilityHint: t('accessibility_directory_lines_desc'),
      icon: theme.drawables.general.Ic_Bus,
      onPress: () => navigation.navigate(navigationPages.linesDirectory),
    },
  ];

  return (
    <View style={{flex: 1, marginTop: 24}}>
      <Label style={styles(theme).title}>{t('search_directories')}</Label>
      <View style={styles(theme).container}>
        {sections.map((section: any) => {
          return (
            <DirectoryButton
              key={section.id}
              accessibilityHint={section.accessibilityHint}
              icon={section.icon}
              name={section.name}
              onPress={section.onPress}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = (theme: ThemeProps) =>
  StyleSheet.create({
    title: {
      textTransform: 'uppercase',
      color: theme.colors.gray_700,
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 20.8,
    },
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    name: {
      color: theme.colors.gray_700,
      fontWeight: '700',
      fontSize: 12,
      lineHeight: 15.6,
      textAlign: 'center',
      marginTop: 4,
    },
    bigCircle: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.primary_300,
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    smallCircle: {
      backgroundColor: theme.colors.primary_300,
      width: 54,
      height: 54,
      borderRadius: 27,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
