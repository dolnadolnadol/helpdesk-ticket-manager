"use server";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function generateDateTime() {
  const currentDate = dayjs();
  const formattedDateTime = currentDate.format("YYYY-MM-DDTHH:mm:ssZ");

  return formattedDateTime;
}
