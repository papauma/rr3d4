import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Label from '@src/components/commons/text/Label';
import { useTranslate } from '@src/context/languageContext';
import { navigationPages } from '@src/utils/constants';
import { plannerSlice } from '@src/redux/slices/plannerSlice';
import RouteCard from '../molecules/RouteCard';

interface RouteCardsGroupProps {
  plan?: any;
  isFavorite?: boolean;
}

export default function RouteCardsGroup(props: RouteCardsGroupProps) {
  //TO CHANGE
  const favorites = {};
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const t = useTranslate()

  //TO CHANGE textos
  const renderEmpty = () => {
    return (
      <>
        {props.isFavorite && favorites?.agencyId?.length === 0 ? null : (
          <View style={styles().empty}>
            <Label style={{ marginBottom: 12, fontWeight: '700' }}>
              {t('planner_result_empty_title')}
            </Label>
            <Label>
              {
                t('planner_result_empty_desc')
              }
            </Label>
          </View>
        )}
      </>
    );
  };

  function onPressCard(index: number) {
    dispatch(plannerSlice.actions.updateSelectedPlan(index));
    navigation.navigate(navigationPages.routeDetails);
  }

  const renderRoute = ({ item, index }) => {
    return (
      <RouteCard
        key={item.id}
        index={item.id}
        first={index === 0}
        route={item}
        plan={props.plan}
        onPressCard={(selectedIndex: number) => onPressCard(selectedIndex)}
      />
    );
  };

  return (
    <FlatList
      accessibilityLabel={t('accessibility_planner_result_cards')}
      data={props.plan}
      renderItem={renderRoute}
      ItemSeparatorComponent={() => <View style={{ marginBottom: 8 }} />}
      ListEmptyComponent={renderEmpty}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = () =>
  StyleSheet.create({
    empty: {
      padding: 24,
    },
  });
