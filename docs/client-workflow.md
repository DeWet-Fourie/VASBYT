# Client Workflow

The client should not touch the website code.

## First version workflow

For now, product and menu data lives in:

```text
data/store-data.js
```

This can be manually updated by the developer.

## Final workflow for client handover

The final handover workflow should be:

1. Client opens Google Sheets.
2. Client edits products.
3. Client uploads product images to Cloudinary.
4. Client pastes the Cloudinary public ID into the Google Sheet.
5. Client clicks `Publish Website`.
6. The website updates with optimized product data.

## Google Sheet columns

Recommended columns:

```text
id
active
featured
name
brand
collection
price
sale_price
stock
short_description
long_description
dimensions
cloudinary_public_id
keywords
sort_order
```

Use dropdowns for:

```text
active: TRUE / FALSE
featured: TRUE / FALSE
collection: camping / recovery / power / vehicle-exterior / vehicle-interior / apparel
stock: In Stock / Limited Stock / On Order / Out of Stock / Confirm Fitment
```

## Menu management

Menu items should also be controlled from Google Sheets later.

Recommended columns:

```text
id
active
sort
label
nav_label
subtitle
hero
keywords
```

That means the menu is also a collection manager.

## Image rules

Use Cloudinary public IDs, not full raw image URLs.

Example public ID:

```text
vasbyt/products/recovery-tracks-pro-main
```

The website then creates optimized URLs automatically.

## Important rule

Google Sheets is the admin tool. The live website should not fetch directly from Google Sheets for every visitor.

The live website should load optimized static files generated from the Sheet.
