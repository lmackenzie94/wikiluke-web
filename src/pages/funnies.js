import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { graphql } from "gatsby"

export const query = graphql`
  query FunniesPageQuery {
    funnies: allAirtable(filter: { table: { eq: "Funnies" } }) {
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

const FunniesPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Funnies" />
      <h2 style={{ marginBottom: `40px` }}>Favourite Funnies</h2>
      <ul>
        {data.funnies.edges.map((edge, idx) => (
          <li
            key={edge.node.id}
            style={{ fontWeight: idx % 2 === 0 && `bold` }}
          >
            {edge.node.data.Text}
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default FunniesPage
