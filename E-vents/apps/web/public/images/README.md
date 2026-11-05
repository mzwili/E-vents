# Image assets

The prototype currently references optimized Unsplash CDN images directly from `src/App.tsx`.
For production, replace those URLs with licensed, locally hosted AVIF/WebP files in this directory.

Suggested asset set:
- hero-event-table.webp — wide hero table styling
- catering-sharing-table.webp — food and catering portfolio
- ceremony-florals.webp — ceremony décor
- golden-hour-tablescape.webp — package card
- garden-brunch.webp — brunch catering
- botanical-styling.webp — floral décor
- celebration-table.webp — birthday package

Use responsive `srcSet`/`sizes`, descriptive alt text, and lazy loading for below-the-fold images.
