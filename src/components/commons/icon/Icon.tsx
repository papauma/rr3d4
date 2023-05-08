import { Image, ImageStyle, StyleProp, StyleSheet } from "react-native";

export interface IconProps {
    /**
     * @style define el estilo del icono
     */
    style?: StyleProp<ImageStyle>;
    /**
     * @param size define el tamaño del icono
     */
    size?: number;
    /**
     * @param tint define color del icono
     */
    tint?: string | null;
    /**
     * @param source define la fuente de origen del icono
     */
    source?: unknown;
    alt?: string;
  }
  
  export default function Icon({style, size, tint, source, alt}: IconProps) {
    return source ? (
      <Image
        alt={alt}
        style={[styles(size, tint).content, style]}
        source={source}
        resizeMode={'contain'}
      />
    ) : <></>;
  }
  
  const styles = (size?: number, tint?: string) =>
    StyleSheet.create({
      content: {
        width: size ?? 24,
        height: size ?? 24,
  
        // El tinte:
        // si no está definido, toma el color por defecto,
        // si está definido, pinta el color especificado,
        // si está nulo, quita el tinte por defecto.
        tintColor:
          tint === undefined ? /* theme.colors.textPrimary */ null : tint,
      },
    });
  