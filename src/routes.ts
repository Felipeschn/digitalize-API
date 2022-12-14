import { Router } from "express";
import multer from "multer";
import { multerConfig } from "./config/multerConfig";
import { authMiddleware } from "./middlewares/auth";
import { authSessionController } from "./useCases/AuthSession";
import { createDocFileController } from "./useCases/CreateDocFile";
import { createDocFileUploadController } from "./useCases/CreateDocFileUpload";
import { createUserController } from "./useCases/CreateUser";
import { deleteDocFileController } from "./useCases/DeleteDocFile";
import { findDocFileController } from "./useCases/FindDocFile";
import { findUserController } from "./useCases/FindUser";
import { updateDocFileController } from "./useCases/UpdateDocFile";

const router = Router();

router.post(
  "/authenticate-session",
  async (req, resp) => await authSessionController.handle(req, resp)
);

// CRUD USER
router.post(
  "/user/register",
  async (req, resp) => await createUserController.handle(req, resp)
);
router.get(
  "/user/:userId",
  authMiddleware,
  async (req, resp) => await findUserController.handle(req, resp)
);

// CRUD DOCFILE
router.get(
  "/user-docfile/:userId",
  authMiddleware,
  async (req, resp) => await findDocFileController.handle(req, resp)
);
router.post(
  "/docfile/:userId/create",
  authMiddleware,
  async (req, resp) => await createDocFileController.handle(req, resp)
);
router.post(
  "/docfile/:userId/upload",
  authMiddleware,
  multer(multerConfig).single("file"),
  async (req, resp) => await createDocFileUploadController.handle(req, resp)
);

router.put(
  "/docfile/:docFileId/update",
  authMiddleware,
  async (req, resp) => await updateDocFileController.handle(req, resp)
);
router.delete(
  "/docfile/:docFileId/delete",
  authMiddleware,
  async (req, resp) => await deleteDocFileController.handle(req, resp)
);

export { router };
