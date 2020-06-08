import React, { useState, useEffect, useMemo } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"

export const query = graphql`
  query WordsPageQuery {
    words: allAirtable(filter: { table: { eq: "Words" } }) {
      edges {
        node {
          id
          data {
            Word
            Definition
          }
        }
      }
    }
  }
`

const WordsPage = ({ data }) => {
  // const sortedWords = useMemo(
  //   () =>
  //     data.words.edges.sort((a, b) => {
  //       const word1 = a.node.data.Word.toUpperCase().trim()
  //       const word2 = b.node.data.Word.toUpperCase().trim()

  //       if (word1 < word2) {
  //         return -1
  //       }
  //       if (word1 > word2) {
  //         return 1
  //       }
  //       return 0
  //     }),
  //   [data]
  // )
  const [words, setWords] = useState([])

  useEffect(() => {
    fetch("/.netlify/functions/airtable").then(async res => {
      const data = await res.json()
      console.log(data)
      setWords(data)
    })
  }, [])

  // const [words, setWords] = useState(sortedWords)

  return (
    <Layout>
      <SEO title="Words" />
      <table style={{ padding: `15px` }}>
        <thead style={{ background: "#32a852" }}>
          <tr style={{ color: `white` }}>
            <th
              style={{
                border: `1px solid #ddd`,
                padding: `12px`,
              }}
            >
              Word
            </th>
            <th
              style={{
                border: `1px solid #ddd`,
                padding: `12px`,
              }}
            >
              Definition
            </th>
          </tr>
        </thead>
        <tbody style={{ fontSize: "0.85rem" }}>
          {/* {words.map((word, idx) => (
            <tr key={idx} style={{ background: idx % 2 === 0 && `#f2f2f2` }}>
              <td
                style={{
                  border: `1px solid #ddd`,
                  padding: `8px`,
                  fontWeight: `bold`,
                }}
              >
                {word.node.data.Word}
              </td>
              <td
                style={{
                  border: `1px solid #ddd`,
                  padding: `8px`,
                }}
              >
                {word.node.data.Definition}
              </td>
            </tr>
          ))} */}
          {words.map((word, idx) => (
            <tr key={idx} style={{ background: idx % 2 === 0 && `#f2f2f2` }}>
              <td
                style={{
                  border: `1px solid #ddd`,
                  padding: `8px`,
                  fontWeight: `bold`,
                }}
              >
                {word.Word}
              </td>
              <td
                style={{
                  border: `1px solid #ddd`,
                  padding: `8px`,
                }}
              >
                {word.Definition}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default WordsPage
