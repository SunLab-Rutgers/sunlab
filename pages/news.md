---
layout: page
title: News
permalink: /news/
description: Announcements, awards, publications, and group updates.
---

<div class="news-list">
  {% for post in site.posts %}
    <article class="news-row">
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %-d, %Y" }}</time>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <p>{{ post.excerpt | strip_html | truncate: 180 }}</p>
    </article>
  {% endfor %}
</div>
