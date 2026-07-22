---
title: Python Environments
category: scientific-packages
order: 1
summary: Notes for reproducible Python environments used in the group.
---

Use this page for recommended Python, Conda, Mamba, or virtual environment setup.

### Checklist

- Record the package manager and Python version
- Keep environment files in the project repository
- Pin important scientific packages when reproducibility matters
- Document GPU-specific installation steps separately

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
```
