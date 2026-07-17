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
- People: one file per person in `_members/`
- Projects: `_data/projects.yml`
- Publications: one file per publication in `_publications/preprint/`, `_publications/patent/`, or `_publications/peer_reviewed/`
- News posts: `_posts/`
- Pages: `pages/`

Update the people, projects, publications, posts, and contact details as the lab website evolves.

## Adding People

Create one Markdown file per person in `_members/`. The homepage order is controlled by:

- `category`: one of `pi`, `postdoc`, `graduate`, `master`, or `undergraduate`
- `date`: used to sort people within each category
- `image`: path to the person photo, usually `/assets/images/member_photos/name.jpg`, or `/assets/images/default-user.svg`

The body text below the front matter becomes the short bio on the member detail page.
