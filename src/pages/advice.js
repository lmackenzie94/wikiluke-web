import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import styled from "styled-components"
import { motion as M } from "framer-motion"
import { List, ListItem } from "../components/motion/list"

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
    border-left: 5px solid var(--theme);
  }
`

const AdvicePage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Advice" />
      <AdviceStyles>
        <h2>Advice to Future Me</h2>
        <M.p
          initial={{ y: -25 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Over the past year I made an effort to write down every piece of
          advice that resonated with me. Some were learned through movies and
          books, others through personal experience. My goal is to have these
          simple things inform my daily decisions while continuing to add to and
          improve upon them over time.
        </M.p>
      </AdviceStyles>
      <List style={{ listStyle: `none` }}>
        {data.advice.edges.map((edge, idx) => (
          <ListItem
            key={edge.node.id}
            style={{
              color: idx % 2 !== 0 && `var(--theme)`,
              marginBottom: `.4rem`,
            }}
          >
            <span style={{ fontWeight: `bold`, marginRight: 10 }}>{`${
              idx + 1
            })`}</span>
            {edge.node.data.Text}
          </ListItem>
        ))}
      </List>
    </Layout>
  )
}

export default AdvicePage
