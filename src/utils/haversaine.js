export const haversine = (function () {
  const RADII = {
    km: 6371,
    mile: 3960,
    meter: 6371000,
    nmi: 3440,
  };

  // convert to radians
  const toRad = function (num) {
    return (num * Math.PI) / 180;
  };

  // convert coordinates to standard format based on the passed format option
  const convertCoordinates = function (format, coordinates) {
    switch (format) {
      case '[lat,lon]':
        return { latitude: coordinates[0], longitude: coordinates[1] };
      case '[lon,lat]':
        return { latitude: coordinates[1], longitude: coordinates[0] };
      case '{lon,lat}':
        return { latitude: coordinates.lat, longitude: coordinates.lon };
      case '{lat,lng}':
        return { latitude: coordinates.lat, longitude: coordinates.lng };
      case 'geojson':
        return {
          latitude: coordinates.geometry.coordinates[1],
          longitude: coordinates.geometry.coordinates[0],
        };
      default:
        return coordinates;
    }
  };

  return function haversine(startCoordinates, endCoordinates, options) {
    options = options || {};

    const R = options.unit in RADII ? RADII[options.unit] : RADII.km;

    const start = convertCoordinates(options.format, startCoordinates);
    const end = convertCoordinates(options.format, endCoordinates);

    const dLat = toRad(end.latitude - start.latitude);
    const dLon = toRad(end.longitude - start.longitude);
    const lat1 = toRad(start.latitude);
    const lat2 = toRad(end.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    if (options.threshold) {
      return options.threshold > R * c;
    }

    return R * c;
  };
})();
