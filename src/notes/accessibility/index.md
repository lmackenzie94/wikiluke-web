# Accessibility Notes

- Don’t type fully capitalized words in HTML (use CSS text-transform) – otherwise screen readers may think it’s an acronym/initialism.
- Add a **skip-link** to main content. 
  - Right after `body` tag.
  - Especially important with multiple nav links that users of assisted technology would have to tab through.
- **Screen readers can’t read form placeholders** - instead, use labels with .visuallyHidden or aria-labels.
- Use `focus-within` to allow users to tab through sub-menus within dropdowns.