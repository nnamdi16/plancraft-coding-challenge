import BaseRepository from "./../infrastructure/repositories/implementations/BaseRepository";
import { logger } from './../infrastructure/logger/index'
import { Logger } from "winston";
import { faker } from '@faker-js/faker';
import { GenericMatch, ICreateProject, IProject } from '../infrastructure/repositories/interfaces/IProject';
class Project {
    private readonly log: Logger;
    private readonly baseRepository: BaseRepository;
    constructor() {
        this.log = logger;
        this.baseRepository = new BaseRepository()
    }

    async getProjectById(id: string, name:string) {
        
        const project: IProject = JSON.parse(await this.baseRepository.getBy(name, id));
        console.log('I shine here');
        console.log(project)
        if (!project) {
            this.log.info('Cache missed');
            const data = {
                name,
                description: faker.lorem.lines(3),
                id: faker.random.numeric(10)
            };

            await this.baseRepository.persist(data);
            return JSON.parse(await this.baseRepository.getBy(data.name, data.id));
        }

        this.log.info('Cache hit');
        return project;
    }

    async getProjects(name:string) {
        console.log('I see here')
        const projects: GenericMatch  = await this.baseRepository.getAll(name);
        const data: IProject[] = Object.values(projects).map((item) => JSON.parse(item));
        this.log.info('Cache hit');
        return data;
    }

    async createProject(payload: ICreateProject) {
        const data: IProject = {...payload, id: faker.random.numeric(10)}
        await this.baseRepository.persist(data);
        this.log.info(`Cache created successfully ${data}`)
        return data;
    }

    async updateProject(id: string, payload: ICreateProject) {

        await this.baseRepository.updateQuery(id, payload);
        this.log.info(`Cache updated successfully ${payload}`)
        return JSON.parse(await this.baseRepository.getBy(payload.name, id))
    }

    async deleteProject(id: string, name: string) {
        this.log.info(`Cache deleted successfully ${id}`);
        return this.baseRepository.deleteQuery(name, id);

    }

    async deleteProjects(key: string) {
        return this.baseRepository.deleteAll(key);

    }
}


export default Project;