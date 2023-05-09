
import Label from '@src/components/commons/text/Label';
import ScreenTitle from '@src/components/commons/text/ScreenTitle';
import { useLanguage, useSetLanguage, useTranslate } from '@src/context/languageContext';
import { useTheme } from '@src/context/themeContext';
import { random } from '@src/utils/StringUtils';
import React from 'react';
import {StyleSheet, View, Pressable, SafeAreaView} from 'react-native';
import { useDispatch } from 'react-redux';

export default function LanguageScreen() {
  const t = useTranslate();
  const theme = useTheme();
  const languageSelected = useLanguage();
  const setLanguage = useSetLanguage();

  const languages = ['es', 'en', 'ca'];
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles(theme).content}>
      <ScreenTitle title={t('settings_section_general_language')} />
      {/* {modalControl.showExploreLoading && <Loading />} */}
      <View
        style={{flex: 1, paddingHorizontal: 16}}
        accessible={true}
        accessibilityLabel={t('accesible_languages_list')}
        accessibilityRole="list">
        {languages.map(language => (
          <Pressable
            accessibilityState={{selected: languageSelected === language}}
            accessibilityHint={t('accesible_language_select')}
            key={random()}
            style={
              languageSelected === language
                ? styles(theme).selected
                : styles(theme).text
            }
            onPress={async () => {
              /* dispatch(
                modalControlSlice.actions.updateShowExploreLoading(true),
              );
              const result = await updateLanguage({
                body: {languageId: AuthUtils.getLanguage(language)},
                token: account.token,
              });
              if (result.data) {
                setTimeout(() => {
                  dispatch(authSlice.actions.updateLanguageLocale(language));
                  dispatch(
                    authSlice.actions.updateLanguageId(
                      AuthUtils.getLanguage(language),
                    ),
                  );
                }, 500);
              }

              if (result.error) {
              } */
              setLanguage(language);
              /* setTimeout(() => {
                dispatch(
                  modalControlSlice.actions.updateShowExploreLoading(false),
                );
              }, 500); */
            }}>
            <View style={styles(theme).option}>
              <Label style={[styles(theme).label, languageSelected === language ? {color: theme.colors.primary_500, fontWeight: 'bold', fontSize: 18} : null]}>
                {t('language_' + language)}
              </Label>
              {/* <RadioButton selected={languageSelected === language} /> */}
            </View>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = theme =>
  StyleSheet.create({
    content: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    back: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 16,
    },
    title: {
      fontWeight: '700',
      fontSize: 22,
      lineHeight: 31,
      margin: 16,
    },
    selected: {
      fontWeight: 'bold',
    },
    label: {
      flex: 1,
    },
    text: {
      /* color: 'black' */
    },
    option: {
      flexDirection: 'row',
      padding: 10,
    },
  });
