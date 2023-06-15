import Icon from '@src/components/commons/icon/Icon';
import Loading from '@src/components/commons/loading/Loading';
import {Menu} from '@src/components/commons/menu/Menu';
import {MenuItem} from '@src/components/commons/menu/MenuItem';
import Label from '@src/components/commons/text/Label';
import ScreenTitle from '@src/components/commons/text/ScreenTitle';
import AlertInfo from '@src/components/features/alerts/molecules/AlertInfo';
import {useLanguage, useTranslate} from '@src/context/languageContext';
import {ThemeProps, useTheme} from '@src/context/themeContext';
import {useLazyGetAlertsQuery} from '@src/redux/services/alertService';
import {
  contextualInformation,
  contextualSlice,
} from '@src/redux/slices/contextualSlice';
import {lineState} from '@src/redux/slices/linesSlices';
import {stopsState} from '@src/redux/slices/stopsSlices';
import {IMarker} from '@src/types/interfaces';
import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaView, SectionList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export default function AlertsScreen() {
  const t = useTranslate();
  const theme = useTheme();
  const locale = useLanguage();
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  //por defecto todos los avisos
  const [selectedFilters, setSelectedFilters] = useState(3);
  const [listAlertas, setListAlertas] = useState([]) as any;
  const selectorStops = useSelector(stopsState);
  const selectorLines = useSelector(lineState);
  const contextualInfo = useSelector(contextualInformation);
  const dispatch = useDispatch();

  const [getAlerts] = useLazyGetAlertsQuery();

  console.log('Lista', listAlertas);

  useEffect(() => {
    async function getAlertsFromApi() {
      dispatch(contextualSlice.actions.updateShowLoading(true));
      getAlerts()
        .then(alertas => {
          if (alertas.isSuccess) {
            if (alertas.data.length > 0) {
              const alertasParadas = alertas.data.map(alert => {
                const stops: Array<IMarker> = alert.paradas.map(parada => {
                  return selectorStops.find(st => st.id === parada.idParada);
                });
                const cleanedStops = stops.filter(stop => stop !== undefined);

                const lineas = alert.lineas.map(linea => {
                  return selectorLines.find(ln => ln.id === linea.idLinea);
                });
                const cleanedLineas = lineas.filter(
                  linea => linea !== undefined,
                );

                return {
                  ...alert,
                  transportMode: stops[0]
                    ? stops[0]?.data?.transportMode
                    : lineas[0]?.transportmode,
                  paradas: cleanedStops,
                  lineas: cleanedLineas,
                };
              });
              setListAlertas(alertasParadas);
            }
          }
        })
        .finally(() => {
          dispatch(contextualSlice.actions.updateShowLoading(false));
        });
    }

    getAlertsFromApi();
  }, [locale]);

  const sectionsAlerts = useMemo(() => {
    let filteredSections = [];

    let myAlerts = {
      title: t('alerts_sections_favorites'),
      data: [],
    };

    let generalAlerts = {
      title: t('alerts_sections_general'),
      data: listAlertas,
    };

    if (selectedFilters === 3) {
      filteredSections.push(myAlerts);
      filteredSections.push(generalAlerts);
    } else if (selectedFilters === 1) {
      filteredSections.push(myAlerts);
    } else {
      filteredSections.push(generalAlerts);
    }

    return filteredSections;
  }, [selectedFilters, listAlertas]);

  function renderAlert(item: any, index: number, section: any) {
    let length = section.data.length - 1;

    return (
      <AlertInfo
        key={`${item.idAlerta}-${index}`}
        title={/* item?.titulo */ 'Cambio de recorrido'}
        alertId={item.idAlerta}
        lines={item.lineas}
        stops={item?.paradas}
        startTime={item?.fechas[0]}
        style={
          index === 0
            ? {borderTopStartRadius: 16, borderTopEndRadius: 16}
            : index === length
            ? {
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
                borderTopWidth: 1,
                borderColor: theme.colors.gray_300,
              }
            : {borderTopWidth: 1, borderColor: theme.colors.gray_300}
        }
      />
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScreenTitle
        title={t('notices')}
        showThirdButton={true}
        onPressOptionalButton={() => setShowFilterMenu(!showFilterMenu)}
        childrenThirdButton={
          <View style={styles(theme).button}>
            <Icon source={theme.drawables.general.Ic_filters} />
            <Menu
              visible={showFilterMenu}
              onRequestClose={() => setShowFilterMenu(false)}
              anchor={<View />}>
              <MenuItem style={[styles(theme).menuItem]}>
                {t('alerts_sections_favorites')}
              </MenuItem>
              <MenuItem
                style={[styles(theme).menuItem, styles(theme).centerMenuItem]}>
                {t('alerts_sections_general')}
              </MenuItem>
              <MenuItem style={styles(theme).menuItem}>
                {t('alerts_sections_all')}
              </MenuItem>
            </Menu>
          </View>
        }
      />
      <View style={{flex: 1, paddingHorizontal: 16, paddingBottom: 16}}>
        {contextualInfo.showLoading ? (
          <Loading />
        ) : (
          <SectionList
            sections={sectionsAlerts}
            renderItem={({item, index, section}) =>
              renderAlert(item, index, section)
            }
            renderSectionHeader={({section: {title}}) => {
              return (
                <Label
                  style={{
                    color: theme.colors.gray_700,
                    textTransform: 'uppercase',
                    fontSize: 16,
                    fontWeight: '700',
                    lineHeight: 20.8,
                    marginVertical: 24,
                  }}>
                  {title}
                </Label>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = (theme: ThemeProps) =>
  StyleSheet.create({
    button: {
      backgroundColor: theme.colors.white,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
    },
    menuItem: {
      paddingVertical: 9.5,
      paddingHorizontal: 18,
    },
    centerMenuItem: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors.gray_300,
    },
    topMenuItem: {
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
    },
    sectionGroup: {},
    alert: {
      backgroundColor: theme.colors.white,
    },
  });
