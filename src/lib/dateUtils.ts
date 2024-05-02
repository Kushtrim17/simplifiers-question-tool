export class DateUtils {
  static getFormattedDate(date: string): string {
    return date.split("T")[0] + " " + date.split("T")[1].split(".")[0];
  }
}
