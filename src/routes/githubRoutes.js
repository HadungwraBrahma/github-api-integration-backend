import express from "express";
import {
  getUserProfile,
  getRepositoryDetails,
  createIssue,
} from "../controllers/githubController.js";

const router = express.Router();

// GET /github - Get user profile and repositories
router.get("/", getUserProfile);

// GET /github/:repoName - Get repository details
router.get("/:repoName", getRepositoryDetails);

// POST /github/:repoName/issues - Create new issue
router.post("/:repoName/issues", createIssue);

export default router;
