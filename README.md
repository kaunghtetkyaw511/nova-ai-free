# Nova AI Free

An installable, mobile-friendly creative workspace that runs a small AI model locally in the browser.

## Live app

https://kaunghtetkyaw511.github.io/nova-ai-free/

## Included

- Free local AI chat powered by WebLLM and Qwen
- English/Myanmar interface with answers in 12 languages
- Source-backed world knowledge using Wikipedia, Wikidata, Wikinews, and Crossref
- Daily Assistant, Smart Planner, Study Tutor, and Quick Calculator
- Writing, translation, summarizing, ideation, and coding modes
- Browser photo editor with PNG export
- Browser video trim, speed, mute, preview, and WebM export
- Responsive mobile interface and installable PWA shell
- Local activity history and dark mode

## Privacy and cost

AI prompts are processed on the user's device after the model is downloaded. There is no API key or per-message charge. The first model load requires internet access and roughly 190 MB on iPhone or 350 MB on desktop/Android.

World Knowledge mode contacts free public information services to retrieve current source excerpts and citations. No AI system can guarantee perfect or 99% knowledge, so Nova labels uncertainty when reliable evidence is unavailable.

## Local development

```sh
npm start
```

Open http://localhost:3000.

Modern browsers with WebGPU support provide the best AI experience.
