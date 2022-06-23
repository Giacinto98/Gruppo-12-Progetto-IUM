export const mapsSelector = (lat: number, lon: number) => {
  if (
    /* if we're on iOS, open in Apple Maps */
    navigator.platform.indexOf("iPhone") !== -1 ||
    navigator.platform.indexOf("iPod") !== -1 ||
    navigator.platform.indexOf("iPad") !== -1
  ) {
    window.location.assign(`maps://maps.apple.com/maps?daddr=${lat},${lon}&amp;ll=`);
  } else {
    window.open(`https://maps.google.com/maps?daddr=${lat},${lon}&amp;ll=`);
  }
};
