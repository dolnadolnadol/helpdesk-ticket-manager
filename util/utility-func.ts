export const generateDateTime = (): string => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");
  const timezoneOffset = currentDate.getTimezoneOffset();
  const timezoneOffsetHours = Math.floor(Math.abs(timezoneOffset) / 60).toString().padStart(2, "0");
  const timezoneOffsetMinutes = (Math.abs(timezoneOffset) % 60).toString().padStart(2, "0");
  const timezoneSign = timezoneOffset >= 0 ? "-" : "+";
  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezoneSign}${timezoneOffsetHours}:${timezoneOffsetMinutes}`;
  
  return formattedDateTime;
};
