import { useTranslate } from '@src/context/languageContext';
import { useTheme } from '@src/context/themeContext';

export interface IFavDestCategory {
    id: number;
    name: string;
    icon: any;
}

export function useTotalCategoriesDestinations() {
    const t = useTranslate();
    const theme = useTheme();
  
    return [{
        id: 1,
        name: t('favorites_dest_home'),
        icon: theme.drawables.general.Ic_Home,
      },
      {
        id: 2,
        name: t('favorites_dest_workplace'),
        icon: theme.drawables.general.Ic_Work,
      },
      {
        id: 3,
        name: t('favorites_dest_school'),
        icon: theme.drawables.general.Ic_Colegio,
      },
      /* {
        id: 1,
        name: t(''),
        icon: theme.drawables.general.Ic_Home,
      },
      {
        id: 1,
        name: t(''),
        icon: theme.drawables.general.Ic_Home,
      },
      {
        id: 1,
        name: t(''),
        icon: theme.drawables.general.Ic_Home,
      }, */
    ] as Array<IFavDestCategory>;
  }