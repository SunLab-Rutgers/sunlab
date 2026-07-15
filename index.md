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
        <a class="button secondary" href="{{ '/contact/' | relative_url }}">Join or Collaborate</a>
      </div>
    </div>
    <figure class="hero-slideshow" aria-label="Research group image slideshow">
      <div class="hero-slide is-active">
        <img src="{{ '/assets/images/hero-research.svg' | relative_url }}" alt="Abstract blue illustration of researchers, data, and scientific systems">
      </div>
      <div class="hero-slide">
        <img src="{{ '/assets/images/hero-collaboration.svg' | relative_url }}" alt="Blue illustration of a collaborative research meeting with shared data displays">
      </div>
      <div class="hero-slide">
        <img src="{{ '/assets/images/hero-fieldwork.svg' | relative_url }}" alt="Blue illustration of field sensing data connected to a research dashboard">
      </div>
      <figcaption class="hero-slide-controls" aria-label="Choose slideshow image">
        <button type="button" class="is-active" aria-label="Show research systems image" aria-current="true"></button>
        <button type="button" aria-label="Show collaboration image"></button>
        <button type="button" aria-label="Show fieldwork image"></button>
      </figcaption>
    </figure>
  </div>
</section>

<section class="section">
  <div class="container split">
    <div>
      <p class="eyebrow">Research</p>
      <h2>Systems that support careful decisions under real constraints.</h2>
    </div>
    <div class="stack">
      {% for project in site.data.projects limit:3 %}
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
