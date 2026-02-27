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
};
