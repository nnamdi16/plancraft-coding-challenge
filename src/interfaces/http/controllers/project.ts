import { validateRequest } from './../validations/common.validation';
import { NextFunction, Request, Response } from "express";
import { ResponseBuilder } from '../responses/ResponseBuilder';

import Joi from "joi";
import httpStatusCodes from "../common/httpStatusCode";
import Project, { IProject } from '@src/app/project';

class ProjectController {
    constructor() { }

    async retrieve(req: Request, res: Response, next: NextFunction) {
        try {
            const projectService = new Project();
            const data = await projectService.getProjectById(req.params.id);
            ResponseBuilder.getResponseHandler(res).onSuccess(data, 'success', httpStatusCodes.OK, null);
        } catch (error) {
            next(error);
        }
    }

    async retrieveAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const projectService = new Project();
            const data = await projectService.getProjects();
            ResponseBuilder.getResponseHandler(res).onSuccess(data, 'success', httpStatusCodes.OK, null);
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const inputData: IProject = validateRequest(req, {
                name: Joi.string().required(),
                id: Joi.string().required(),
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
         await projectService.deleteProject(req.params.id);
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
         const projectService = new Project();
         const inputData: IProject = validateRequest(req, {
            name: Joi.string().required(),
            id: Joi.string().required(),
            description: Joi.string().required()
        });
         const data = await projectService.updateProject(req.params.id, inputData);
         ResponseBuilder.getResponseHandler(res).onSuccess(data, 'Deleted Successfully', httpStatusCodes.OK, null);
        } catch (error) {
         next(error);
        }
     }


}

export default ProjectController;
