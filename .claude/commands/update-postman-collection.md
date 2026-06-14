---
description: Read a Notion task and add/update the Postman requests needed to test it
allowed-tools: Bash(curl:*), Bash(python3:*), Bash(source:*), Bash(git:*), Bash(find:*), Bash(grep:*), Bash(cat:*), Bash(rm:*), Bash(ls:*), Read, mcp__claude_ai_Notion__notion-fetch, mcp__claude_ai_Notion__notion-search
argument-hint: <notion-task-url>
---

## Context

- Postman collection: "Tagus Score API" (id `9faec05e-1701-4578-ae0a-a6a3e531708a`), at `https://api.getpostman.com/collections/9faec05e-1701-4578-ae0a-a6a3e531708a` with header `X-Api-Key: $POSTMAN_API_KEY` (`POSTMAN_API_KEY` is in `.env`, load it with `source .env`).
- Collection variables: `base_url` (`http://localhost:5000`) and `token` (filled automatically by the "Login - Success" request's test script).
- Error codes live in `src/shared/errorCodes.ts`.
- Implementation work for a task may already be done, in progress in a `worktrees/worktree-task-*` directory, or not started.

## Task

Notion task URL: $1

1. Fetch the Notion page above and read its "Descrição" property — it describes the endpoint(s) to test: method, path, auth requirements, request/response shapes, and error/edge cases.
2. Look for an existing implementation of these endpoint(s) in the codebase, including any `worktrees/worktree-task-*` directories for this task (check `routes/`, `middleware/`, `shared/errorCodes.ts`).
   - If it exists, base the Postman requests on the real implementation (exact paths, headers, status codes, error codes, response field names).
   - If it doesn't exist yet (or is incomplete), base the requests on the task's "Descrição" contract instead.
3. Fetch the current Postman collection via the API (`GET` the URL above) and inspect its existing folders/requests so you don't duplicate anything already covering this endpoint.
4. Add or update a folder/requests for this task, following the conventions of the existing "Auth" folder:
   - One request per scenario: the success case plus each error/edge case from the task description (e.g. missing auth, invalid input, not found).
   - A `pm.test` script per request asserting status code and response shape/`errorCode`.
   - A `description` on each request naming the task (e.g. "Task 2.002 - POST /api/agents/me/forms") and showing the expected request/response.
   - Reuse `{{base_url}}` and `{{token}}`; for protected routes use the `auth: { type: "bearer", bearer: [...] }` pattern with `{{token}}` (or a hardcoded invalid value for invalid-token cases).
5. `PUT` the updated collection back to the API.
6. Report which requests were added or updated, and flag any mismatch you noticed between the Notion task description and the actual implementation (if one exists).

## Constraints

- This is Postman-only: do NOT create, edit, or modify any file in the project (no routes, migrations, types, etc.), in the main worktree or any `worktrees/` directory.
- Never print the raw `POSTMAN_API_KEY` value.
