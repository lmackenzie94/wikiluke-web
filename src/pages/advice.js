import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import styled from "styled-components"

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

const AdviceStyles = styled.div`
  p {
    font-style: italic;
    margin-bottom: 40px;
    padding-left: 20px;
    border-left: 5px solid var(--green);
  }
`

const AdvicePage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Advice" />
      <AdviceStyles>
        <h2>Advice to Future Me</h2>
        <p>
          Over the past year I made an effort to write down every piece of
          advice that resonated with me. Some were learned through movies and
          books, others through personal experience. My goal is to have these
          simple things inform my daily decisions while continuing to add to and
          improve upon them over time.
        </p>
      </AdviceStyles>
      <ol style={{ listStyle: `none` }}>
        {data.advice.edges.map((edge, idx) => (
          <li
            key={edge.node.id}
            style={{
              color: idx % 2 !== 0 && `var(--green)`,
              marginBottom: `.4rem`,
            }}
          >
            <span style={{ fontWeight: `bold`, marginRight: 10 }}>{`${
              idx + 1
            })`}</span>
            {edge.node.data.Text}
          </li>
        ))}
      </ol>
    </Layout>
  )
}

export default AdvicePage
