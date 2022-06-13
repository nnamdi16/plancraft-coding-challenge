interface IBaseRepository {
    persist(entity: any): Promise<any>;
    getBy(entity:any, filter: any):Promise<any>;
    updateQuery(filter:any, update: any) : Promise<any>;
    getIds(filter:any):Promise<any>;
    deleteAll(filter: any): Promise<any>;
    deleteQuery(filter: any): Promise<any>;
    getAll(entity: any): Promise<any>;
}

export default IBaseRepository