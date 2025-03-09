# GitHub API Integration

This project is an API that integrates with the GitHub API to fetch user data, repository details, and create issues in repositories. It is built using **Node.js** and **Express.js** and deployed on **Vercel**.

## 🚀 Live Demo

[GitHub API Integration Live](https://github-api-integration-bac-git-5397ed-hadungwrabrahmas-projects.vercel.app/)

## 📌 Features

- Fetches GitHub user profile information, including followers, following, repositories, etc.
- Retrieves detailed information about a specific repository.
- Allows users to create issues in a repository.

## 📁 API Endpoints

### Get GitHub Profile & Repositories

**Endpoint:** `GET /github`

**Response:**
```json
{
  "username": "your-github-username",
  "name": "Your Name",
  "bio": "Your bio",
  "location": "Your location",
  "followers": 100,
  "following": 50,
  "public_repos": 10,
  "avatar_url": "https://github.com/avatar.png",
  "profile_url": "https://github.com/your-github",
  "repositories": [
    {
      "name": "repo-name",
      "description": "Repo description",
      "stars": 5,
      "forks": 2,
      "language": "JavaScript",
      "url": "https://github.com/repo-name"
    }
  ]
}
```

### Get Repository Details
**Endpoint:** `GET /github/:repoName`

**Response:**
```json
{
  "name": "repo-name",
  "description": "Repository description",
  "stars": 10,
  "forks": 3,
  "watchers": 8,
  "open_issues": 2,
  "languages": { "JavaScript": 80, "HTML": 20 },
  "repo_url": "https://github.com/your-github/repo-name",
  "recent_commits": [
    {
      "sha": "commit-hash",
      "message": "Commit message",
      "author": "Author name",
      "date": "2024-03-09T12:00:00Z"
    }
  ]
}
```

### Create an Issue in a Repository
**Endpoint:** `POST /github/:repoName/issues`

**Request Body:**
```json
{
  "title": "Issue title",
  "body": "Issue description"
}
```

**Response:**
```json
{
  "message": "Issue created successfully",
  "issue_number": 1,
  "issue_url": "https://github.com/your-github/repo-name/issues/1"
}
```

## 🛠 Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/HadungwraBrahma/github-api-integration-backend.git
   cd github-api-integration-backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file and add your GitHub Personal Access Token:
   ```sh
   GITHUB_TOKEN=your_personal_access_token
   GITHUB_USERNAME=your_github_username
   PORT=3000
   ```

4. Start the development server:
   ```sh
   npm run dev
   ```

5. Run the production server:
   ```sh
   npm start
   ```

## 🚀 Deployment

This project is deployed on **Vercel**.

- To deploy, push changes to the main branch, and Vercel will automatically build and deploy your API.
- You can manually deploy using:
  ```sh
  vercel
  ```

## 💡 Author

**Hadungwra Brahma**
- GitHub: [Hadungwra Brahma](https://github.com/hadungwrabrahma)
- LinkedIn: [Hadungwra Brahma](https://www.linkedin.com/in/hadungwra-brahma)

---

Made with ❤️ by Hadungwra Brahma

