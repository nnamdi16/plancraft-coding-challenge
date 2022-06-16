import BaseRepository from "./../infrastructure/repositories/implementations/BaseRepository";
import { logger } from './../infrastructure/logger/index'
import { Logger } from "winston";
import { faker } from '@faker-js/faker';
import { GenericMatch, ICreateProject, IProject } from '../infrastructure/repositories/interfaces/IProject';
class Project {
    private readonly log: Logger
    constructor() {
        this.log = logger;
    }

    async getProjectById(id: string, name:string) {
        const baseRepository = new BaseRepository();
        const project: IProject = JSON.parse(await baseRepository.getBy(name, id));

        if (!project) {
            this.log.info('Cache missed');
            const data = {
                name,
                description: faker.lorem.lines(3),
                id: faker.random.numeric(10)
            };

            await baseRepository.persist(data);
            return JSON.parse(await baseRepository.getBy(data.name, data.id));
        }

        this.log.info('Cache hit');
        return project;
    }

    async getProjects(name:string) {
        const baseRepository = new BaseRepository();
        const projects: GenericMatch  = await baseRepository.getAll(name);
        const data: IProject[] = Object.values(projects).map((item) => JSON.parse(item));
        this.log.info('Cache hit');
        return data;
    }

    async createProject(payload: ICreateProject) {
        const baseRepository = new BaseRepository();
        const data: IProject = {...payload, id: faker.random.numeric(10)}
        await baseRepository.persist(data);
        this.log.info(`Cache created successfully ${data}`)
        return JSON.parse(await baseRepository.getBy(data.name, data.id));
    }

    async updateProject(id: string, payload: ICreateProject) {
        const baseRepository = new BaseRepository();
        await baseRepository.updateQuery(id, payload);
        this.log.info(`Cache updated successfully ${payload}`)
        return JSON.parse(await baseRepository.getBy(payload.name, id))
    }

    async deleteProject(id: string, name: string) {
        const baseRepository = new BaseRepository();
        this.log.info(`Cache deleted successfully ${id}`);
        return baseRepository.deleteQuery(name, id);

    }

    async deleteProjects(key: string) {
        const baseRepository = new BaseRepository();
        return baseRepository.deleteAll(key);

    }
}


export default Project;