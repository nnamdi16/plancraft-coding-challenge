import ProjectController from "../../controllers/project";
import { Router } from "express";


const router = Router();
const api = new ProjectController();

router.route('/:name/:id').get(api.retrieve);
router.route('/:name').get(api.retrieveAll);
router.route('/').post(api.create);
router.route('/').delete(api.deleteProjects);
router.route('/:name/:id').delete(api.deleteProject);
router.route('/update/:id').put(api.updateProject);

export default router;
