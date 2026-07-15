# Sun Lab Website

Static research group website built with Jekyll.

## Run Locally

```bash
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`.

## Publish On GitHub Pages

Push this directory to a GitHub repository, then enable Pages in the repository settings. Use the branch that contains this site as the publishing source. The `Gemfile` uses the official `github-pages` gem so local builds match GitHub Pages more closely.

## Edit Content

- Site settings: `_config.yml`
- People: `_data/people.yml`
- Projects: `_data/projects.yml`
- Publications: `_data/publications.yml`
- News posts: `_posts/`
- Pages: `pages/`

Update the people, projects, publications, posts, and contact details as the lab website evolves.
