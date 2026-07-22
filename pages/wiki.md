---
layout: page
title: Wiki
permalink: /wiki/
description: Group documentation, onboarding notes, and shared technical references.
---

{% assign categories = "amarel|Amarel,scientific-packages|Scientific Packages,coding-and-version-control|Coding and Version Control" | split: "," %}

<div class="wiki-layout">
  <aside class="wiki-sidebar" aria-label="Wiki navigation">
    <p class="wiki-sidebar-title">Contents</p>
    {% for category in categories %}
      {% assign parts = category | split: "|" %}
      {% assign category_key = parts[0] %}
      {% assign category_label = parts[1] %}
      {% assign docs = site.wiki | where: "category", category_key | sort: "order" %}
      <details class="wiki-menu-group" open>
        <summary>{{ category_label }}</summary>
        <nav>
          {% for doc in docs %}
            <a href="#{{ doc.title | slugify }}">{{ doc.title }}</a>
          {% endfor %}
        </nav>
      </details>
    {% endfor %}
  </aside>

  <div class="wiki-content">
    {% for category in categories %}
      {% assign parts = category | split: "|" %}
      {% assign category_key = parts[0] %}
      {% assign category_label = parts[1] %}
      {% assign docs = site.wiki | where: "category", category_key | sort: "order" %}
      <section class="wiki-section" id="{{ category_label | slugify }}">
        <h2>{{ category_label }}</h2>
        {% for doc in docs %}
          <article class="wiki-doc" id="{{ doc.title | slugify }}">
            <div class="wiki-doc-header">
              <h3>{{ doc.title }}</h3>
            </div>
            <div class="wiki-doc-body">
              {{ doc.content }}
            </div>
          </article>
        {% endfor %}
      </section>
    {% endfor %}
  </div>
</div>
