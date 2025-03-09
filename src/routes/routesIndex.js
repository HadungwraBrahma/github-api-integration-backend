import express from "express";
import githubRoutes from "./githubRoutes.js";
import { getApiDocs } from "../controllers/githubController.js";

const router = express.Router();

// Route for API documentation
router.get("/", getApiDocs);

// GitHub routes
router.use("/github", githubRoutes);

export default router;
