# General Notes

- Use `<figure>` and `<figcaption>` where possible.
- Use `<aside>` for content that is only **indirectly related** to the main content (ex. sidebars, call-out boxes).
- `<div>` are **block** by default; `<span>` are **inline**.
- For **icons**, the standard now is to use `<span>` instead of `<i>`.
- Custom stylesheets should **always be last** in your links.
- By default, heading tags are usually bold weighted. 
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```
- Meta viewport line should always be in the `<head>` as it’s necessary for media queries.
  - `device-width` = width of the screen in CSS pixels at a scale of 100%.
  - `initial-scale` = the zoom level when the page is first loaded.
- Use `<kbd>` for keyboard inputs.
- Image’s source path can be **absolute** (internet) or **relative** (from your document).
