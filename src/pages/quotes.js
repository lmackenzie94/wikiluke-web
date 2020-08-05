import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import styled from "styled-components"
import { List, ListItem } from "../components/motion/list"

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

const QuoteStyles = styled.div`
  h2 {
    margin-bottom: 40px;
    position: relative;
    span {
      font-family: var(--bodyFont);
      font-size: 4em;
      position: absolute;
      top: -20px;
      padding-left: 1rem;
    }
  }
  ul li {
    margin-bottom: 0.4rem;
  }
`

const QuotesPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Quotes" />
      <QuoteStyles>
        <h2>
          Favourite Quotes
          <span>&#8221;</span>
        </h2>
        <List>
          {data.quotes.edges.map((edge, idx) => (
            <ListItem
              key={edge.node.id}
              style={{
                color: idx % 2 !== 0 && `var(--theme)`,
              }}
            >
              {edge.node.data.Text}
            </ListItem>
          ))}
        </List>
      </QuoteStyles>
    </Layout>
  )
}

export default QuotesPage
