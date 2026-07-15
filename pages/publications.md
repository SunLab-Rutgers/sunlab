---
layout: page
title: Publications
permalink: /publications/
description: Selected papers and research outputs.
---

<div class="publication-list">
  {% assign pubs = site.data.publications | sort: "year" | reverse %}
  {% for pub in pubs %}
    <article class="publication">
      <p class="pub-year">{{ pub.year }}</p>
      <div>
        <h2>{{ pub.title }}</h2>
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
