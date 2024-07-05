import { Router } from "express";
import { asyncHandler } from "@fcai-sis/shared-utilities";

import loginStudentHandler from "./logic/handlers/loginStudent.handler";
import loginEmployeeHandler from "./logic/handlers/loginEmployee.handler";
import loginAdminHandler from "./logic/handlers/loginAdmin.handler";
import loginInstructorHandler from "./logic/handlers/loginInstructor.handler";
import loginTaHandler from "./logic/handlers/loginTa.handler";

export default (router: Router) => {
  router.post("/student", asyncHandler(loginStudentHandler));
  router.post("/employee", asyncHandler(loginEmployeeHandler));
  router.post("/admin", asyncHandler(loginAdminHandler));
  router.post("/instructor", asyncHandler(loginInstructorHandler));
  router.post("/ta", asyncHandler(loginTaHandler));
};
