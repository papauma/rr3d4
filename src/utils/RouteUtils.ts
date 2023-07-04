import GeoUtils from './GeoUtils';
import PlanUtils from './PlanUtils';
import TimeUtils from './TimeUtils';

export default class RouteUtils {
  static getItiCoords(data, position, intermediates) {
    let coords = [];
    let lastCoords;
    let polyline = require('@mapbox/polyline');
    if (!data?.plan) {
      return [];
    }

    for (let i = 0; i < data?.plan?.itineraries[position]?.legs?.length; i++) {
      let arrayCoords = polyline.decode(data.plan.itineraries[position].legs[i].legGeometry.points);
      let jsonIn = {};

      let origin = this.getCoords(data.plan.from.lat, data.plan.from.lon);
      let destination = this.getCoords(data.plan.to.lat, data.plan.to.lon);
      jsonIn['origin'] = origin;
      jsonIn.from = data.plan.from;
      jsonIn.to = data.plan.to;
      jsonIn['destination'] = destination;

      let mode = data.plan.itineraries[position].legs[i].mode;
      if (PlanUtils.isPublicMode(mode)) {
        jsonIn['intermediateStops'] = data.plan.itineraries[position].legs[i].intermediateStops;
      }

      jsonIn['coords'] = this.parseCoords(arrayCoords);
      //Añade a la polyline las coordenadas para unir legs
      if (i !== 0 && !intermediates) {
        jsonIn['coords'].unshift(lastCoords);
      }
      jsonIn['color'] = data.plan.itineraries[position].legs[i].routeColor
        ? '#' + data.plan.itineraries[position].legs[i].routeColor
        : '#0078B2';
      if (mode === 'WALK') {
        jsonIn['color'] = '#9B9B9B';
      } else if (mode === 'BICYCLE') {
        jsonIn['color'] = '#27BBF5';
      } else if (mode === 'CAR') {
        jsonIn['color'] = '#f6ff00';
      } /* else jsonIn['color'] = '#f12f33'; */
      coords.push(jsonIn);
      lastCoords = jsonIn['coords'][jsonIn['coords'].length - 1];
    }
    return coords;
  }

