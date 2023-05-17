import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Label from '../../../../commons/text/Label';
import { useTheme } from '@src/context/themeContext';
import { useTranslate } from '@src/context/languageContext';
import Icon from '@src/components/commons/icon/Icon';

interface CollapseStopsProps {
  intermediateStops?: any;
  duration: any;
  color: any;
  setCollapsed: Function;
  collapsed?: boolean;
}

export default function CollapseStops(props: CollapseStopsProps) {
  let collapsed = props.collapsed;
  const theme = useTheme();
  const t = useTranslate();

  const renderStops = () => {
    let result: Array<any> = [];
    for (let i = 0; i < props.intermediateStops?.length; i++) {
      result.push(
        <View style={styles.row} key={'stop' + i}>
          <Label style={styles.text} key={props.intermediateStops[i].stopId}>
            {props.intermediateStops[i].name.toLowerCase()}
          </Label>
        </View>,
      );
    }
    return result;
  };

  const onCollapse = () => {
    props.setCollapsed();
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => onCollapse()}>
        <Icon
          source={
            collapsed
              ? theme.drawables.general.Ic_Chevron_Up
              : theme.drawables.general.Ic_Chevron_Down
          }
        />
        <Label style={styles.title}>
          {`${props.intermediateStops?.length} Paradas`}
          </Label>
      </TouchableOpacity>
      {collapsed && <View style={styles.container}>{renderStops()}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    marginLeft: 20,
    //marginTop: 19,
    marginBottom: 13.5,
  },
  title: {
    marginLeft: 8,
    color: '#5F6262',
    fontSize: 14,
    fontWeight: '600',
  },
  text: {
    fontSize: 12,
    fontWeight: '400',
    marginLeft: 18,
    textTransform: 'capitalize',
  },
  container: {
    marginTop: 12.5,
  },
  smallCircle: {
    //borderWidth: 1,
    borderStyle: 'solid',
    width: 14,
    height: 8,
    marginLeft: -27,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 500,
    //position: 'relative',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
});
