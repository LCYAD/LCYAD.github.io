## Adrian C.Y. Lee Portfolio

The homepage is a responsive, single-page professional portfolio. It uses no build step or framework, so it can be published directly on GitHub Pages.

### Current Structure

- `index.html`: page content and section structure.
- `css/site.css`: all styles and responsive layout rules for the current homepage.
- `js/site.js`: theme preference, active-section navigation, and JSON-driven resume content.
- `data/resume.json`: source data for the Experience, Skills, and Education & Credentials sections.
- The profile image is hosted on Cloudinary and referenced directly by `index.html`.

### Managing resume content with a GitHub Gist

The three resume sections are rendered in the browser from one JSON document. The site currently loads the checked-in [`data/resume.json`](data/resume.json), so it continues to work before a Gist is configured.

To make a public GitHub Gist the live source:

1. Create a **public** Gist containing a file named `resume.json` and copy the contents of `data/resume.json` into it.
2. Open the file in the Gist and copy its **Raw** URL.
3. In `index.html`, replace `data-resume-source="data/resume.json"` on the `js/site.js` script tag with your Raw URL, then publish that one site change.

After that, editing and saving the Gist updates these sections on the next page load. The loader adds a cache-busting query parameter so visitors receive the current Gist content, and falls back to the checked-in JSON if the Gist cannot be reached or has invalid JSON.

Keep the top-level `experience`, `skills`, and `credentials` keys, plus the `items`/`categories` arrays, as shown in `data/resume.json`. Text is rendered as plain text rather than HTML.

For local testing, serve the project over HTTP (for example, run `python3 -m http.server` in the project folder and open `http://localhost:8000`). Opening `index.html` directly as a `file://` URL prevents browsers from fetching the JSON. Before publishing, ensure `data/resume.json` is added to the commit; it is required for the fallback to work on the deployed site.
