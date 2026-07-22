# Sun Lab Website

Static research group website built with Jekyll. The website is hosted at `www.chongsun.org`.

Designed by Chong Sun <sunchong137@gmail.com>.

This repository can also be used as a template for another research group website. Most routine edits only require changing Markdown files, image files, or theme colors.

## Run Locally

Install the Ruby gems once:

```bash
bundle install
```

Start the local website:

```bash
bundle exec jekyll serve
```

Then open `http://localhost:4000`.

If you only want to check whether the site builds, run:

```bash
bundle exec jekyll build
```

The generated website is written to `_site/`. Do not edit files inside `_site/`; they are build output.

## Publish On GitHub Pages

Push this directory to a GitHub repository, then enable Pages in the repository settings. Use the branch that contains this site as the publishing source.

The `Gemfile` uses the official `github-pages` gem so local builds match GitHub Pages more closely.

For a custom domain, keep the `CNAME` file in the repository root and set the same domain in the GitHub Pages settings.

Typical publishing workflow:

```bash
bundle exec jekyll build
git status
git add .
git commit -m "Update website content"
git push
```

## Edit Content

Most content lives in Markdown files with YAML front matter at the top.

- Site settings and navigation: `_config.yml`
- Homepage: `index.md`
- Main pages: `pages/`
- News posts: `_posts/`
- People: `_members/`
- Research topics: `_research/`
- Publications: `_publications/preprint/`, `_publications/patent/`, and `_publications/peer_reviewed/`
- Wiki pages: `_wiki/`
- Theme colors: `assets/css/theme.css`
- Main styling: `assets/css/styles.css`
- JavaScript: `assets/js/main.js`
- Images: `assets/images/`

After editing Markdown or configuration files, rebuild the site with:

```bash
bundle exec jekyll build
```

When using `bundle exec jekyll serve`, many content edits reload automatically. If `_config.yml` changes, stop and restart the server.

## Adding People

Create one Markdown file per person in `_members/`. The homepage order is controlled by:

- `category`: one of `pi`, `postdoc`, `graduate`, `master`, or `undergraduate`
- `date`: used to sort people within each category
- `image`: path to the person photo, usually `/assets/images/member_photos/name.jpg`, or `/assets/images/default-user.svg`

The body text below the front matter becomes the short bio on the member detail page.

Example:

```markdown
---
title: Jane Doe
category: graduate
role: Graduate Student
date: 2026-08-01
image: /assets/images/member_photos/jane.jpg
email: jane.doe@rutgers.edu
website: https://example.com
google_scholar: https://scholar.google.com/
linkedin: https://www.linkedin.com/
---

Jane is interested in quantum chemistry and machine learning.
```

Put member photos in:

```text
assets/images/member_photos/
```

## Adding News

Create a Markdown file in `_posts/` with the filename format:

```text
YYYY-MM-DD-short-title.md
```

Example:

```markdown
---
layout: post
title: Welcome New Member
date: 2026-07-22
summary: A new student joined the Sun Lab.
---

Details of the news item go here.
```

Newest posts appear first.

## Adding Research Topics

Create one Markdown file per research topic in `_research/`.

Use front matter like:

```markdown
---
title: Quantum Materials
order: 2
image: /assets/images/research_images/quantum_materials.png
summary: Short summary for cards and previews.
---

Longer research description goes here.
```

Research images should go in:

```text
assets/images/research_images/
```

## Adding Publications

Create one Markdown file per publication in one of these folders:

```text
_publications/preprint/
_publications/patent/
_publications/peer_reviewed/
```

Recommended filename format:

```text
YYYY-MM-DD-Lastnameoffirstauthor_Firstwordoftitle_Journal.md
```

Example front matter:

```markdown
---
title: Ab initio quantum embedding at finite temperature with density matrix embedding theory
authors: Giordano, L.; Tan, Y. S.; Cui, Z.-H.; Sun, C.
year: 2026
journal: J. Chem. Phys.
volume: 164
pages: 154102
link: https://example.com/paper
software: https://example.com/code
figure: /assets/images/publication/quantum-embedding.svg
---
```

Publication figures should go in:

```text
assets/images/publication/
```

If `figure` is present, the publication card displays the image on the right.

## Adding Wiki Pages

Wiki pages live in `_wiki/`. Each large wiki category has its own folder:

```text
_wiki/amarel/
_wiki/scientific-packages/
_wiki/coding-and-version-control/
```

Example:

```markdown
---
title: PyTorch on Amarel
category: scientific-packages
order: 3
summary: How to create a PyTorch environment on Amarel.
---

Write the guide here.
```

The `category` value must match one of the category keys used in `pages/wiki.md`.

Current category keys:

- `amarel`
- `scientific-packages`
- `coding-and-version-control`

Use `order` to control display order inside a category. Code blocks in wiki pages automatically receive copy buttons.

## Editing Images

Homepage slideshow images are loaded from:

```text
assets/images/home_slides/
```

Add or remove image files in that folder to update the slideshow.

Recommended image locations:

- Logo: `assets/images/logo.png`
- Member photos: `assets/images/member_photos/`
- Research images: `assets/images/research_images/`
- Publication figures: `assets/images/publication/`
- Teaching images: `assets/images/teaching/`

## Editing Theme Colors

Most colors are defined in:

```text
assets/css/theme.css
```

Edit the `--color-*` values near the top of that file. For example:

```css
--color-rutgers-red: #cc0033;
--color-milk: #fffdfa;
--color-beige: #f7f1e7;
--color-terminal-purple: #300924;
```

Prefer changing `theme.css` before editing `styles.css`, unless you are changing layout or component behavior.

## Common Troubleshooting

If GitHub Pages shows unstyled text, check that `_config.yml` has the correct `url` and `baseurl`, then rebuild and push all assets.

If a new page does not appear:

- Check that the file has valid YAML front matter.
- Check that `category` and `order` are set correctly for collection pages.
- Make sure the file is committed and pushed.
- Restart `bundle exec jekyll serve` if `_config.yml` changed.

If Bundler has dependency issues, try:

```bash
bundle install
bundle exec jekyll build
```
