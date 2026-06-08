# Self-Hosted Runner Guide

This guide explains how to configure a self-hosted runner for this project.

## How Deployment Works

This project supports both runner types for deployment:

- **Self-hosted runner:** used when a runner is configured in GitHub and is online.
- **GitHub-managed runner:** used as a fallback when the self-hosted runner is not available.

The workflow first checks whether a repository self-hosted runner is online. If it is online, the deployment runs on the self-hosted runner. If it is offline or not configured, the workflow continues with the GitHub-managed fallback job.

## Self-Hosted Runner Prerequisites

Before running this workflow on a self-hosted runner, install Docker on the self-hosted runner machine.

This is required because the deployment workflow uses Appleboy SSH/SCP actions, and those actions run as Docker-based actions on the self-hosted runner.

Minimum runner requirements:

- Linux server, for example Ubuntu EC2
- GitHub self-hosted runner configured and online
- Docker installed and running
- Runner user can run Docker commands

Install Docker and allow the runner user to access it:

```bash
sudo apt-get update
sudo apt-get install -y docker.io
sudo usermod -aG docker $USER
```

Restart the runner service after adding the user to the Docker group:

```bash
sudo ./svc.sh stop
sudo ./svc.sh start
sudo ./svc.sh status
```

If Docker permission still fails, reboot once:

```bash
sudo reboot
```

After logging back in, verify Docker works without `sudo`:

```bash
groups
docker ps
```

To check live self-hosted runner logs:

```bash
sudo journalctl -u actions.runner.* -f
```

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

After configuration, run the runner as a background service:

```bash
sudo ./svc.sh install
sudo ./svc.sh start
sudo ./svc.sh status
```

Useful commands:

```bash
sudo ./svc.sh stop
sudo ./svc.sh restart
sudo ./svc.sh status
```

Then confirm it is available:

```text
Repository -> Settings -> Actions -> Runners
```

The runner should show `Online` or `Idle`.

## If You Previously Used `./run.sh`

If you started the runner manually with `./run.sh` and see `A session for this runner already exists`, stop the old process:

```bash
ps aux | grep -i runner
sudo pkill -f Runner.Listener
```

Then start the runner using the service commands from step 3.

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
