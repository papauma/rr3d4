import React, {useState} from 'react';
import {IBottomSheet} from '../../../types/interfaces';
import {useCallback} from 'react';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {View} from 'react-native';
import Icon from '../icon/Icon';
import {useTheme} from '@src/context/themeContext';
import HandleBottomSheet from './HandleBottomSheet';
import { useSharedValue } from 'react-native-reanimated';

/* Todo lo contenido dentro del bottomsheet puede utilizar el hook useBottomSheet(); */
export default function BottomSheetContent(props: IBottomSheet) {
  const theme = useTheme();
  const [position, setPosition] = useState(0);
  const animatedIndex = useSharedValue(0);

  const handleComponent = () => {
    return (
      <View style={{}}>
        {props.topContent}
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Icon
            source={
              position > 1
                ? theme.drawables.general.Ic_Chevron_Down
                : theme.drawables.general.Ic_Chevron_Up
            }
            tint={theme.colors.gray_400}
          />
        </View>
      </View>
    );
  };

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
        opacity={0.65}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      // ref={ref}
      accessible={true}
      //accessibilityLabel={'Control deslizante de información'}
      index={props.initial}
      animatedIndex={animatedIndex}
      snapPoints={props.snapPoints ?? [10, 200]} // LIMITES DEL BOTTOMSHEET
      enableContentPanningGesture={props.enableContentPanningGesture ?? true} // BLOQUEAR INTERACCION
      enableHandlePanningGesture={props.enableHandlePanningGesture ?? true} // BLOQUEAR INTERACCION
      onChange={(index: number) => {
        setPosition(index);
        props.onChange?.(index);
      }} // DESLIZAMIENTO DE LA POSICION CON EL DEDO
      handleComponent={() => (<HandleBottomSheet topContent={props.topContent} style={{}} animatedIndex={animatedIndex}/>)} // CABECERA DE BOTTOM SHEET
      enablePanDownToClose={props.enablePanDownToClose ?? true} // PERMITIR CIERRE COMPLETO
      backdropComponent={renderBackdrop}
      onAnimate={props.onAnimate}>
      {props.children}
    </BottomSheet>
  );
}
