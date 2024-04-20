import { Router } from "express";

import authRoutes from "./features/auth/auth.routes";

const router: Router = Router();

export default (): Router => {
  authRoutes(router);

  return router;
};
