# Self-Hosted Runner Guide

This guide explains how to configure a self-hosted runner for this project.

## How Deployment Works

This project supports both runner types for deployment:

- **Self-hosted runner:** used when a runner is configured in GitHub and is online.
- **GitHub-managed runner:** used as a fallback when the self-hosted runner is not available.

The workflow first checks whether a repository self-hosted runner is online. If it is online, the deployment runs on the self-hosted runner. If it is offline or not configured, the workflow continues with the GitHub-managed fallback job.

## What You Need

Add these in:

```text
Repository -> Settings -> Secrets and variables -> Actions
```

### Secrets

| Secret | Purpose |
| --- | --- |
| `DOCKERHUB_TOKEN` | Docker Hub login |
| `DB_PASSWORD` | Database password |
| `EC2_SSH_HOST` | Server public IP or DNS |
| `EC2_SSH_USER` | SSH username, for example `ubuntu` |
| `EC2_SSH_PRIVATE_KEY` | Private key for SSH access |
| `MY_GITHUB_PAT` | Checks if the self-hosted runner is online |

### Variables

| Variable | Example |
| --- | --- |
| `DOCKERHUB_USERNAME` | your Docker Hub username |
| `DB_NAME` | `taskmanager` |
| `DB_HOST` | `db` |
| `DB_USER` | `root` |
| `PORT` | `3000` |

## Setup Self-Hosted Runner

### 1. Open Runner Setup in GitHub

Go to:

```text
Repository -> Settings -> Actions -> Runners -> New self-hosted runner
```

Choose:

```text
Linux
x64
```

GitHub will show setup commands for your repository. Copy and run those commands on your server.

Use the commands shown by GitHub, because the runner download version and token can change.

### 2. Keep the Default Label

When GitHub asks for runner labels, keep the default label:

```text
self-hosted
```

This project uses that label in the deployment workflow:

```yaml
runs-on: self-hosted
```

### 3. Start the Runner

After configuration, start the runner using the service commands shown by GitHub.

Then confirm it is available:

```text
Repository -> Settings -> Actions -> Runners
```

The runner should show `Online` or `Idle`.

## Run the Workflow

Go to:

```text
Actions -> DevSecOps Complete Pipeline -> Run workflow
```

Expected behavior:

1. If the self-hosted runner is online, deployment runs on the self-hosted runner.
2. If the self-hosted runner is offline, deployment uses the GitHub-managed fallback job.

## Quick Checks

If the workflow does not use the self-hosted runner, check:

- The runner is visible in GitHub under `Settings -> Actions -> Runners`.
- The runner status is `Online` or `Idle`.
- The runner has the `self-hosted` label.
- `MY_GITHUB_PAT` is configured correctly.
