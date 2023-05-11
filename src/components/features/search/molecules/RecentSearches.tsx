import Label from "@src/components/commons/text/Label";
import { useTranslate } from "@src/context/languageContext";
import { ThemeProps, useTheme } from "@src/context/themeContext";
import { recentSearchInformation, searchRecentsSlice } from "@src/redux/slices/searchRecentsSlice";
import { stopsState } from "@src/redux/slices/stopsSlices";
import { transportModeState } from "@src/redux/slices/transportmodeSlices";
import { TypeMarker } from "@src/types/ExploreInterfaces";
import { IMarker, ITransportMode } from "@src/types/interfaces";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SearchItem from "../atoms/SearchItem";
import IconBox from "@src/components/widgets/IconBox";


export default function RecentSearches(props: any) {
    const searchRecent: Array<IMarker> = useSelector(recentSearchInformation);
    const t = useTranslate();
    const theme = useTheme();
    console.log('Rcents', searchRecent);
    
  
    const dispatch = useDispatch();
    const stopsModifyState = useSelector(stopsState);
  
    const selectorTransportModes = useSelector(transportModeState);
  
    const onPress = (recent: IMarker) => {
      props?.onPressResult?.(recent);
    };
  
    const renderItem = (item: IMarker, index: number) => {
      let staticIcon;
      let iconId;
  
      if (item.markerType === TypeMarker.Stop) {
        //comprobación modo de transporte
        const transportMode = selectorTransportModes.find(
          (transportMode: ITransportMode) => transportMode.id === parseInt(item?.data?.transportMode),
        );
        iconId = transportMode?.iconId;
        //comprobación de si esa stop se ha eliminado de base de datos
        let foundStopInAllStops: IMarker = stopsModifyState.find(
          (stop: any) => String(stop.id) === String(item.id),
        );
        if (!foundStopInAllStops) {
          dispatch(searchRecentsSlice.actions.deleteRecent(index));
          return;
        }
        if (
          foundStopInAllStops?.data?.name !== item?.data?.name ||
          foundStopInAllStops?.data?.address !== item?.data?.address ||
          foundStopInAllStops?.data?.agencyOriginId !== item?.data?.agencyOriginId
        ) {
          dispatch(
            searchRecentsSlice.actions.modifyRecent({
              index: index,
              marker: foundStopInAllStops,
            }),
          );
        }
        return (<SearchItem
          key={`stop-${item.id}`}
          style={{marginTop: 12}}
          onPress={() => {onPress(item)}}
          name={item?.data?.name}
          address={item?.data?.address}
          iconComponent={(<IconBox
            code={item?.data?.code}
            iconId={transportMode?.iconId}
          />)}
        />)
        

      } else {

      }
  
      const nameResult= item?.data?.name;
  
      /* <SearchItem
          key={item.id}
          typeMarker={item.markerType}
          name={nameResult}
          address={item?.data?.address}
          iconId={iconId}
          staticIcon={staticIcon}
          onPress={() => onpress(item)}
        /> */

      return undefined;
        
      
    };
  

    //TO CHANGE
    return (
      <View style={styles(theme).container}>
        <Label style={styles(theme).title}>{t('search_recents_title')}</Label>
        {searchRecent?.length > 0 ? (
            <>{searchRecent.map((element: IMarker, index: number) => renderItem(element, index))}</>
        ) : (
            <Label style={styles(theme).emptyDesc}>
              {t('search_recents_empty')}
            </Label>
        )}
      </View>
    );
}

const styles = (theme: ThemeProps) => StyleSheet.create({
    container: {
        marginLeft: 16, 
        marginRight: 16, 
        marginTop: 24
    },
    title: {
      textTransform: 'uppercase',
      color: theme.colors.gray_700,
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 20.8,
    },
    emptyDesc: {
        color: theme.colors.gray_800,
        fontSize: 14,
        fontWeight: '400', 
        lineHeight: 21,
        paddingHorizontal: 16,
        marginTop: 5.5,
    }
})