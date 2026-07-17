---
layout: page
title: Publications
permalink: /publications/
description: Selected papers and research outputs.
---

{% assign groups = "Preprints|Patent|Peer-reviewed" | split: "|" %}

{% for group in groups %}
{% assign pubs = site.data.publications | where: "category", group | sort: "number" | reverse %}
{% if pubs.size > 0 %}
<section class="publication-section">
  <h2>{{ group }}</h2>
  <div class="publication-list">
    {% for pub in pubs %}
    <article class="publication">
      <p class="pub-year">{{ pub.year }}</p>
      <div>
        <h3>{{ pub.title }}</h3>
        <p>{{ pub.authors }}</p>
        <p class="venue">{{ pub.venue }}</p>
        <p class="pub-links">
          {% for link in pub.links %}
          <a href="{{ link[1] }}">{{ link[0] | capitalize }}</a>
          {% endfor %}
        </p>
      </div>
    </article>
    {% endfor %}
  </div>
</section>
{% endif %}
{% endfor %}
