import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"

export const query = graphql`
  query AdvicePageQuery {
    advice: allAirtable(filter: { table: { eq: "Advice" } }) {
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

const AdvicePage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Advice" />
      <h2>Advice to Future Me</h2>
      <p
        style={{
          fontStyle: `italic`,
          marginBottom: `40px`,
          paddingLeft: `20px`,
          borderLeft: `5px solid`,
          borderColor: `#32a852`,
        }}
      >
        Over the past year I made an effort to write down every piece of advice
        that resonated with me. Some were learned through movies and books,
        others through personal experience. My goal is to have these simple
        things inform my daily decisions while continuing to add to and improve
        upon them over time.
      </p>
      <ol>
        {data.advice.edges.map((edge, idx) => (
          <li
            key={edge.node.id}
            style={{ fontWeight: `bold`, color: idx % 2 !== 0 && `#007031` }}
          >
            {edge.node.data.Text}
          </li>
        ))}
      </ol>
    </Layout>
  )
}

export default AdvicePage
