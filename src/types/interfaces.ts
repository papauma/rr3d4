import { ImageSourcePropType } from 'react-native';

export interface IButton {
  text?: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: object
}

export interface IButtonHome {
  text: string;
  onPress?: () => void;
}

export interface IButtonIcon {
  text?: string;
  onPress?: () => void;
  disabled?: boolean;
  size?: number;
  icon: ImageSourcePropType;
}


export interface IContextualMessage {
  result: string;
  text: string;
}

export interface ITitle {
  text: string;
  styles?: Array<Object>;
}

export interface IIncidence {
  title: string;
  description: string;
  type?: string;
  image?: string;
  location?: ILocation;
  address?: string|null;
  data?: string;
  time?: string;

}

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IHeader {
  title: string;
  step: number;
  back?: () => void;
  close?: boolean;
}
