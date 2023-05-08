import { IMapMarker } from '../../../types/interfaces';
import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { Callout, Marker } from 'react-native-maps';


export default function MapMarker(props: IMapMarker) {
  //console.log('[MapMarker] - PreuseMemo?? '+ props.width);
  const marker = useMemo(() => {
    //console.log('[MapMarker] - useMemo Markers '+ props.width);
    let properties = {
      onPress: props.onPress,
      coordinate: props.position,
      title: props.title,
      accessibilityHint: props.accessibilityHint,
      width: props.width,
      height: props.height,
      tracksViewChanges: props.tracksViewChanges,
      accessibilityLabel: props.accessibilityLabel,
      anchor: props.anchor,
      onDragEnd: (e) => props.onDragEnd?.(e, props.position),
    };

    if (props.draggable) {
      return (
        <Marker accessible={true}  draggable {...properties}>
          {props?.content}
        </Marker>
      );
    } else {
      return (
        <Marker accessible={true} /* width={40} height={39} */ {...properties}>
          {props?.content}
          {props.disableTooltip ? (
            <Callout tooltip={true}>
              <View style={{backgroundColor: 'transparent'}} />
            </Callout>
          ) : undefined}
        </Marker>
      );
    }
  }, [props.position, props.tracksViewChanges, props.draggable, props?.width, props?.height, props.disableTooltip]);
  return <>{marker}</>;
}
