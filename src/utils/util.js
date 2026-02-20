function getDate() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}

function parseHijriDate(date) {
  return `${date.hijri.day} ${date.hijri.month.en} ${date.hijri.year}`;
}

function parseGregorianDate(date) {
  return `${date.gregorian.day} ${date.gregorian.month.en} ${date.gregorian.year}`;
}

export { getDate, parseHijriDate, parseGregorianDate };
