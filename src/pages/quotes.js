import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { graphql } from "gatsby"

export const query = graphql`
  query QuotesPageQuery {
    quotes: allAirtable(filter: { table: { eq: "Quotes" } }) {
      edges {
        node {
          id
          data {
            Text
          }
        }
      }
    }
  }
`

const QuotesPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Quotes" />
      <h2
        style={{
          marginBottom: `40px`,
          position: `relative`,
        }}
      >
        Favourite Quotes{" "}
        <span
          style={{
            fontFamily: "Arial",
            fontSize: "4em",
            position: `absolute`,
            top: -20,
            paddingLeft: "1rem",
          }}
        >
          &#8221;
        </span>
      </h2>
      <ul>
        {data.quotes.edges.map((edge, idx) => (
          <li
            key={edge.node.id}
            style={{ fontWeight: `bold`, color: idx % 2 !== 0 && `#007031` }}
          >
            {edge.node.data.Text}
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default QuotesPage
