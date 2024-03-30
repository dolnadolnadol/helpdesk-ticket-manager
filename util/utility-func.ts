export const generateDateTime = (): string => {
  const dateString = "2023-04-10T10:39:37+07:00";
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  const timezoneOffset = date.getTimezoneOffset();
  const timezoneOffsetHours = Math.floor(Math.abs(timezoneOffset) / 60)
    .toString()
    .padStart(2, "0");
  const timezoneOffsetMinutes = (Math.abs(timezoneOffset) % 60)
    .toString()
    .padStart(2, "0");
  const timezoneSign = timezoneOffset >= 0 ? "-" : "+";

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezoneSign}${timezoneOffsetHours}:${timezoneOffsetMinutes}`;
};