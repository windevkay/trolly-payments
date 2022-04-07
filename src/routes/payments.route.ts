import express, { Router, Request, Response } from "express";
import { body } from "express-validator";
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  NotAuthorizedError,
  BadRequestError,
} from "@stagefirelabs/common";

import { natsWrapper } from "../nats.wrapper";

const router: Router = express.Router();

export { router as paymentsRouter };
