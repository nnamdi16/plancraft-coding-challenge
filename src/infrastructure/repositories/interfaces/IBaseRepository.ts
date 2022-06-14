interface IBaseRepository {
    persist(entity: any): Promise<number>;
    getBy(entity:string, filter: string):Promise<any>;
    updateQuery(filter:any, update: any) : Promise<any>;
    deleteAll(filter: any): Promise<any>;
    deleteQuery(name:string, id:string): Promise<any>;
    getAll(entity: any): Promise<any>;
}

export default IBaseRepository