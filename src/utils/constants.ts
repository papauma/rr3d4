
export const navigationPages = {
  splash: 'Splash',
  main: 'Main',
  reportMap: 'ReportMap',
  reportPhoto: 'ReportPhoto',
  reportText: 'ReportText',
  listReport: 'ListReport',
  confirm: 'ConfirmReport',
  result: 'ResultReport',
};

export const MailInformation = {
    mailhost: 'smtp-relay.sendinblue.com',
    port: '587',
    username: 'salva.escriva82@gmail.com',
    password: 'PSjqk9By7MEnh13w',
    fromName: 'salva.escriva82',
    recipients: 'josepserralta@gmail.com,salva.escriva82@gmail.com',
    recipientsDebug: 'salva.escriva82@gmail.com',
    htmlBody: '<h1>header</h1><p>body</p>',
    subject: '[Benirredrà]',
};

export const defaultLocation = {
  //latitude: 39.5722384,
  //longitude: 2.6513239,
  latitude: 40.415902,
  longitude: -3.707948,
  latitudeDelta: 0.09,
  longitudeDelta: 0.04,
};


export const enviroments = {
  //PRE
  endPoint: 'https://planval.crtm.es/maas/api/v1',
  apiCitram: 'https://planval.crtm.es/api-citram/api/v1',

  deviceTypeId: 2,
  userTypeId: { anonymous: 1, registred: 2 },
  languageId: 1, // 1:ES, 2:FR
};

export const INCIDENCES_LIST = 'INCIDENCES_LIST';
export const INCIDENCES_NUM = 'INCIDENCES_NUM';
export const MAX_INCIDENCES_DAY = 3;

export const PHOTO_NAME = 'brdrapfot023.jpg';

export const TOTAL_STEPS = 5;

export const MAX_LENGHT_TAREA = 400;

export const DEBUG_MODE = true;
