# VASBYT Premium Catalogue Prototype

This is a first-version premium static website system for an outdoor / 4x4 / camping brand.

## What is included

- Multi-page website:
  - `index.html`
  - `shop.html`
  - `product.html`
  - `about.html`
  - `contact.html`
- Menu-driven collections from one data file.
- Product catalogue with:
  - Search
  - Vague recommendation search using keywords and synonyms
  - Category filtering
  - Sorting
  - Product detail pages
  - Marked-down pricing
  - Stock status
- WhatsApp quote builder.
- Cloudinary-ready image handling.
- Responsive premium outdoors styling.

## How to run locally

Open `index.html` in your browser.

For best results during development, run a local server:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Where to edit products and menu items

Edit:

```text
data/store-data.js
```

### Change menu / collections

Edit `window.MENU_COLLECTIONS`.

You can:

- Change the `label`
- Change the `navLabel`
- Change the `sort` number to reorder menu items
- Set `active: false` to hide a menu item
- Add new collection objects

### Change products

Edit `window.PRODUCTS`.

Important product fields:

- `id`
- `active`
- `featured`
- `collection`
- `name`
- `brand`
- `price`
- `salePrice`
- `stock`
- `short`
- `description`
- `dimensions`
- `cloudinaryPublicId`
- `keywords`

## Cloudinary setup

In `data/store-data.js`, change:

```js
cloudinaryCloudName: 'demo'
```

to the client’s Cloudinary cloud name.

Then add the product public ID to the product:

```js
cloudinaryPublicId: 'vasbyt/products/camp-chair-001-main'
```

The website automatically generates optimized image URLs like:

```text
f_auto,q_auto,w_620
```

for fast loading.

## WhatsApp setup

In `data/store-data.js`, change:

```js
whatsappNumber: '27000000000'
```

to the client’s number in international format without the `+`.

Example:

```js
whatsappNumber: '27821234567'
```

## Recommended next upgrade

For the real client build, connect Google Sheets to automatically generate this data file. The client should still manage products in Google Sheets, while the website loads optimized static data.

Recommended workflow:

```text
Google Sheets → validated product data → store-data.js or JSON files → static website
```

## Pitch wording

“This is a WhatsApp-first commerce catalogue. Customers browse and search products like an online store, but the final order becomes an assisted WhatsApp enquiry where stock, fitment, delivery and payment can be confirmed.”
