import BottomSheetContent from '@src/components/commons/bottomSheet/BottomSheetContent'
import React, { useMemo } from 'react'
import { View } from 'react-native';
import { Dimensions } from 'react-native';
import RouteTimeInfo from '../../result/atoms/RouteTimeInfo';
import RouteLegs from '../../result/molecules/RouteLegs';
import { useTheme } from '@src/context/themeContext';
import { useTranslate } from '@src/context/languageContext';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import RouteSynoptic from './RouteSynoptic';

interface RouteDetailsBottomSheetContentProps {
  route?: any;
}

export default function RouteDetailsBottomSheetContent(props: RouteDetailsBottomSheetContentProps) {
  const theme = useTheme();
  const t = useTranslate();

    const snapPoints = useMemo(() => {
        return [
          Dimensions.get('window').height * 0.22,
          Dimensions.get('window').height * 0.6,
          Dimensions.get('window').height * 0.7,
        ];
      }, []);

  return (
    <BottomSheetContent
        enablePanDownToClose={false}
        initial={0}
        snapPoints={snapPoints}
    >
        <View style={{ flex: 1 }}>
          <View style={{padding: 16, display: 'flex',flexShrink: 1,}}>
            <RouteTimeInfo
                duration={props.route?.duration}
                startTime={props.route?.startTime }
                endTime={props.route?.endTime}
                styleHours={{fontWeight: '400', fontSize: 14, lineHeight: 21}}
                styleLetter={{ fontSize: 16, lineHeight: 24, fontWeight: '600' }}
                styleBigNumber={{ fontSize: 24, lineHeight: 31.2 }}
                warning={props.route?.alert}
            />
            <RouteLegs legs={props.route?.legs} duration={props.route?.duration} />
          </View>
          <View style={{flex: 1, backgroundColor: theme.colors.gray_200, padding: 16}}>
            <BottomSheetScrollView>
              {props.route?.legs ? <RouteSynoptic legs={props.route?.legs}/> : null}
            </BottomSheetScrollView>
          </View>
        </View>
    </BottomSheetContent>
  )
}
