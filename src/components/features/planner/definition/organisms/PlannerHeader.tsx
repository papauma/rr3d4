import {useNavigation} from '@react-navigation/native';
import ScreenTitle from '@src/components/commons/text/ScreenTitle';
import {useTranslate} from '@src/context/languageContext';
import {useTheme} from '@src/context/themeContext';
import React from 'react';
import RouteSegments from '../molecules/RouteSegments';
import {navigationPages} from '@src/utils/constants';
import {View} from 'react-native';
import ConfigurationPlannerFilters from '../molecules/ConfigurationPlannerFilters';
import Label from '@src/components/commons/text/Label';

interface PlannerHeaderProps {
  showFavoriteButton?: boolean;
  notShowBackButton?: boolean;
}

export default function PlannerHeader(props: PlannerHeaderProps) {
  const t = useTranslate();
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <>
      {props.notShowBackButton ? (
        <Label
          style={{
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '700',
            lineHeight: 23.4,
            //textAlign: 'center',
            overflow: 'hidden',
            flex: 1,
            paddingVertical: 20,
            paddingHorizontal: 16,
            paddingBottom: 30,
          }}>
          {t('planner_screen_title')}
        </Label>
      ) : (
        <ScreenTitle
          title={t('planner_screen_title')}
          notShowBackButton={props.notShowBackButton}
        />
      )}

      <RouteSegments
        showFavoriteButton={props.showFavoriteButton}
        onSegmentPress={(index: number) => {
          navigation.navigate(navigationPages.search, {
            previousScreenParams: {screen: 'Planner', index: index},
            showSelectLocation: true,
            showSelectMyLocation: true,
          });
        }}
        style={{
          segment: {
            input: {flexGrow: 0},
            paddingHorizontal: 16,
            margin: 0,
          },
          flexGrow: 0,
          paddingHorizontal: 16,
        }}
      />
      <View style={{flexDirection: 'row', paddingHorizontal: 16, marginTop: 8}}>
        <ConfigurationPlannerFilters />
      </View>
    </>
  );
}
