import { IBottomSheet } from '../../../types/interfaces';
import { useCallback } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { View } from 'react-native';

/* Todo lo contenido dentro del bottomsheet puede utilizar el hook useBottomSheet(); */
export default function BottomSheetContent(props: IBottomSheet) {
  const handleComponent = () => {
    return (
      <View style={/* styles.bottomSheet.bottomSheetHandle */ {}} accessible={true} accessibilityLabel={'Control deslizante de información'} accessibilityHint='Desliza con los dos dedos hacia arriba o hacia abajo para mostrar mas información'>
        <View style={/* styles.bottomSheet.bottomSheetHandle */ {}}>
          {/* <PngIcon alt='Icono control deslizante' style={styles.bottomSheet.bottomSheetHandleIcon} source={images.Up} /> */}
        </View>
      </View>
    )
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
    []
  );

  return (
    <BottomSheet
      // ref={ref}
      accessible={true}
      accessibilityLabel={'Control deslizante de información'}
      index={props.initial}
      snapPoints={props.snapPoints ?? [10, 200]} // LIMITES DEL BOTTOMSHEET
      enableContentPanningGesture={props.enableContentPanningGesture ?? true} // BLOQUEAR INTERACCION
      enableHandlePanningGesture={props.enableHandlePanningGesture ?? true} // BLOQUEAR INTERACCION
      onChange={props.onChange} // DESLIZAMIENTO DE LA POSICION CON EL DEDO
      handleComponent={handleComponent} // CABECERA DE BOTTOM SHEET
      enablePanDownToClose={props.enablePanDownToClose ?? true} // PERMITIR CIERRE COMPLETO
      backdropComponent={renderBackdrop}
    >
      {props.children}
    </BottomSheet>
  );
}
