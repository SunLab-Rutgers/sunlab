---
layout: page
title: People
permalink: /people/
description: Faculty, students, and collaborators in the research group.
---

<div class="people-grid">
  {% for person in site.data.people %}
    <article class="person-card">
      {% if person.image %}
        <img class="person-photo" src="{{ person.image | relative_url }}" alt="">
      {% else %}
        <div class="avatar" aria-hidden="true">{{ person.name | slice: 0 }}</div>
      {% endif %}
      <div>
        <h2>{{ person.name }}</h2>
        <p class="role">{{ person.role }}</p>
        <p>{{ person.focus }}</p>
        <p class="person-links">
          <a href="mailto:{{ person.email }}">Email</a>
          <a href="{{ person.website }}">Website</a>
        </p>
      </div>
    </article>
  {% endfor %}
</div>