  static getRoutesInfo(data, segments) {
    let group = [];
    if (!data?.plan) {
      return [];
    }

    for (let i = 0; i < data?.plan?.itineraries?.length; i++) {
      let colors = [];
      let dateStart = new Date(data.plan.itineraries[i].startTime);
      let dateEnd = new Date(data.plan.itineraries[i].endTime);
      let startTime = TimeUtils.getFormatHour(dateStart);
      let endTime = TimeUtils.getFormatHour(dateEnd);
      let transhipments = 0;
      let walkDistance = 0.0;
      let jsonIn = {};
      jsonIn['index'] = i;
      if (data.plan.itineraries[i]?.fare?.fare?.regular?.cents)
        jsonIn['price'] = data.plan.itineraries[i].fare.fare.regular.cents / 100 + '€';
      else jsonIn['price'] = 0 + '€';
      jsonIn['id'] = i;
      jsonIn['distance'] = 0.0;
      jsonIn['startTime'] = startTime;
      jsonIn['endTime'] = endTime;
      jsonIn['duration'] = Math.round((data.plan.itineraries[i].duration / 3600) * 60);
      let legs = JSON.parse(JSON.stringify(data.plan.itineraries[i].legs));

      let origin = this.getCoords(data.plan.from.lat, data.plan.from.lon);
      let destination = this.getCoords(data.plan.to.lat, data.plan.to.lon);
      jsonIn['origin'] = origin;
      jsonIn['destination'] = destination;

      for (let j = 0; j < legs.length; j++) {
        if (legs[j].routeColor !== undefined) {
          colors.push('#' + legs[j].routeColor);
        }
        if (legs[j].mode === 'WALK') {
          colors.push('#9B9B9B');
        }
        if (legs[j].mode === 'BICYCLE') {
          colors.push('#27BBF5');
        }
        if (legs[j].mode === 'CAR') {
          colors.push('#f6ff00');
        }
        legs[j].id = j;

        //añade la distancia andando recorrida en metro
        if (legs[j].mode === 'WALK') {
          walkDistance += legs[j].distance;
        }

        if (j === legs.length - 1) {
          legs[j].last = true;
        } else {
          /* Comprueba si hay un transbordo */
          if (
            (legs[j].mode === 'BUS' ||
              legs[j].mode === 'SUBWAY' ||
              legs[j].mode === 'TRANSIT' ||
              legs[j].mode === 'RAIL' ||
              legs[j].mode === 'TRAM' ||
              legs[j].mode === 'FUNICULAR') &&
            (legs[j + 1].mode === 'BUS' ||
              legs[j + 1].mode === 'SUBWAY' ||
              legs[j + 1].mode === 'TRANSIT' ||
              legs[j + 1].mode === 'RAIL' ||
              legs[j + 1].mode === 'TRAM' ||
              legs[j + 1].mode === 'FUNICULAR')
          ) {
            legs[j].transhipment = true;
            transhipments++;
          }
        }
        startTime = TimeUtils.getFormatHour(new Date(legs[j].startTime));
        endTime = TimeUtils.getFormatHour(new Date(legs[j].endTime));
        legs[j].startTime = startTime;
        legs[j].endTime = endTime;
        legs[j].duration = Math.round((legs[j].duration / 3600) * 60);
        if (legs[j]?.distance && legs[j]?.distance !== undefined) {
          jsonIn['distance'] += legs[j].distance;
          legs[j].distance =
            legs[j].distance > 1000
              ? `${parseFloat(legs[j].distance / 1000).toFixed(2)} Km`
              : `${legs[j].distance.toFixed(0)} m`;
        }
        if(legs[j].duration === 0) {
          legs[j].duration = 1;
        }

        //Añadir nombre de las posiciones
        if (j === 0 && segments[0]?.data?.name) {
          legs[j].from.name = segments[0]?.data?.name;
        }

        if (j === legs.length - 1 && segments[segments.length - 1]?.data?.name) {
          legs[j].to.name = segments[segments.length - 1]?.data?.name;
        }

        legs[j].id = `${i}-${j}`;
      }

      jsonIn['legs'] = legs;
      jsonIn['colors'] = colors;
      jsonIn['transhipments'] = transhipments;
      jsonIn['walkDistance'] = walkDistance;

      if (i === 0) jsonIn['suggested'] = true;
      group.push(jsonIn);
    }
    return group;
  }

  static parseCoords(coords) {
    let parsedCoords = [];
    for (let i = 0; i < coords.length; i++) {
      parsedCoords.push({
        latitude: coords[i][0],
        longitude: coords[i][1],
      });
    }

    return parsedCoords;
  }

  /**
   * @function sortRoutes Ordena las rutas en función de @param key
   *   */
  static sortRoutes(data, key: string, order) {
    return data?.sort(function (a, b) {
      let x = a[key],
        y = b[key];
      switch (key) {
        case 'price':
          if (a[key]) {
            x = a[key];
          } else {
            x = 0;
          }

          if (b[key]) {
            y = b[key];
          } else {
            y = 0;
          }
          break;
        case 'duration':
          if (a[key]) {
            x = a[key];
          } else {
            x = 0;
          }

          if (b[key]) {
            y = b[key];
          } else {
            y = 0;
          }
          break;
        case 'transhipments':
          if (a[key]) {
            x = a[key];
          } else {
            x = 0;
          }

          if (b[key]) {
            y = b[key];
          } else {
            y = 0;
          }
          break;
        case 'walkDistance':
          if (a[key]) {
            x = a[key];
          } else {
            x = 0;
          }

          if (b[key]) {
            y = b[key];
          } else {
            y = 0;
          }
          break;
        default:
          break;
      }

      if (order === 'asc') {
        return x < y ? -1 : x > y ? 1 : 0;
      } else if (order === 'desc') {
        return x > y ? -1 : x < y ? 1 : 0;
      } else {
        if (order === 'asc') {
          return x < y ? -1 : x > y ? 1 : 0;
        } else if (order === 'desc') {
          return x > y ? -1 : x < y ? 1 : 0;
        }
      }
      return data;
    });
  }

