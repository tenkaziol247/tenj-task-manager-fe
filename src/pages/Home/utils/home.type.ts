export interface IValueForm {
    taskName: string;
    grade: string;
    priority: string;
    description: string;
    startAt: Date | string | undefined;
    endAt: Date | string | undefined;
}
