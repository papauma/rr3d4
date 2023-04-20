import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, View, Text } from 'react-native';


const navLinks = [
  {
    id: 1,
    text: 'Home',
    link: 'Main',
  },
  {
    id: 2,
    text: 'Planificar',
    link: 'WhereToGo',
  },
  {
    id: 3,
    text: 'Transporte',
    link: 'Transports',
  },
  {
    id: 5,
    text: 'Ajustes',
    link: 'Settings',
  },
];


const NavbarX = () => {
  console.log('[NavBar]');
  const navigation = useNavigation();

  return (
    <View accessible={true} accessibilityLabel="Barra de navegación" role="listitem">
      <View>
        {navLinks.map((i, index) => {
          return (
            <View key={`v${index}`} >
              <Pressable
                onPress={() => {
                  /* if (i.link !== navigation.getState().routes[0].name) {
                    navigation.reset({ index: 0, routes: [{ name: i.link }] });
                    //dispatch(navigationSlice.actions.updateScreen(i.id));
                  } */
                }}
              >
                <Text>{i.text}</Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const Navbar = React.memo(NavbarX);
export default Navbar;
