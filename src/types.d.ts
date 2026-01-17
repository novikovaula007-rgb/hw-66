import dayjs from "dayjs";

export interface IMealForm {
    name: string,
    time: string,
    calories: number,
    date: dayjs,
}

export interface IMeal {
    name: string,
    time: string,
    calories: number,
    date: dayjs,
    id: string,
}

export interface IMealAPI {
    [key: string]: IMealForm,
}
