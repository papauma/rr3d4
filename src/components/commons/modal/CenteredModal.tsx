import { Dimensions, Modal,ScrollView,StyleProp,StyleSheet,TouchableOpacity,View, ViewStyle } from "react-native";
import Label from "../text/Label";
import Button from "../buttons/Button";
import { useTheme } from "@src/context/themeContext";
import Icon from "../icon/Icon";

interface CenteredModalProps {
    visible: boolean;
    setViewModal: Function;
    title?: string;
    description?: string;
    button1?: string; //texto del botón 1
    button2?: string; //texto del botón 2
    showCloseButton?: boolean;
    disabledButton1?: boolean; //deshabilitación del primer botón
    onPressButton1?: Function;
    onPressButton2?: Function;
    animationType?: any;
    modalViewStyle?: StyleProp<ViewStyle>;
    style?: any;
    children?: any;
  }
  
  export default function CenteredModal({
    visible,
    setViewModal,
    title,
    description,
    button1,
    button2,
    showCloseButton,
    disabledButton1,
    onPressButton1,
    onPressButton2,
    style,
    animationType,
    modalViewStyle,
    children,
  }: CenteredModalProps) {
   const theme = useTheme();

    return (
      <Modal visible={visible} animationType={animationType ?? 'slide'} transparent={true}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {backgroundColor: theme.colors.white}, modalViewStyle]}>
            <ScrollView style={[{padding: 16,}, style?.scrollView]}>
            {showCloseButton 
                ? (<TouchableOpacity style={styles.closeButton} onPress={() => setViewModal?.()}>
                    <Icon source={theme.drawables.general.Ic_Close}/>
                </TouchableOpacity>) 
                : null
            }
            {title ? <Label style={[styles.title, style?.title]}>{title}</Label> : null}
            {description ? <Label style={styles.description}>{description}</Label> : null}
            {children}
            {(button1 || button2) && (
              <View style={[styles.buttons, style?.buttons]}>
                {button2 && (
                  <Button
                    style={{flexShrink: 1, flexGrow: 1,}}
                    title={button2}
                    buttonCategory="tertiary"
                    onPress={() => {
                      onPressButton2?.();
                    }}
                  />
                )}
                {button1 && (
                  <Button
                    style={[{flexShrink: 1, flexGrow: 1,}, button2 ? {marginLeft: 8} : null]}
                    buttonCategory="primary"
                    title={button1}
                    disabled={disabledButton1}
                    onPress={() => {
                      onPressButton1?.();
                    }}
                  />
                )}
              </View>
            )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
  
  const styles = StyleSheet.create({
    title: {
      fontSize: 18,
      fontWeight: '700',
      lineHeight: 23.4,
      alignSelf: 'flex-start',
    },
    description: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 21,
      marginBottom: 40,
      marginTop: 16,
      alignSelf: 'flex-start',
    },
    buttons: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    button: {
      //width: '100%',
      flex: 1,
      borderRadius: 4,
      paddingVertical: 12,
    },
    button1: {},
    button2: {
      marginRight: 8,
    },
    centeredView: {
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      //paddingHorizontal: 16,
      flex: 1,
      zIndex: 300,
    },
    modalView: {
      maxHeight: Dimensions.get('window').height * 0.8,
      width: Dimensions.get('window').width - 32,
      //justifyContent: 'center',
      //alignItems: 'center',
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginBottom: 8,
    },
  });