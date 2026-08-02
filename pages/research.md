---
layout: page
title: Research
permalink: /research/
description: Computational tools for chemistry, materials science, quantum materials, and renewable energy.
---

<div class="research-summary">
  <p>We develop and apply computational tools to tackle challenging problems in chemistry and materials science. Our research is highly interdisciplinary, integrating quantum chemistry, machine learning, condensed matter theory, and quantum information. We apply our computational frameworks to discover next-generation renewable energy solutions, addressing the energy crisis and environmental challenges. We also design quantum materials with exotic physical properties, aiming to lay the foundation for the next technological revolution.</p>
</div>

{% assign projects = site.research | sort: "order" %}

<section class="research-group">
  <h2 class="research-group-title">Systems we study</h2>
  <div class="project-grid research-page-grid">
  {% for project in projects limit:3 %}
    <article class="card" id="{{ project.title | slugify }}">
      {% if project.image %}
        <img class="card-figure research-figure" src="{{ project.image | relative_url }}" alt="">
      {% endif %}
      <h2>{{ project.title }}</h2>
      <p>{{ project.summary }}</p>
      <div class="tags">
        {% for tag in project.tags %}
          <span>{{ tag }}</span>
        {% endfor %}
      </div>
    </article>
  {% endfor %}
  </div>
</section>

<section class="research-group">
  <h2 class="research-group-title">Methods we develop</h2>
  <div class="project-grid research-page-grid">
  {% for project in projects offset:3 limit:3 %}
    <article class="card" id="{{ project.title | slugify }}">
      {% if project.image %}
        <img class="card-figure research-figure" src="{{ project.image | relative_url }}" alt="">
      {% endif %}
      <h2>{{ project.title }}</h2>
      <p>{{ project.summary }}</p>
      <div class="tags">
        {% for tag in project.tags %}
          <span>{{ tag }}</span>
        {% endfor %}
      </div>
    </article>
  {% endfor %}
  </div>
</section>
