import { DateTime } from 'luxon';
import i18n from 'i18n';

export const UI_DATE_FORMAT = 'dd.MM.yyyy';
export const UI_DATETIME_FORMAT = 'dd.MM.yyyy HH:mm';

export const utcNow = (): any => DateTime.utc();

export const toUIDate = (dateTime: DateTime, withTime = false): string =>
    dateTime.toFormat(withTime ? UI_DATETIME_FORMAT : UI_DATE_FORMAT);

export const toISODate = (dateTime: DateTime, withTime: string): string =>
    withTime ? dateTime.toISO() : dateTime.toISODate();

export const fromJSDate = (jsDate: Date): DateTime => DateTime.fromJSDate(jsDate);

export const fromISODate = (isoDate: string): DateTime => DateTime.fromISO(isoDate);

export const fromUIDate = (dateStr: string, withTime?: boolean): DateTime =>
    DateTime.fromFormat(dateStr, withTime ? UI_DATETIME_FORMAT : UI_DATE_FORMAT);

export const trimEmptyTime = (dateStr: string): string => dateStr.replace('00:00', '').trim();

export const toLocalUIDateTime = (isoDate: string): string => {
    const localDateTime = fromISODate(isoDate).toLocal();
    return trimEmptyTime(toUIDate(localDateTime, true));
};

const dateDiffInDays = (posted: string): number => {
    const today = new Date();
    const postedTime = new Date(posted);
    const result = (Number(today) - Number(postedTime)) / 86400000;

    return Math.floor(result);
};

export const formatDate = (date: string): string => {
    return DateTime.fromISO(date).toFormat('dd.MM.yyyy');
};

export const formatTime = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export const getDatePosted = (posted: string): number => {
    const postedDaysAgo = dateDiffInDays(posted);

    return postedDaysAgo;
};

export const getDateText = (posted: string): string => {
    const postedDaysAgo = dateDiffInDays(posted);
    if (postedDaysAgo < 1) {
        return i18n.t('common:today');
    }

    if (postedDaysAgo < 31) {
        return i18n.t('common:daysBefore', { count: postedDaysAgo });
    }

    return formatDate(posted);
};
