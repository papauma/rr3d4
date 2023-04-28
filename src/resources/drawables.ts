export interface IDrawables {
  splash: any,
  general: {
    Ic_storyIcon: any;
    Ic_Close: any;
    Ic_Events: any;
    Ic_filters: any;
    Ic_Home: any;
    Ic_location: any;
    Ic_location_desactivated: any;
    Ic_Search: any;
    Ic_Settings: any;
    Ic_Star: any;
    Ic_Warning: any;
    Ic_Warning_White: any;
  }
}

export const drawables = {
  splash: {
    logo: require('@images/splashImage.png'),
  },
  general: {
    Ic_storyIcon: require('@images/Ic_storyIcon.png'),
    Ic_Close: require('@images/Ic_Close.png'),
    Ic_Events: require('@images/Ic_Events.png'),
    Ic_filters: require('@images/Ic_filters.png'),
    Ic_Home: require('@images/Ic_Home.png'),
    Ic_location: require('@images/Ic_location.png'),
    Ic_location_desactivated: require('@images/Ic_location_desactivated.png'),
    Ic_Search: require('@images/Ic_Search.png'),
    Ic_Settings: require('@images/Ic_Settings.png'),
    Ic_Star: require('@images/Ic_Star.png'),
    Ic_Warning: require('@images/Ic_Warning.png'),
    Ic_Warning_White: require('@images/Ic_Warning_White.png'),
  }
};
