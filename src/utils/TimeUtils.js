export default class TimeUtils {
  static getTime(duration) {
    let date = new Date(duration);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    return hours + ':' + minutes;
  }

  static convertFromJulianToDate(jd) {
    let millis = (jd - 2440587.5) * 86400000;
    let dateLocal = new Date(millis);
    return dateLocal;
  }

  static timeToMil(t) {
    return Number(t.split(':')[0]) * 60 * 60 * 1000 + Number(t.split(':')[1]) * 60 * 1000;
  }

  static convertTime12to24(time) {
    var hours = parseInt(time.substr(0, 2));
    if (time.indexOf('am') != -1 && hours == 12) {
      time = time.replace('12', '0');
    }
    if (time.indexOf('pm') != -1 && hours < 12) {
      time = time.replace(hours, hours + 12);
    }
    return time.replace(/(am|pm)/, '');
  }

  static getTimePM_AM(time) {
    let hours = parseInt(time.substr(0, 2));
    let minutes = parseInt(time.substr(3, 4));
    let pm_am = hours >= 12 ? 'pm' : 'am';
    let moduleHour = hours % 12;
    hours = moduleHour ? moduleHour : hours !== 0 ? 12 : 0;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutes + pm_am;
  }

  static getTimePM_AMByHoursMinutes(paramHours, paramMinutes) {
    let hours = paramHours;
    let minutes = paramMinutes;
    let pm_am = hours >= 12 ? 'pm' : 'am';
    let moduleHour = hours % 12;
    hours = moduleHour ? moduleHour : hours !== 0 ? 12 : 0;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutes + pm_am;
  }

  static transformTimePM_AMToLocal(time) {
    let splitTime = time.split(':');
    let hours = parseInt(splitTime[0]);
    let minutes = parseInt(splitTime[1].substring(0, 2));
    let pm_am = splitTime[1].substring(2, 5);

    if (isNaN(minutes)) {
      minutes = `0${splitTime[1].substring(0, 1)}`;
      pm_am = splitTime[1].substring(1, 4);
    }
    if (String(minutes).length === 1) {
      minutes = `0${minutes}`;
    }
    hours = pm_am === 'pm' ? (hours === 12 ? hours : hours + 12) : hours;

    return hours + ':' + minutes;
  }

  static getDate(date) {
    date = new Date(date);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    return month + '-' + day + '-' + year;
  }

  static getPlanDate(date) {
    let split = date.split('-');
    return split[1] + '-' + split[0] + '-' + split[2];
  }

  static getFormatHour(startTime) {
    let dateStart = new Date(startTime);
    let startHour = dateStart.getHours() ?? 0;
    let startMinute = dateStart.getMinutes() ?? 0;

    return `${startHour}:${startMinute > 9 ? startMinute : '0' + startMinute}`;
  }
}
