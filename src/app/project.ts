import BaseRepository from "./../infrastructure/repositories/implementations/BaseRepository";
import { logger } from './../infrastructure/logger/index'
import { Logger } from "winston";

class Project {
    private readonly log: Logger
    constructor() {
        this.log = logger;
    }

    async getProjectById(id: string) {
        const baseRepository = new BaseRepository();
        const project = JSON.parse(await baseRepository.getBy('project', id));

        if (!project) {
            this.log.info('Cache missed');
            const data = {
                name: 'project',
                description: 'Project 60',
                id: '60'
            };

            await baseRepository.persist(data)
            return JSON.parse(await baseRepository.getBy(data.name, data.id));
        }

        this.log.info('Cache hit');
        return project;
    }

    async getProjects() {
        const baseRepository = new BaseRepository();
        const projects: GenericMatch = await baseRepository.getAll('project');
        const data: IProject[] = Object.values(projects).map((item) => JSON.parse(item));
        return data;
    }

    async createProject(payload: IProject) {
        const baseRepository = new BaseRepository();
        await baseRepository.persist(payload);
        return JSON.parse(await baseRepository.getBy(payload.name, payload.id));
    }

    async updateProject(id: string, payload: IProject) {
        const baseRepository = new BaseRepository();
        await baseRepository.updateQuery(id, payload);
        return baseRepository.getBy(payload.name, payload.id);
    }

    async deleteProject(id: string) {
        const baseRepository = new BaseRepository();
       return  baseRepository.deleteQuery(id);
       
    }

    async deleteProjects(key: string) {
        const baseRepository = new BaseRepository();
       return  baseRepository.deleteAll(key);
       
    }
}

export interface GenericMatch {
    [key: string]: string | number | Date | any;
}

export type IProject = {
    name: string;
    description: string;
    id: string
}

export default Project;