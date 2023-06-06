import { useNavigation } from '@react-navigation/native';
import InfoItemSection from '@src/components/commons/infoComponent/InfoItemSectionProps';
import Label from '@src/components/commons/text/Label'
import { useTranslate } from '@src/context/languageContext';
import { ThemeProps, useTheme } from '@src/context/themeContext'
import { navigationPages } from '@src/utils/constants';
import React from 'react'
import { FlatList, SafeAreaView, SectionList, StyleSheet, View } from 'react-native'

export default function SettingsScreen() {
  const theme = useTheme();
  const t = useTranslate();
  const navigation = useNavigation();

  const sections: any =  [
        {
          id: '1-1',
          //icon: R.resources.drawables.general.Ic_Policy,
          name: t('settings_section_general_account'),
          /* onPress: async () => {
            
              await analytics().logEvent('onClickAvisoLegal');
            await Linking.canOpenURL(linkLegal).then(() =>
              Linking.openURL(linkLegal),
            );
          }, */
        },
        {
          id: '1-2',
          icon: theme.drawables.general.Ic_Earth,
          name: t('settings_section_general_language'),
          onPress: () => {
            navigation.navigate(navigationPages.language)
          },
        },
        {
            id: '1-3',
            icon: theme.drawables.general.Ic_Bell,
            name: t('settings_section_general_alert'),
        },
        {
            id: '1-4',
            icon: theme.drawables.general.Ic_Support,
            name: t('settings_section_help_and_support'),
        },
        {
            id: '1-5',
            icon: theme.drawables.general.Ic_Fee,
            name: t('settings_section_general_fee'),
        },
        {
            id: '1-6',
            icon: theme.drawables.general.Ic_Points,
            name: t('settings_section_points'),
        },
        {
          id: '1-7',
          //icon: R.resources.drawables.general.Ic_Cookie,
          name: t('settings_section_general_settings'),
      },
    ];
    

  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={[styles(theme).viewTitle]}>
            <Label style={[styles(theme).title]}>{t('settings_screen_title')}</Label>
        </View>
        <View style={{flex: 1, padding: 16, paddingTop: 0, borderRadius: 16,}}>
          <FlatList
            accessibilityLabel='Lista de ajustes'
            data={sections}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <InfoItemSection
                accessibilityHint={t('')}
                styleView={[index !== 0 
                  ? {
                      borderTopWidth: 1, 
                      borderColor: theme.colors.gray_200
                    } 
                  : {
                      borderTopRightRadius: 16,
                      borderTopLeftRadius: 16
                  },
                 index === sections?.length - 1 
                  ? {
                    borderBottomRightRadius: 16,
                    borderBottomLeftRadius: 16
                  } 
                  : 
                    null
                ]}
                title={item.name}
                iconStatic={item.icon}
                onPress={item.onPress}
              />
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
