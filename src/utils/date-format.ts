import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DATE_TIME_FORMATE = 'YYYY-MM-DD HH:mm:ss'

export function formatUTCString(
  UTCString: string,
  format: string = DATE_TIME_FORMATE
) {
  //使用 offset 方法设置时间为东八区
  return dayjs.utc(UTCString).utcOffset(8).format(format)
}
