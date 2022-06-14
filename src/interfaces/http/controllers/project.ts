import { ICreateProject } from './../../../infrastructure/repositories/interfaces/IProject';
import { validateRequest } from './../validations/common.validation';
import { NextFunction, Request, Response } from "express";
import { ResponseBuilder } from '../responses/ResponseBuilder';

import Joi from "joi";
import httpStatusCodes from "../common/httpStatusCode";
import Project from '@src/app/project';
import { IProject } from '@src/infrastructure/repositories/interfaces/IProject';

class ProjectController {
    constructor() { }

    async retrieve(req: Request, res: Response, next: NextFunction) {
        try {
            const projectService = new Project();
            const data: IProject = await projectService.getProjectById(req?.params?.id, req?.params?.name);
            ResponseBuilder.getResponseHandler(res).onSuccess(data, 'success', httpStatusCodes.OK, null);
        } catch (error) {
            next(error);
        }
    }

    async retrieveAll(req: Request, res: Response, next: NextFunction) {
        try {
            const projectService = new Project();
            const data:IProject [] = await projectService.getProjects(req?.params?.name);
            ResponseBuilder.getResponseHandler(res).onSuccess(data, 'success', httpStatusCodes.OK, null);
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const inputData: ICreateProject = validateRequest(req, {
                name: Joi.string().required(),
                description: Joi.string().required()
            });

            const projectService = new Project();
            const data = await projectService.createProject(inputData)
            ResponseBuilder.getResponseHandler(res).onSuccess(
                data,
                'Project created successfully',
                httpStatusCodes.CREATED,
                null

            );
        } catch (error) {
            next(error);
        }
    }

    async deleteProject(req: Request, res: Response, next: NextFunction) {
        try {
         const projectService = new Project();
         await projectService.deleteProject(req?.params?.id, req?.params?.name);
         ResponseBuilder.getResponseHandler(res).onSuccess(null, 'Deleted Successfully', httpStatusCodes.OK, null);
        } catch (error) {
         next(error);
        }
     }

     async deleteProjects(req: Request, res: Response, next: NextFunction) {
        try {
            const inputData= validateRequest(req, {
                name: Joi.string().required(),
            
            });
         const projectService = new Project();
         await projectService.deleteProjects(inputData.name);
         ResponseBuilder.getResponseHandler(res).onSuccess(null, 'Deleted all Successfully', httpStatusCodes.OK, null);
        } catch (error) {
         next(error);
        }
     }


     async updateProject(req: Request, res: Response, next: NextFunction) {
        try {
         const inputData = validateRequest(req, {
            name: Joi.string().required(),
            description: Joi.string().required(),
            id: Joi.string().required()
        });
        const projectService = new Project();
        console.log(inputData);
         const data = await projectService.updateProject(req.params.id, req.body);
         ResponseBuilder.getResponseHandler(res).onSuccess(data, 'Updated Successfully', httpStatusCodes.OK, null);
        } catch (error) {
         next(error);
        }
     }


}

export default ProjectController;
