import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Genesis Link Docs",
  description: "Empowering creative gamers to create, publish and share their own games effortlessly.",
  base: '/Dev-Docs/', // Add this line, replace 'Dev-Docs' with your actual repository name
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Introduction', link: '/introduction/' },
      { text: 'Docs', link: '/documentation/setup' }
    ],

    sidebar: {
      '/introduction/': [
        {
          text: 'What Is Genesis Link',
          items: [
            { text: 'Empowering Gamers', link: '/introduction/empowering-gamers' },
            { text: 'Passion Driven', link: '/introduction/passion-driven' },
            { text: 'Our Purpose', link: '/introduction/our-purpose' }
          ]
        }
      ],
      '/documentation/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Setup', link: '/documentation/setup' },
            { text: 'Source Control', link: '/documentation/source-control' }
          ]
        },
        {
          text: 'Sandbox Asset Workflow',
          items: [
            { text: 'Getting Started', link: '/documentation/sandbox-asset-workflow/getting-started' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Genesis-Link' },
      { icon: 'discord', link: 'https://discord.gg/tj32NkGS' }
    ],

    // Add this for local search
    search: {
      provider: 'local'
    }
  }
})