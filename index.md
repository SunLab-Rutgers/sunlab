---
layout: default
title: Home
description: We develop computational tools to accelerate the exploration and discovery of exotic quantum matters.
---

<section class="hero">
  <div class="container hero-grid">
    <div>
      <h1 class="hero-title">Accelerating Quantum Science with Theoretical Chemistry</h1>
      <p class="lede">We develop computational tools to accelerate the exploration and discovery of exotic quantum matters.</p>
      <div class="hero-actions">
        <a class="button primary" href="{{ '/research/' | relative_url }}">Explore Research</a>
        <a class="button secondary" href="{{ '/contact/' | relative_url }}">Join Us</a>
      </div>
    </div>
    {% assign home_slides = site.static_files | where_exp: "file", "file.path contains '/assets/images/home_slides/'" | sort: "path" %}
    {% assign home_slide_count = 0 %}
    {% for slide in home_slides %}
      {% assign slide_ext = slide.extname | downcase %}
      {% if slide_ext == ".jpg" or slide_ext == ".jpeg" or slide_ext == ".png" or slide_ext == ".webp" or slide_ext == ".gif" or slide_ext == ".svg" %}
        {% assign home_slide_count = home_slide_count | plus: 1 %}
      {% endif %}
    {% endfor %}
    <figure class="hero-slideshow" aria-label="Research group image slideshow">
      {% assign home_slide_index = 0 %}
      {% for slide in home_slides %}
        {% assign slide_ext = slide.extname | downcase %}
        {% if slide_ext == ".jpg" or slide_ext == ".jpeg" or slide_ext == ".png" or slide_ext == ".webp" or slide_ext == ".gif" or slide_ext == ".svg" %}
          {% assign home_slide_index = home_slide_index | plus: 1 %}
          <div class="hero-slide{% if home_slide_index == 1 %} is-active{% endif %}">
            <img src="{{ slide.path | relative_url }}" alt="">
          </div>
        {% endif %}
      {% endfor %}
      {% if home_slide_count == 0 %}
        <div class="hero-slide is-active">
          <img src="{{ '/assets/images/hero-research.svg' | relative_url }}" alt="">
        </div>
      {% endif %}
      {% if home_slide_count > 1 %}
        <figcaption class="hero-slide-controls" aria-label="Choose slideshow image">
          {% assign home_slide_index = 0 %}
          {% for slide in home_slides %}
            {% assign slide_ext = slide.extname | downcase %}
            {% if slide_ext == ".jpg" or slide_ext == ".jpeg" or slide_ext == ".png" or slide_ext == ".webp" or slide_ext == ".gif" or slide_ext == ".svg" %}
              {% assign home_slide_index = home_slide_index | plus: 1 %}
              <button type="button"{% if home_slide_index == 1 %} class="is-active" aria-current="true"{% endif %} aria-label="Show slideshow image {{ home_slide_index }}"></button>
            {% endif %}
          {% endfor %}
        </figcaption>
      {% endif %}
    </figure>
  </div>
</section>

<section class="section">
  <div class="container home-research">
    <a class="eyebrow eyebrow-link" href="{{ '/research/' | relative_url }}">Research</a>
    <div class="project-grid">
      {% assign projects = site.research | sort: "order" %}
      {% for project in projects limit:3 %}
        <article class="card">
          {% if project.image %}
            <img class="card-figure" src="{{ project.image | relative_url }}" alt="">
          {% endif %}
          <h3>{{ project.title }}</h3>
          <p>{{ project.summary }}</p>
          <div class="tags">
            {% for tag in project.tags %}
              <span>{{ tag }}</span>
            {% endfor %}
          </div>
        </article>
      {% endfor %}
    </div>
  </div>
</section>

<section class="section accent">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow">Latest News</p>
      <h2>Recent updates from the group.</h2>
    </div>
    <div class="news-grid">
      {% for post in site.posts limit:3 %}
        <article class="news-card">
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %-d, %Y" }}</time>
          <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
          <p>{{ post.excerpt | strip_html | truncate: 130 }}</p>
        </article>
      {% endfor %}
    </div>
  </div>
</section>
