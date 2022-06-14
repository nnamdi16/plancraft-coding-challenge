export interface GenericMatch {
    [key: string]: string | number | Date | any;
}

export type IProject = {
    name: string;
    description: string;
    id: string
}

export type ICreateProject = Pick<IProject,"description" | "name">
