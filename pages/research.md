---
layout: page
title: Research
permalink: /research/
description: Computational tools for chemistry, materials science, quantum materials, and renewable energy.
---

<div class="research-summary">
  <p>We develop and apply computational tools to tackle challenging problems in chemistry and materials science. Our research is highly interdisciplinary, integrating quantum chemistry, machine learning, condensed matter theory, and quantum information. We apply our computational frameworks to discover next-generation renewable energy solutions, addressing the energy crisis and environmental challenges. We also design quantum materials with exotic physical properties, aiming to lay the foundation for the next technological revolution.</p>
</div>

<div class="project-grid">
  {% assign projects = site.research | sort: "order" %}
  {% for project in projects %}
    <article class="card">
      {% if project.image %}
        <img class="card-figure" src="{{ project.image | relative_url }}" alt="">
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
