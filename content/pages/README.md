# Local Pages Management

## Overview
This directory contains all the local pages for your website. Each page is a JSON file that defines the page content, metadata, and visibility.

## Adding a New Page

1. Create a new `.json` file in this directory
2. Follow the structure below
3. Commit to GitHub
4. Deploy automatically to Vercel

## Page Structure

```json
{
  "id": "unique-id",
  "title": "Page Title",
  "slug": "page-slug",
  "description": "Short description for SEO (optional)",
  "order": 1,
  "published": true,
  "content": "<h2>HTML content here</h2><p>HTML is fully supported.</p>"
}
```

### Fields Explanation

- **id**: Unique identifier for the page (no spaces, use hyphens)
- **title**: The page title displayed on the website
- **slug**: URL slug (e.g., `about-us` → `/about-us`)
- **description**: Meta description for SEO (optional)
- **order**: Number that determines menu order (lower numbers appear first)
- **published**: `true` to show on website, `false` to hide
- **content**: HTML content of the page (supports all HTML tags)

## Examples

### About Page
```json
{
  "id": "about",
  "title": "About Us",
  "slug": "about-us",
  "description": "Learn about our clinic and doctors",
  "order": 1,
  "published": true,
  "content": "<h2>About Us</h2><p>Welcome to our clinic...</p>"
}
```

### Services Page
```json
{
  "id": "services",
  "title": "Services",
  "slug": "services",
  "description": "Our gynecomastia treatment services",
  "order": 3,
  "published": true,
  "content": "<h2>Our Services</h2><ul><li>Consultation</li><li>Surgery</li></ul>"
}
```

## How Menu Works

The navigation menu is **automatically generated** from:
1. All local pages (in order by `order` field)
2. Special items like Gallery and Blog

You don't need to update the menu manually!

## Publishing & Unpublishing

To hide a page from the website:
- Set `published: false`
- The page still exists in your repository but won't show up
- Perfect for drafting new pages

## Important Notes

- Always commit changes to deploy
- The Home page is automatic and doesn't need to be defined
- Special characters in slugs should be lowercase hyphens
- HTML content is fully rendered
- Changes deploy within minutes to Vercel

## Useful HTML Snippets

### Heading
```html
<h2>Section Title</h2>
<h3>Subsection</h3>
```

### Paragraph
```html
<p>Your text here</p>
```

### List
```html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

### Link
```html
<a href="/about-us">About Us</a>
```

### Image
```html
<img src="/images/photo.jpg" alt="Description" />
```

---

**Need help?** Check the existing `.json` files in this directory for examples!
