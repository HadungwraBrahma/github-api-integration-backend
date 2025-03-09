import dotenv from "dotenv";

dotenv.config();

// GitHub API configuration
export const GITHUB_API_BASE_URL = "https://api.github.com";
export const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// GitHub API headers
export const getGitHubHeaders = () => {
  return {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  };
};