  /* Función para comprobar qué itinerarios son del modo Walk y te los devuelve */
  static getWalkItineraries(itineraries) {
    let results = [];
    for (let i = 0; i < itineraries?.length; i++) {
      let isWalk = true;
      let j = 0;
      while (j < itineraries[i].legs?.length && isWalk) {
        isWalk = itineraries[i].legs[j].mode === 'WALK';
        j++;
      }
      if (isWalk) results.push(itineraries[i]);
    }
    return results;
  }

  /* Función para comprobar qué itinerarios son de modo especificado y te los devuelve
    modes TRANSIT, WALK, CAR, BICYCLE...
  */
  static getModeItineraries(itineraries, modes) {
    let results = [];
    for (let i = 0; i < itineraries?.length; i++) {
      let isMode = true;
      let j = 0;
      while (j < itineraries[i].legs?.length && isMode) {
        isMode =
          itineraries[i].legs[j].mode === 'WALK' || modes.includes(itineraries[i].legs[j].mode);
        j++;
      }
      if (isMode) results.push(itineraries[i]);
    }
    return results;
  }

  static getLength(data) {
    return data.plan.itineraries.length;
  }

  static getDistSquared(point1, point2) {
    let differenceX = point1.latitude - point2.latitude;
    let differenceY = point1.longitude - point2.longitude;
    return differenceX * differenceX + differenceY * differenceY;
  }

  static getClosestToStop(position, coords) {
    let closest = coords[0];
    let shortestDistance = this.getDistSquared(position, coords[0]);
    for (let i = 0; i < coords.length; i++) {
      let d = this.getDistSquared(position, coords[i]);
      if (d < shortestDistance) {
        closest = coords[i];
        shortestDistance = d;
      }
    }
    return closest;
  }

  static getClosesIndextToStop(position, coords) {
    let closest = 0;
    let shortestDistance = this.getDistSquared(position, coords[0]);
    for (let i = 0; i < coords.length; i++) {
      let d = this.getDistSquared(position, coords[i]);
      if (d < shortestDistance) {
        closest = i;
        shortestDistance = d;
      }
    }
    return closest;
  }

  static getCoords(lat, lon) {
    if (!lat || !lon) return null;

    return {
      latitude: parseFloat(parseFloat(lat).toFixed(6)),
      longitude: parseFloat(parseFloat(lon).toFixed(6)),
    };
  }

  /**
   * @function getMeanSpeed devuelve los metros por segundos recorridos
   * en un array de distintas posiciones, el @param timeout debe
   * estar en segundos y ser igual a los segundos transcurridos entre la obtención
   * de cada posición del @param positions
   */
  static getMeanSpeed(positions, timeout) {
    let totalDistance = 0.0;
    for (let i = 0; i < positions.length + 1; i++) {
      totalDistance += GeoUtils.calculateDistanceBetweenTwoPoins(
        positions[0].latitude,
        positions[1].longitude,
        positions[1].latitude,
        positions[0].longitude,
      );
    }

    return totalDistance / (5 * timeout);
  }

  /**
   * @function getNameOfMode devuelve el texto asociado al modo de transporte de OTP
   * mediante el @param mode
   */
  static getNameOfMode(mode: string) {
    if (mode === 'BUS') {
      return 'bus';
    } else if (mode === 'SUBWAY') {
      return 'metro';
    } else if (mode === 'RAIL') {
      return 'tren';
    } else {
      return 'transporte';
    }
  }
}
