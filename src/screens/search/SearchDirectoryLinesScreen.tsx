import InputBar from '@src/components/commons/input/InputBar';
import LineCodeSemiCircle from '@src/components/commons/routeCode/LineCodeSemiCircle';
import Label from '@src/components/commons/text/Label';
import ScreenTitle from '@src/components/commons/text/ScreenTitle';
import {useTranslate} from '@src/context/languageContext';
import {useTheme} from '@src/context/themeContext';
import {lineState} from '@src/redux/slices/linesSlices';
import {ILine} from '@src/types/ExploreInterfaces';
import React, {useState} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import {useSelector} from 'react-redux';

export default function SearchDirectoryLinesScreen() {
  const t = useTranslate();
  const theme = useTheme();
  const [searchLine, setSearchLine] = useState('');
  const allLines = useSelector(lineState);

  function renderLine({item, index}: {item: ILine; index: number}) {
    return (
      <View
        accessible={true}
        style={[
          {flexDirection: 'row', alignItems: 'center', padding: 8},
          index !== 0
            ? {borderTopWidth: 1, borderTopColor: theme.colors.gray_300}
            : undefined,
        ]}>
        <LineCodeSemiCircle
          transportMode={item.transportmode}
          backgroundColor={item.routeColor ? `#${item.routeColor}` : undefined}
          textColor={
            item.routeTextColor ? `#${item.routeTextColor}` : undefined
          }
          code={item.code}
        />
        {item.name ? (
          <Label
            style={{
              textTransform: 'capitalize',
              marginLeft: 8,
              fontSize: 14,
              fontWeight: '400',
              lineHeight: 21,
              flex: 1,
            }}>
            {item.name}
          </Label>
        ) : null}
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}} >
      <ScreenTitle title={t('search_directories_lines_title')} />
      <View style={{flex: 1, paddingHorizontal: 16, paddingBottom: 16}}>
        <InputBar
          styleBar={{marginBottom: 16}}
          placeholder={t('search_directories_lines_bar')}
          value={searchLine}
          showLens={true}
          onChangeText={setSearchLine}
        />
        <FlatList
          accessibilityRole='list'
          accessibilityLabel={t('accessibility_directory_lines')}
          data={
            searchLine
              ? allLines.filter(
                  (element: ILine) =>
                    element.name
                      .toLowerCase()
                      .includes(searchLine.toLowerCase()) ||
                    element.code
                      .toLowerCase()
                      .includes(searchLine.toLowerCase()),
                )
              : allLines
          }
          renderItem={renderLine}
          keyExtractor={(item: ILine) => '' + item.id}
        />
      </View>
    </SafeAreaView>
  );
}
