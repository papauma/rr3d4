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
              {'No se han encontrado resultados'}
            </Label>
            <Label>
              {
                'Si desea obtener una planificación modifique las preferencias o los puntos de salida o llegada'
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

  const renderRoute = ({ item }) => {
    return (
      <RouteCard
        key={item.id}
        index={item.id}
        route={item}
        plan={props.plan}
        onPressCard={(selectedIndex: number) => onPressCard(selectedIndex)}
      />
    );
  };

  return (
    <FlatList
      //accessibilityLabel='Listado de itinerarios planificados'
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
