function getDate() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}

function formatToYMD(dateValue) {
  const { year, month, day } = dateValue;

  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");

  return `${year}-${mm}-${dd}`;
}

function getCurrentTimeHHMM() {
  // return "19:40";
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

function parseTimezone(timezone) {
  const splitted = timezone.split("/");
  return `${splitted[1]}, ${splitted[0]}`;
}

function parseHijriDate(date) {
  return `${date.hijri.day} ${date.hijri.month.en} ${date.hijri.year}`;
}

function parseGregorianDate(date) {
  return `${date.gregorian.day} ${date.gregorian.month.en} ${date.gregorian.year}`;
}

export {
  getDate,
  formatToYMD,
  getCurrentTimeHHMM,
  timeToMinutes,
  parseTimezone,
  parseHijriDate,
  parseGregorianDate,
  getMagneticDeclination,
  getCardinalDirection,
};

/**
 * Fetches magnetic declination from NOAA API
 * @param {number} latitude - User's latitude
 * @param {number} longitude - User's longitude
 * @returns {Promise<number>} Magnetic declination value
 */
async function getMagneticDeclination(latitude, longitude) {
  const response = await fetch(
    `https://www.ngdc.noaa.gov/geomag-web/calculators/calculateDeclination?lat1=${latitude}&lon1=${longitude}&key=${process.env.NEXT_PUBLIC_NOAA_API_KEY}&resultFormat=json`,
  );
  const data = await response.json();

  if (!data?.result || data?.result?.length === 0) return 0;

  const declination = data.result[0].declination;
  return declination;
}

/**
 * Converts compass heading to cardinal direction
 * @param {number} heading - Compass heading in degrees
 * @returns {string} Cardinal direction (N, NE, E, SE, S, SW, W, NW)
 */
function getCardinalDirection(heading) {
  let cardinalDirection;
  if (heading >= 337.5 || heading < 22.5) {
    cardinalDirection = "N";
  } else if (heading >= 22.5 && heading < 67.5) {
    cardinalDirection = "NE";
  } else if (heading >= 67.5 && heading < 112.5) {
    cardinalDirection = "E";
  } else if (heading >= 112.5 && heading < 157.5) {
    cardinalDirection = "SE";
  } else if (heading >= 157.5 && heading < 202.5) {
    cardinalDirection = "S";
  } else if (heading >= 202.5 && heading < 247.5) {
    cardinalDirection = "SW";
  } else if (heading >= 247.5 && heading < 292.5) {
    cardinalDirection = "W";
  } else if (heading >= 292.5 && heading < 337.5) {
    cardinalDirection = "NW";
  }

  return cardinalDirection;
}
