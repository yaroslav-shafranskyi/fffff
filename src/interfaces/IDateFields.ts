export type MonthName = 'січня' | 'лютого' | 'березня' | 'квітня' | 'травня' | 'червня' | 'липня' | 'серпня' | 'вересня' | 'жовтня' | 'листопада' | 'грудня';

export interface IDateData {
    hours: number;
    minutes: number;
    day: number;
    month: number;
    monthName: MonthName;
    year: number;
}
