

interface DateUtil {
  getCurrentDate(): Date;
}

class DateUtilImpl implements DateUtil {
  constructor() {}

  getCurrentDate(): Date {
    return new Date();
  }
}