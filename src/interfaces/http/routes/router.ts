import express, { Router } from "express";

import cors from "cors";
import errorHandler from "../../../infrastructure/middlewares/errorHandler";
import helmet from "helmet";
import morgan from "morgan";
import config from './../../../config/index'
import { logger, morganOption } from "../../../infrastructure/logger/index";
import projectRoutes from '@interfaces/http/routes/v1/project';

/**
 * Configures express middlewares
 */
export default () => {
  const router = Router();

  logger.info('We are routing at the moment')
router.use(helmet());
const NODE_ENV = config.get("app.env");
router.use(morgan('combined', NODE_ENV === "production" ? "combined" : morganOption));

const bodyLimit = config.get("app.bodyLimit");
router.use(
  express.json({
    limit: bodyLimit,
  }),
);
router.use(express.urlencoded({ extended: false, limit: bodyLimit }));

  // Setup CORS
  const allowedOrigins = config.get("app.allowedOrigins");
  router.use(
    cors({
      origin: (origin, cb) => {
        if (allowedOrigins.trim() === "*") {
          cb(null, true);
        } else {
          const origins = allowedOrigins.split(",");
          console.log(origins)
          if (origins.indexOf(origin as string) !== -1 || !origin) {
            cb(null, true);
          } else {
            cb(new Error(`Origin('${origin}') not allowed`));
          }
        }
      },
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    }),
  );

  router.get("/", (req, res) => {
    return res.json({
      message: "Sample API template using Clean Architecture",
    })
  });
  
  router.use("/v1/project", projectRoutes);

  router.use(errorHandler);

  return router;
};