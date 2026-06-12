---
description: Delete every user (and their subscription) not present in the seed data
allowed-tools: Bash(grep:*), Bash(psql:*)
---

## Context

- Seed user emails: !`grep -A3 "INSERT INTO users" src/server/db/seeds/*.sql | grep -oE "'[^']+@[^']+'" | tr -d "'"`
- Current users: !`source .env 2>/dev/null; psql "$DATABASE_URL" -c "SELECT id, email, name, subscription_id FROM users;"`

## Task

1. Compare the "Current users" list against the "Seed user emails" list above.
2. For every user whose email is **not** in the seed list, delete it:
   `psql "$DATABASE_URL" -c "DELETE FROM users WHERE email = '<email>';"`
3. After deleting those users, remove any subscription that is no longer
   referenced by a user:
   `psql "$DATABASE_URL" -c "DELETE FROM subscriptions WHERE id NOT IN (SELECT subscription_id FROM users);"`
4. Report which users (and how many subscriptions) were removed. If every
   user is already in the seed list, say so and make no changes.
