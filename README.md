# VASBYT Premium V6

A static, premium WhatsApp-first 4x4 product catalogue system.

## Upload to GitHub Pages / Netlify

Upload the contents of this folder, not the wrapper folder.

Required structure:

```text
index.html
shop.html
product.html
about.html
contact.html
terms.html
assets/css/styles.css
assets/js/app.js
assets/img/
data/store-data.js
README.md
```

## Edit store information

Open `data/store-data.js` and update:

```js
STORE_CONFIG.whatsappNumber
STORE_CONFIG.email
STORE_CONFIG.phone
STORE_CONFIG.location
STORE_CONFIG.hours
STORE_CONFIG.cloudinaryCloudName
```

Use WhatsApp number format without `+` or spaces, for example:

```js
whatsappNumber: '27821234567'
```

## Edit collections

Collections are controlled in `MENU_COLLECTIONS`.

Set `active: false` to hide a collection.
Change `sort` to move a collection.
Change `navLabel`, `title` and descriptions to change wording.

Collections automatically update:

- menu drawer
- homepage route grid
- shop chips
- shop dropdown
- product search context

## Edit products

Products are controlled in `PRODUCTS`.

Set `active: false` to hide a product.
Set `featured: true` to show it on the homepage.
Use `collectionId` to attach products to a menu collection.

## Cloudinary images

If you use Cloudinary, add a product `imagePublicId` and set the Cloudinary cloud name in `STORE_CONFIG`.

If no Cloudinary ID is provided, the website uses local fallback images.

## WhatsApp quote system

Customers can add products to quote, change quantities, remove products, clear quote and send a pre-filled WhatsApp message.

The message asks VASBYT to confirm stock, fitment, courier cost and payment method.

## Search engine

The shop page can search by product name, category, description, keywords and 4x4 problem phrases like:

- stuck in sand
- bakkie storage
- camping light
- solar power
- winter jacket
- roof rack
