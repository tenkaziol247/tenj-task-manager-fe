export interface IResponseUser {
    _id: string;
    name: string;
    email: string;
    age: number;
}

export interface IDataCreateAccount {
    email: string;
    password: string;
    name: string;
}

export interface IDataLoginAccount {
    email: string;
    password: string;
}

export interface IResponseTokenAndUser {
    token: string;
    user: IResponseUser;
}

export interface IDataLoginAccount {
    email: string;
    password: string;
}

export interface IDataUpdateProfile {
    name?: string;
    age?: number;
}
