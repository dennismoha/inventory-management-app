# About

This project is a custom inventory management system designed for a small shop. It includes:

- **Frontend**: Built using Next.js
- **Backend**: Built using Node.js and Express

### Branching Structure

- **Feature Branches**: Each feature is developed in a separate branch:
  - Frontend features are in branches named `frontend/feature/featurename`.
  - Backend features are in branches named `backend/feature/featurename`.
  
- **Main Branch**: The `main` branch contains the final, stable code.

- **Development Flow**:
  - All feature branches are rebased from the `develop` branch.
  - All pull requests (PRs) are made to the `develop` branch.

### Notes

- The `docs` folder is not relevant for the project and can be ignored.
- Both the backend and frontend contain detailed `README.md` files explaining the project structure and how to run the application.
- The entire project is written in TypeScript.

# Deployment

## Backend

- The backend is deployed on render through githubActions.
- on the root of this , go check the workflows on github actions
- the server.yml workflow is responsible for deploying the code to render.

# caveats.
1)  When deploying on render, don't add `NODE_ENV` others you will get issues with `tscp` as noted here `https://community.render.com/t/tsc-not-found-during-build/6428`

2) To understand how to fully setup a `github Action render deployment` check out this link from render. <a href="https://render.com/docs/cli?_gl=1*vyo77d*_gcl_au*MTY5Nzk3NzExOS4xNzMxOTM1NjQw*_ga*NTQzNzk3MjQ4LjE3MTY0OTU5ODI.*_ga_QK9L9QJC5N*MTczNjU4MzA3MC4yNi4xLjE3MzY1ODM2MTYuNjAuMC4w#example-github-actions">Deploy to render from github actions </a>

3) To successfully get the render_service id which might be an issue follow this instruction on this video.
<iframe width="560" height="315" src="https://www.youtube.com/embed/DBlmF91Accg?si=Ze1lKvN6zpphtwiE&amp;start=458" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

5) The render API. To fetch this either use the above link or use this link <a href="https://render.com/docs/api"> render api key</a>

6) To setup postgresql for render and retrieve the database url. follow the following instructions from render <a href="https://render.com/docs/postgresql-creating-connecting#create-your-database">Render postgresql database </a>
## Frontend.


