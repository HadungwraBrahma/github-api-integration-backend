import axios from "axios";
import {
  GITHUB_API_BASE_URL,
  GITHUB_USERNAME,
  getGitHubHeaders,
} from "../config/github.js";

// Get user GitHub profile and repositories
export const getUserProfile = async (req, res, next) => {
  try {
    // Get user data
    const userResponse = await axios.get(
      `${GITHUB_API_BASE_URL}/user`,
      getGitHubHeaders()
    );

    // Get repositories
    const reposResponse = await axios.get(
      `${GITHUB_API_BASE_URL}/user/repos?sort=updated&per_page=10`,
      getGitHubHeaders()
    );

    // Format repositories data
    const repositories = reposResponse.data.map((repo) => ({
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      url: repo.html_url,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
    }));

    // Construct response
    const userData = {
      username: userResponse.data.login,
      name: userResponse.data.name,
      bio: userResponse.data.bio,
      location: userResponse.data.location,
      followers: userResponse.data.followers,
      following: userResponse.data.following,
      public_repos: userResponse.data.public_repos,
      avatar_url: userResponse.data.avatar_url,
      profile_url: userResponse.data.html_url,
      repositories: repositories,
    };

    res.json(userData);
  } catch (error) {
    next(error);
  }
};

// Get repository details
export const getRepositoryDetails = async (req, res, next) => {
  try {
    const { repoName } = req.params;

    // Get repository details
    const repoResponse = await axios.get(
      `${GITHUB_API_BASE_URL}/repos/${GITHUB_USERNAME}/${repoName}`,
      getGitHubHeaders()
    );

    // Get repository languages
    const languagesResponse = await axios.get(
      `${GITHUB_API_BASE_URL}/repos/${GITHUB_USERNAME}/${repoName}/languages`,
      getGitHubHeaders()
    );

    // Get recent commits
    const commitsResponse = await axios.get(
      `${GITHUB_API_BASE_URL}/repos/${GITHUB_USERNAME}/${repoName}/commits?per_page=5`,
      getGitHubHeaders()
    );

    // Format commits data
    const commits = commitsResponse.data.map((commit) => ({
      sha: commit.sha,
      message: commit.commit.message,
      author: commit.commit.author.name,
      date: commit.commit.author.date,
      url: commit.html_url,
    }));

    // Construct response
    const repoData = {
      name: repoResponse.data.name,
      full_name: repoResponse.data.full_name,
      description: repoResponse.data.description,
      stars: repoResponse.data.stargazers_count,
      forks: repoResponse.data.forks_count,
      watchers: repoResponse.data.watchers_count,
      open_issues: repoResponse.data.open_issues_count,
      default_branch: repoResponse.data.default_branch,
      created_at: repoResponse.data.created_at,
      updated_at: repoResponse.data.updated_at,
      languages: languagesResponse.data,
      license: repoResponse.data.license,
      topics: repoResponse.data.topics,
      homepage: repoResponse.data.homepage,
      repo_url: repoResponse.data.html_url,
      recent_commits: commits,
    };

    res.json(repoData);
  } catch (error) {
    next(error);
  }
};

// Create issue in repository
export const createIssue = async (req, res, next) => {
  try {
    const { repoName } = req.params;
    const { title, body } = req.body;

    // Validation
    if (!title) {
      const error = new Error("Issue title is required");
      error.statusCode = 400;
      throw error;
    }

    // Create issue
    const issueResponse = await axios.post(
      `${GITHUB_API_BASE_URL}/repos/${GITHUB_USERNAME}/${repoName}/issues`,
      { title, body },
      getGitHubHeaders()
    );

    res.status(201).json({
      message: "Issue created successfully",
      issue_number: issueResponse.data.number,
      issue_url: issueResponse.data.html_url,
    });
  } catch (error) {
    next(error);
  }
};

// API documentation route handler
export const getApiDocs = (req, res) => {
  res.json({
    message: "GitHub API Integration",
    endpoints: [
      {
        path: "/github",
        method: "GET",
        description: "Get GitHub user profile and repositories information",
      },
      {
        path: "/github/:repoName",
        method: "GET",
        description: "Get detailed information about a specific repository",
      },
      {
        path: "/github/:repoName/issues",
        method: "POST",
        description: "Create a new issue in a repository",
        body: { title: "string (required)", body: "string (optional)" },
      },
    ],
  });
};
