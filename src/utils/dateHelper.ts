import { format, parseISO, isValid } from "date-fns";

const DateHelper = {
  getCurrentDate: () => {
    return new Date();
  },
  formatDate: (
    date: Date | string,
    formatString: string = "MMM dd, yyyy"
  ): string => {
    try {
      const dateObj = typeof date === "string" ? parseISO(date) : date;
      return isValid(dateObj) ? format(dateObj, formatString) : "Invalid Date";
    } catch {
      return "Invalid Date";
    }
  },
};

export default DateHelper;
