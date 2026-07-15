---
layout: page
title: Research
permalink: /research/
description: Our work combines systems, human-computer interaction, visualization, and applied AI.
---

<div class="project-grid">
  {% for project in site.data.projects %}
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
