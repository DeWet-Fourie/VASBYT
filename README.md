# VASBYT Overland V3

Premium WhatsApp-first product catalogue prototype for an outdoor / 4x4 brand.

## What changed in V3

- Top menu is now an accordion/drawer menu instead of cluttered top links.
- The uploaded 4x4 / overland photos are used throughout the design.
- Visual direction is darker, more modern, more premium and more technical.
- Footer now includes legal links and Terms & Conditions page.
- Search supports vague product searches like `stuck in sand`, `bakkie storage`, `camp light`, `winter jacket`, `solar power`.

## Replace these details before presentation

Open `data/store-data.js` and update:

```js
whatsappNumber: '27000000000'
email: 'vasbytstore@gmail.com'
cloudinaryCloudName: 'demo'
```

## Edit menu collections

Menu/collection order is controlled in `MENU_COLLECTIONS` inside `data/store-data.js`.

- Change `sort` to move menu items.
- Set `active: false` to hide a collection.
- Change `label` or `navLabel` to rename.
- Add `image` to control the collection card/drawer image.

## Product images

For the final client workflow, store Cloudinary public IDs in each product:

```js
cloudinaryPublicId: 'vasbyt/products/product-name-main'
```

The website will generate optimized Cloudinary URLs automatically.

## Upload to GitHub Pages

Upload the contents of this folder to the root of the repo, not the folder itself.

Correct:

```text
repo/index.html
repo/assets/css/styles.css
repo/data/store-data.js
```

Wrong:

```text
repo/vasbyt-overland-v3/index.html
```
