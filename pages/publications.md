---
layout: page
title: Publications
permalink: /publications/
description: Selected papers and research outputs.
---

<p class="publication-note">The full publication list can be found on <a href="https://scholar.google.com/citations?user=KETTV4YAAAAJ&hl=en">Google Scholar</a>.</p>

{% assign all_pubs = site.publications | sort: "added" | reverse %}
{% assign pubs_by_year = site.publications | sort: "year" | reverse %}

<section class="publication-section">
  <h2>Highlights</h2>
  <div class="publication-list">
    {% for pub in pubs_by_year %}
    {% if pub.path contains "_publications/highlights/" %}
    {% assign paper_link = nil %}
    {% for link in pub.links %}
      {% if link.label == "Paper" or link.label == "Patent" or link.label == "Thesis" %}
        {% assign paper_link = link.url %}
      {% endif %}
    {% endfor %}
    <article class="publication{% if pub.image %} publication-with-image{% endif %}" id="{{ pub.title | slugify }}">
      <p class="pub-year">{{ pub.year }}</p>
      <div>
        <h3>{% if paper_link %}<a href="{{ paper_link }}">{{ pub.title }}</a>{% else %}{{ pub.title }}{% endif %}</h3>
        <p>{{ pub.authors }}</p>
        <p class="venue">{{ pub.venue }}</p>
        <p class="pub-links">
          {% for link in pub.links %}
          <a href="{{ link.url }}">{{ link.label }}</a>
          {% endfor %}
        </p>
      </div>
      {% if pub.image %}
      <div class="publication-figure">
        <img src="{{ pub.image | relative_url }}" alt="{{ pub.title }} figure">
      </div>
      {% endif %}
    </article>
    {% endif %}
    {% endfor %}
  </div>
</section>

<section class="publication-section">
  <h2>Recent Publications</h2>
  <div class="publication-list">
    {% for pub in all_pubs %}
    {% if pub.path contains "_publications/recents/" %}
    {% assign paper_link = nil %}
    {% for link in pub.links %}
      {% if link.label == "Paper" or link.label == "Patent" or link.label == "Thesis" %}
        {% assign paper_link = link.url %}
      {% endif %}
    {% endfor %}
    <article class="publication" id="{{ pub.title | slugify }}">
      <p class="pub-year">{{ pub.year }}</p>
      <div>
        <h3>{% if paper_link %}<a href="{{ paper_link }}">{{ pub.title }}</a>{% else %}{{ pub.title }}{% endif %}</h3>
        <p>{{ pub.authors }}</p>
        <p class="venue">{{ pub.venue }}</p>
        <p class="pub-links">
          {% for link in pub.links %}
          <a href="{{ link.url }}">{{ link.label }}</a>
          {% endfor %}
        </p>
      </div>
    </article>
    {% endif %}
    {% endfor %}
  </div>
</section>

<section class="publication-section publication-full-section">
  <h2>Full List</h2>
  <div class="publication-full-list">
    {% assign current_year = "" %}
    {% for pub in pubs_by_year %}
      {% assign pub_year = pub.year | append: "" %}
      {% if pub_year != current_year %}
        {% assign current_year = pub_year %}
        <h3 class="publication-year-heading">{{ pub.year }}</h3>
      {% endif %}
      {% assign paper_link = nil %}
      {% for link in pub.links %}
        {% if link.label == "Paper" or link.label == "Patent" or link.label == "Thesis" %}
          {% assign paper_link = link.url %}
        {% endif %}
      {% endfor %}
      <article class="publication-compact" id="{{ pub.title | slugify }}">
        <p>
          {% if paper_link %}<a href="{{ paper_link }}">{{ pub.title }}</a>{% else %}{{ pub.title }}{% endif %}
          <span>{{ pub.authors }} {{ pub.venue }}</span>
        </p>
      </article>
    {% endfor %}
  </div>
</section>
