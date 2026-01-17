import dayjs from "dayjs";

export interface IMealForm {
    name: string,
    time: string,
    calories: number,
    date: dayjs,
}
