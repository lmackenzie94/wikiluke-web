require("dotenv").config()
// const googleSheetCreds = require("./src/data/client_secret.json")

const tableNames = [`Advice`, `Words`, `Quotes`, `Funnies`]

const allTables = tableNames.map(tableName => {
  return {
    baseId: process.env.BASE_ID,
    tableName,
  }
})

console.log(allTables)

module.exports = {
  siteMetadata: {
    title: `wikiluke`,
    description: `For things I want to remember, but won't`,
    author: `Luke MacKenzie`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.API_KEY, // may instead specify via env, see below
        concurrency: 5, // default, see using markdown and attachments for more information
        tables: allTables,
      },
    },
    {
      resolve: `gatsby-source-google-sheets`,
      options: {
        spreadsheetId: `1EPACco2fwFoFAtmG0miGoAeW0c8gpev7eMbmUhtOC_M`,
        worksheetTitle: `Beliefs`,
        credentials: JSON.parse(process.env.GOOGLE_SHEET_CREDS),
      },
    },
    {
      resolve: `gatsby-source-google-sheets`,
      options: {
        spreadsheetId: `1EPACco2fwFoFAtmG0miGoAeW0c8gpev7eMbmUhtOC_M`,
        worksheetTitle: `Facts`,
        credentials: JSON.parse(process.env.GOOGLE_SHEET_CREDS),
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
