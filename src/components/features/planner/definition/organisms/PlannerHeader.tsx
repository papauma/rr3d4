import { useNavigation } from '@react-navigation/native';
import ScreenTitle from '@src/components/commons/text/ScreenTitle';
import { useTranslate } from '@src/context/languageContext';
import { useTheme } from '@src/context/themeContext';
import React from 'react'
import RouteSegments from '../molecules/RouteSegments';
import { navigationPages } from '@src/utils/constants';
import { View } from 'react-native';
import ConfigurationPlannerFilters from '../molecules/ConfigurationPlannerFilters';

interface PlannerHeaderProps {
    showFavoriteButton?: boolean;
    notShowBackButton?: boolean;
}

export default function PlannerHeader(props: PlannerHeaderProps) {
  const t = useTranslate();
  const theme = useTheme()
  const navigation = useNavigation();

  return (
    <>
        <ScreenTitle
                    title={t('planner_screen_title')}
                    notShowBackButton={props.notShowBackButton}
                />
            <RouteSegments
               showFavoriteButton={props.showFavoriteButton}
                onSegmentPress={(index: number) => {
                    navigation.navigate(navigationPages.search, {
                    previousScreenParams: { screen: 'Planner', index: index },
                    showSelectLocation: true,
                    showSelectMyLocation: true,
                    });
                }}
                style={{
                    segment: {
                    input: { /* flexBasis: 80,  */flexGrow: 0 },
                    paddingHorizontal: 7.5,
                    margin: 0,
                    },
                    flexGrow: 0,
                    paddingHorizontal: 16,
                }}
                /> 
            <View style={{flexDirection: 'row', paddingHorizontal: 16, marginTop: 8}}>
                <ConfigurationPlannerFilters/>
            </View>
    </>
  )
}
