import moment from "moment";

export default function parseDate(date, format = "DD/MM/YYYY") {
  return moment(date).format(format);
}
