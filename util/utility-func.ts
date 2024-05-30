import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export const generateDateTime = (): string => {
  const currentDate = dayjs();
  const formattedDateTime = currentDate.format("YYYY-MM-DDTHH:mm:ssZ");

  return formattedDateTime;
};
