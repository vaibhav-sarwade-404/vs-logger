export const dateFormat = () => {
  const currentDateTime = new Date();
  const date = [
    currentDateTime.getFullYear(),
    currentDateTime.getMonth(),
    currentDateTime.getDate()
  ]
    .join("-")
    .toString();
  const time = [
    currentDateTime.getHours(),
    currentDateTime.getMinutes(),
    currentDateTime.getSeconds(),
    currentDateTime.getMilliseconds()
  ]
    .join(":")
    .toString();

  const utcOffset = currentDateTime.getTimezoneOffset();
  const hourOffset = String(Math.abs(utcOffset) / 60);
  const minOffset = String(Math.abs(utcOffset) % 60);
  return `${date} T${time} UTC${
    utcOffset <= 0 ? "+" : "-"
  }${hourOffset.padStart(2, "0")}:${minOffset.padStart(2, "0")}`;
};
