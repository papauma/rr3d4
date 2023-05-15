import { LocaleConfig } from 'react-native-calendars';

export function getCalendarLocaleConfig() {
  LocaleConfig.locales['es'] = {
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    monthNamesShort: [
      'En.',
      'Feb.',
      'Mar',
      'Abr.',
      'May.',
      'Jun.',
      'Jul.',
      'Agos.',
      'Sept.',
      'Oct.',
      'Nov.',
      'Dic.',
    ],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    today: 'Hoy',
  };
}
