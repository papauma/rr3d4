import React from 'react';
import { Pressable, View, Text } from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import { useTheme } from '@src/context/themeContext';

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


const NavbarX = ({ state, descriptors, navigation }) => {
  console.log('[NavBar]');
  const theme = useTheme();

  return (
    <View accessible={true}
          accessibilityLabel="Barra de navegación"
          role="listitem"
          style={{flexDirection: 'row', gap: 10}}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
          
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
    
              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                navigation.navigate({ name: route.name, merge: true });
              }
            };
    
            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

          return (
              <Pressable
                key={`v${index}`}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={[{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 11, borderRadius: 16, paddingHorizontal: 13, marginVertical: 12, marginHorizontal: 12},
                isFocused ? {backgroundColor: theme.colors.primary_300} : null,
                ]}
              >
                {options.tabBarIcon ? options.tabBarIcon({focused: isFocused}) : null}
                {options.tabBarShowLabel ? <Text>{label}</Text> : null}
              </Pressable>
          );
        })}
    </View>
  );
};

const Navbar = React.memo(NavbarX);
export default Navbar;
