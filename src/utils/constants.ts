export const navigationPages = {
  splash: 'Splash',
  main: 'Main',
  mainMap: 'MainMap',
  filters: 'Filters',
  search: 'Search',
  planner: 'Planner',
  plannerResult: 'PlannerResult',
  plannerPreferences: 'PlannerPreferences',
  language: 'Language',
  storybook: 'Storybook',
};

export const languages = ['ca', 'es', 'en', 'ge'];



export const defaultLocation = {
  latitude: 39.5722384,
  longitude: 2.6513239,
  latitudeDelta: 0.09,
  longitudeDelta: 0.04,
};



export const enviroments = {
  //LOCAL
 /* endPoint: 'http://172.27.192.210:8080/maas/api/v1',
  apiCitram: 'http://172.27.192.210/api-citram/api/v1',
*/
  //PRE
  endPoint: 'https://planval.crtm.es/maas/api/v1',
  apiCitram: 'https://planval.crtm.es/api-citram/api/v1',

  deviceTypeId: 2,
  userTypeId: { anonymous: 1, registred: 2 },
  languageId: 1, // 1:ES, 2:FR
};
