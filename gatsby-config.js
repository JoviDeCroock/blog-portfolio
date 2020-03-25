module.exports = {
  siteMetadata: {
    title: `JoviDeC`,
    author: `Jovi De Croock`,
    description: `My Portfolio.`,
    siteUrl: `https://www.jovidecroock.com`,
    menuLinks:[
      {
          name:'Portfolio',
          link:'/'
      },
    ],
    social: {
      twitter: `joviDec`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {},
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jovi De Croock - Portfolio`,
        short_name: `JoviDeCroock`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-no-javascript'
  ],
}
