---
layout: page
title: Publications
permalink: /publications/
description: Selected papers and research outputs.
---

{% assign groups = "preprint|Preprints,patent|Patent,peer_reviewed|Peer-reviewed" | split: "," %}

{% for group in groups %}
{% assign group_parts = group | split: "|" %}
{% assign group_key = group_parts[0] %}
{% assign group_label = group_parts[1] %}
{% assign pubs = site.publications | where: "category", group_key | sort: "added" | reverse %}
{% if pubs.size > 0 %}
<section class="publication-section">
  <h2>{{ group_label }}</h2>
  <div class="publication-list">
    {% for pub in pubs %}
    <article class="publication{% if pub.image %} publication-with-image{% endif %}">
      <p class="pub-year">{{ pub.year }}</p>
      <div>
        <h3>{{ pub.title }}</h3>
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
    {% endfor %}
  </div>
</section>
{% endif %}
{% endfor %}
