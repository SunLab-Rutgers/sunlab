---
layout: page
title: Group Alumni
permalink: /alumni/
description: Alumni of the Sun Lab.
alumni:
  - name: Joshua Li
    role: UG 2025-2026
---

{% for person in page.alumni %}
- {% if person.url %}[{{ person.name }}]({{ person.url }}){% else %}{{ person.name }}{% endif %}{% if person.role %} ({{ person.role }}){% endif %}
{% endfor %}
