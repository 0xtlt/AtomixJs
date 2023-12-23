import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "AtomixJs docs",
      social: {
        github: "https://github.com/0xtlt/AtomixJs",
      },
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Getting started", link: "/guides/getting-started/" },
            { label: "Component", link: "/guides/component/" },
            { label: "Lifecycle", link: "/guides/lifecycle/" },
            { label: "Cycle", link: "/guides/cycle/" },
            { label: "States", link: "/guides/states/" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
});
