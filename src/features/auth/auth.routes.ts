import { Router } from "express";
import { asyncHandler } from "@fcai-sis/shared-utilities";

import loginStudentHandler from "./logic/handlers/loginStudent.handler";
import loginEmployeeHandler from "./logic/handlers/loginEmployee.handler";

export default (router: Router) => {
  router.post(
    "/student",

    asyncHandler(loginStudentHandler)
  );

  router.post(
    "/employee",

    asyncHandler(loginEmployeeHandler)
  );
};
