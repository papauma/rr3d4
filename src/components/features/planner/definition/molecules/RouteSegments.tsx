import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  plannerSegmentsInformation,
  plannerSegmentsSlice,
} from '../../../../../redux/slices/plannerSegmentsSlice';
import {
  plannerTimerInformation,
  PlannerTimerInformation,
  plannerTimerSlice,
} from '../../../../../redux/slices/plannerTimerSlice';
import { random } from '../../../../../utils/StringUtils';
import { IMarker } from '@src/types/interfaces';
import Button from '@src/components/commons/buttons/Button';
import { useTheme } from '@src/context/themeContext';
import RouteSegment from '../atoms/RouteSegment';
import AddFavoritePlanButton from './AddFavoritePlanButton';
import { useTranslate } from '@src/context/languageContext';

interface RouteSegmentsProps {
  style?: any;
  backgroundColor?: string;
  onSegmentPress?: Function;
  notShowButton?: boolean;
  showFavoriteButton?: boolean;
  disableActions?: boolean;
  separatorStyle?: any;
  planningId?: string;
}

export default function RouteSegments({
  style,
  backgroundColor,
  onSegmentPress,
  notShowButton,
  showFavoriteButton,
  disableActions,
  separatorStyle,
  planningId,
}: RouteSegmentsProps) {
  const dispatch = useDispatch();
  const segments: Array<any> = useSelector(plannerSegmentsInformation);
  const plannerTimerInfo: PlannerTimerInformation = useSelector(plannerTimerInformation);

  const theme = useTheme();
  const t = useTranslate();
  

  const onRouteActionPress = (index: number, segment: IMarker | undefined) => {
    /* Si index es 0 indica que es el botón de cambiar origen-destino */
    if (index === 0) {
      dispatch(plannerSegmentsSlice.actions.swap());
    } else if (index === segments.length - 1) {
      /* Si el index es el último indica que se añade una parada */
      dispatch(
        plannerSegmentsSlice.actions.set({
          index: index,
          stop: null,
          overwrite: true,
        }),
      );
    } else {
      dispatch(plannerSegmentsSlice.actions.delete(index));
      //Se borra el tiempo asociado
      let copyStopTimes = JSON.parse(JSON.stringify(plannerTimerInfo.intermediateStopTimes));
      copyStopTimes.splice(index - 1, 1);
      dispatch(plannerTimerSlice.actions.updateIntermediateStopTimes(copyStopTimes));
    }
  };

  const onIconDeletePress = (index: number) => {
    dispatch(
      plannerSegmentsSlice.actions.set({
        index: index,
        stop: null,
      }),
    );
  };

  const renderSegment = ({ index, item: segment }: {index: number, item: IMarker | undefined}) => {
    //TO CHANGE
    let length = segments.length - 1;

    /* Si se encuentra un segment en la posición 0, renderizará el botón de cambiar origen-destino si no hay paradas intermedias */
    /* let showAction =
      index === 0 ? segments.length === 2 : index === 4 ? false : true; */
    let actionIcon =
      index === 0
        ? segment?.data?.name === 'Tu ubicación'
          ? theme.drawables.general.Ic_Point_MyLocation
          : theme.drawables.general.Ic_Point_MyLocation
        : index === length
        ? theme.drawables.general.Ic_Point_Dest
        : theme.drawables.general.Ic_Point_MyLocation;
    let placeholder = index === 0 ? t('planner_segments_origin_placeholder') : t('planner_segments_destination_placeholder')

    return (
      <RouteSegment
        key={random()}
        style={[style?.segment]}
        backgroundColor={backgroundColor}
        icon={actionIcon}
        altIcon={index === 0 
            ? t('planner_segments_origin') 
            : t('planner_segments_destination')}
        onPress={() => {
          if (!disableActions) {
            onSegmentPress?.(index);
          }
        }}
        name={segment?.data?.name ? segment?.data?.name : undefined}
        //showAction={showAction}
        onActionPress={() => {
          if (!disableActions) {
            onRouteActionPress(index, segment);
          }
        }}
        onIconDeletePress={() => {
          if (!disableActions) {
            onIconDeletePress(index);
          }
        }}
        placeholder={placeholder}
      />
    );
  };

  return (
    <View style={[styles.content, style]}>
      <FlatList
        data={segments}
        renderItem={renderSegment}
        scrollEnabled={false}
        keyExtractor={(item) => random()}
        ItemSeparatorComponent={() => <View style={[{ marginTop: 8 }, separatorStyle]} />}
      />
      <View style={{flexShrink: 1, marginLeft: 8}}>
        {!notShowButton ? (
          <Button
            buttonCategory='secondary'
            accessibilityLabel={t('accessibility_planner_segments_change')}
            accessibilityHint={t('accessibility_planner_segments_change_desc')}
            icon={theme.drawables.general.Ic_Arrows}
            style={[style?.button]}
            onPress={() => {
              dispatch(plannerSegmentsSlice.actions.swap());
            }}
          />
        ) : null}
        {showFavoriteButton && <AddFavoritePlanButton planningId={planningId} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
