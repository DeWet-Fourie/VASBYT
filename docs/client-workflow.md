# Client product workflow

The final workflow should remain simple for the client:

1. Edit products in Google Sheets.
2. Upload product images to Cloudinary.
3. Paste the Cloudinary public ID into the Sheet.
4. Click `Publish Website`.
5. The website receives optimized catalogue data.

The client should not touch code, GitHub, JSON files or CSS.

## Recommended Google Sheet columns

- id
- active
- featured
- name
- brand
- collection
- price
- sale_price
- stock
- short_description
- full_description
- dimensions
- cloudinary_public_id
- keywords
- sort_order

## Rules

- Use dropdowns for collection and stock status.
- Do not upload raw oversized images directly to the website.
- Use Cloudinary public IDs rather than long image URLs.
- Keep product IDs stable after launch.
