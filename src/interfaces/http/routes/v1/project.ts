import ProjectController from "../../controllers/project";
import { Router } from "express";


const router = Router();
const {retrieve, retrieveAll, create, deleteProject, deleteProjects, updateProject} = new ProjectController();

router.route('/:name/:id').get(retrieve);
router.route('/:name').get(retrieveAll);
router.route('/').post(create);
router.route('/').delete(deleteProjects);
router.route('/:name/:id').delete(deleteProject);
router.route('/update/:id').put(updateProject);

export default router;
