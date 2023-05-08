import React, { useEffect, useState } from 'react';
import { ImageStyle, StyleProp } from 'react-native';
import Icon from './Icon';
import IconPresenter from '@src/redux/hooks/iconPresenter';

interface IconDynamicProps {
  iconId?: number;
  color?: string;
  style?: StyleProp<ImageStyle>;
  source?: any;
  size?: number;
  accessible?: boolean;
  alt?: string;
}

export default function IconDynamic({ iconId, color, style, source, size, accessible, alt }: IconDynamicProps) {
  const [icon, setIcon] = useState<String | undefined>();
  const { getIcon } = IconPresenter();

  useEffect(() => {
    let mounted = true;
    async function getIconApi() {
      iconId &&
        (await getIcon(iconId)
          .then((foundIcon: String | undefined) => {
            if (mounted && foundIcon) {
              setIcon(foundIcon);
            }
          })
          .catch((e) => {}));
    }
    if (iconId) {
      getIconApi();
    }
    return () => {
      mounted = false;
    };
  }, [getIcon, iconId]);

  return icon ? (
    <Icon
      alt={alt}
      source={{ uri: icon }}
      tint={color}
      style={[{ width: size ?? 24, height: size ?? 24 }, style]}
    />
  ) : (
    <Icon
      alt={alt}
      source={source}
      tint={color}
      style={[{ width: size ?? 24, height: size ?? 24 }, style]}
    />
  );
}
