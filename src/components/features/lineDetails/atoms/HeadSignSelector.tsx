import Button from '@src/components/commons/buttons/Button';
import Icon from '@src/components/commons/icon/Icon';
import {Menu} from '@src/components/commons/menu/Menu';
import {MenuItem} from '@src/components/commons/menu/MenuItem';
import Label from '@src/components/commons/text/Label';
import {ThemeProps, useTheme} from '@src/context/themeContext';
import {updatelineInfo} from '@src/redux/slices/lineInfoSlice';
import React, {useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';

interface HeadSignSelectorProps {
  directionId?: number;
  sentidoOptions?: any;
  headsign?: string;
  lineId?: number;
}

/* TO DO */
export default function HeadSignSelector(props: HeadSignSelectorProps) {
  const theme = useTheme();
  const [showList, setShowList] = useState(false);
  const dispatch = useDispatch();

  console.log('Option', props.sentidoOptions);

  return (
    <View style={styles(theme).container}>
      <View style={{flexGrow: 1, flexShrink: 1}}>
        <TouchableOpacity
          style={[styles(theme).row]}
          onPress={() => setShowList(!showList)}>
          {props.headsign ?<Label style={styles(theme).name}>
            {props.headsign}
          </Label> : null}
          <Icon
            style={{marginLeft: 4, flexShrink: 1}}
            source={
              showList
                ? theme.drawables.general.Ic_Chevron_Up
                : theme.drawables.general.Ic_Chevron_Down
            }
          />
        </TouchableOpacity>
        <Menu
          visible={showList}
          anchor={<View style={{flexGrow: 1}}/>}
          onRequestClose={() => setShowList(false)}>
          {props.sentidoOptions.map((element: any, index: number) => {
            return (
              <MenuItem
                key={`s-${index}`}
                textStyle={styles(theme).name}
                style={[styles(theme).menuItem, index === 0 ? {borderTopWidth: 0} : null]}
                onPress={() =>
                  dispatch(
                    updatelineInfo({id: props.lineId, tripId: element.value}),
                  )
                }>
                {element.txt}
              </MenuItem>
            );
          })}
        </Menu>
      </View>
      <Button
        buttonCategory="tertiary"
        icon={theme.drawables.general.Ic_Arrows}
        style={{marginLeft: 8,}}
      />
    </View>
  );
}

const styles = (theme: ThemeProps) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 12,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray_300,
      flexGrow: 1,
    },
    name: {
      color: theme.colors.gray_700,
      fontWeight: '400',
      lineHeight: 24,
      fontSize: 16,
      textTransform: 'capitalize'
    },
    menuItem: {
        paddingHorizontal: 16,
        paddingVertical: 9.5,
        borderTopWidth: 1,
        borderTopColor: theme.colors.gray_300,
        width: Dimensions.get('window').width - 32 - 48
    }
  });
