export interface IDataCreateTask {
    taskName: string;
    description: string;
    grade: string;
    priority: string;
    date: {
        startAt: Date | string | undefined;
        endAt: Date | string | undefined;
    };
}

export interface IDataUpdateTask {
    _id: string;
    updates: {
        taskName?: string;
        description?: string;
        completed?: boolean;
        grade?: string;
        priority?: string;
        date?: {
            startAt?: Date | string | undefined;
            endAt?: Date | string | undefined;
        };
    };
}

export interface IParamsFetchTasks {
    completed?: string;
    sortBy?: string;
}
