import { useNavigation } from '@react-navigation/native';
import InfoItemSection from '@src/components/commons/infoComponent/InfoItemSectionProps';
import Label from '@src/components/commons/text/Label'
import { useTranslate } from '@src/context/languageContext';
import { ThemeProps, useTheme } from '@src/context/themeContext'
import { navigationPages } from '@src/utils/constants';
import React from 'react'
import { SafeAreaView, SectionList, StyleSheet, View } from 'react-native'

export default function SettingsScreen() {
  const theme = useTheme();
  const t = useTranslate();
  const navigation = useNavigation();

  const sections: any = [
    {
      title: t('settings_section_general'),
      data: [
        {
          id: '1-1',
          //icon: R.resources.drawables.general.Ic_Policy,
          name: t('settings_section_general_login'),
          /* onPress: async () => {
            
              await analytics().logEvent('onClickAvisoLegal');
            await Linking.canOpenURL(linkLegal).then(() =>
              Linking.openURL(linkLegal),
            );
          }, */
        },
        {
          id: '1-2',
          //icon: R.resources.drawables.general.Ic_Security,
          name: t('settings_section_general_signup'),
          /* onPress: async () => {
            
              await analytics().logEvent('onClickProteccionDatos');
            
            await Linking.canOpenURL(linkDataProtection).then(() =>
              Linking.openURL(linkDataProtection),
            );
          }, */
        },
        {
          id: '1-3',
          icon: theme.drawables.general.Ic_Earth,
          name: t('settings_section_general_language'),
          onPress: () => {
            navigation.navigate(navigationPages.language)
          },
        },
        {
            id: '1-5',
            //icon: R.resources.drawables.general.Ic_Cookie,
            name: t('settings_section_general_accessibility'),
        },
        {
            id: '1-6',
            //icon: R.resources.drawables.general.Ic_Cookie,
            name: t('settings_section_general_data_protection'),
        },
        {
            id: '1-7',
            //icon: R.resources.drawables.general.Ic_Cookie,
            name: t('settings_section_general_legal_notice'),
        },
        {
            id: '1-8',
            //icon: R.resources.drawables.general.Ic_Cookie,
            name: t('settings_section_general_cookies'),
        },
      ],
    },
    {
      title: t('settings_section_gam'),
      data: [
        {
          id: '2-1',
          //icon: R.resources.drawables.general.Ic_Video,
          name: t('settings_section_gam_gamification'),
        },
        {
            id: '2-2',
            //icon: R.resources.drawables.general.Ic_Video,
            name: t('settings_section_gam_involvement'),
          },
      ],
    },
    {
        title: t('settings_section_help'),
        data: [
          {
            id: '3-1',
            //icon: R.resources.drawables.general.Ic_Video,
            name: t('settings_section_help_support'),
          },
          {
            id: '3-2',
            //icon: R.resources.drawables.general.Ic_Video,
            name: t('settings_section_help_contact'),
          },
        ],
      },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={[styles(theme).viewTitle]}>
            <Label style={[styles(theme).title]}>{t('settings_screen_title')}</Label>
        </View>
        <View style={{flex: 1, padding: 16, paddingTop: 0}}>
        <SectionList
          accessibilityLabel='Lista de ajustes'
          sections={sections}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <InfoItemSection
              accessibilityHint={t('')}
              styleView={{marginBottom: 8}}
              title={item.name}
              iconStatic={item.icon}
              onPress={item.onPress}
            />
          )}
          renderSectionHeader={({section: {title}}) => (
            <Label
              style={styles(theme).sectionTitle}>
              {title}
            </Label>
          )}
        />
      </View>
    </SafeAreaView> 
  )
}

const styles = (theme: ThemeProps) => StyleSheet.create({
    viewTitle: {
        padding: 21.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: '700',
        color: theme.colors.gray_800,
        lineHeight: 23.4,
        fontSize: 18,
    },
    sectionTitle: {
        color: theme.colors.gray_800,
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 20.8,
        marginTop: 24,
        marginBottom: 8,
    }
})
