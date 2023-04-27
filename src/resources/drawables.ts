export interface IDrawables {
  splash: any,
  general: {
    Ic_storyIcon: any;
    Ic_Events: any;
    Ic_Home: any;
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
    Ic_Events: require('@images/Ic_Events.png'),
    Ic_Home: require('@images/Ic_Home.png'),
    Ic_Settings: require('@images/Ic_Settings.png'),
    Ic_Star: require('@images/Ic_Star.png'),
    Ic_Warning: require('@images/Ic_Warning.png'),
    Ic_Warning_White: require('@images/Ic_Warning_White.png'),
  }
};
