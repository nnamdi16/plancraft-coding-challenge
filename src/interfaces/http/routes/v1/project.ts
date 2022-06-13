import ProjectController from "../../controllers/project";
import { Router } from "express";


const router = Router();
const api = new ProjectController();

router.route('/:id').get(api.retrieve);
router.route('/').get(api.retrieveAll);
router.route('/').post(api.create);
router.route('/').delete(api.deleteProjects);
router.route('/:id').delete(api.deleteProject);
router.route('/:id').put(api.updateProject);

export default router;
