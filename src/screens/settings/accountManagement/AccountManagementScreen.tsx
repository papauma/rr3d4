import { useNavigation } from '@react-navigation/native';
import InfoItemSection from '@src/components/commons/infoComponent/InfoItemSectionProps';
import ScreenTitle from '@src/components/commons/text/ScreenTitle';
import { useTranslate } from '@src/context/languageContext';
import { useTheme } from '@src/context/themeContext';
import { navigationPages } from '@src/utils/constants';
import React from 'react'
import { FlatList, SafeAreaView, View } from 'react-native'

export default function AccountManagementScreen() {
    const theme = useTheme();
    const t = useTranslate();
    const navigation = useNavigation();
  
    const sections: any =  [
          {
            id: '1-1',
            icon: theme.drawables.general.Ic_User,
            name: t('account_management_personal_information'),
            onPress: () => {
                //navigation.navigate(navigationPages.language)
            },
          },
          {
            id: '1-2',
            icon: theme.drawables.general.Ic_Lock,
            name: t('account_management_change_password'),
            onPress: () => {
              //navigation.navigate(navigationPages.language)
              navigation.navigate(navigationPages.changePassword)
            },
          },
          {
              id: '1-3',
              icon: theme.drawables.general.Ic_LogOut,
              name: t('account_management_log_out'),
              onPress: () => {
                //navigation.navigate(navigationPages.language)
              },
          },
      ];

  return (
    <SafeAreaView style={{flex: 1}}>
        <ScreenTitle
            title={t('settings_section_general_account')}
        />
        <View style={{flex: 1, padding: 16, paddingTop: 0, borderRadius: 16,}}>
          <FlatList
            //accessibilityLabel='Lista de ajustes'
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
