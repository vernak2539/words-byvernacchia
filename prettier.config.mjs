import * as prettierAstro from 'prettier-plugin-astro'

export default {
  plugins: [prettierAstro],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
  "tabWidth": 4,
  "useTabs": false,
}
