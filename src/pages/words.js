import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./words.css"
import styled, { css } from "styled-components"

const WordsTableStyles = styled.table`
  thead {
    background: var(--theme);
    tr {
      color: white;
      th {
        border: 1px solid #ddd;
        padding: 12px;
      }
    }
  }
  tbody {
    td.definitionCell {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #ddd;
      padding: 10px;
    }
    td.wordCell {
      border: 1px solid #ddd;
      padding: 8px;
    }
  }
`

const Message = styled.p`
  text-align: center;
  font-weight: bold;
  ${props =>
    props.error &&
    css`
      color: red;
    `}
`

const WordsPage = () => {
  const [words, setWords] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getWords = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://wikiluke-api.onrender.com/words")

        if (!response.ok) {
          setError(
            `Something went wrong: Expected 200 response, got ${response.status}`
          )
          return
        }
        const words = await response.json()
        setWords(words)
      } catch (e) {
        setError(`Error fetching data: ${e}`)
      } finally {
        setLoading(false)
      }
    }
    getWords()
  }, [])

  const removeWord = async (e, id) => {
    const wordRow = e.target.parentElement.parentElement
    try {
      const response = await fetch(
        `https://wikiluke-api.onrender.com/words/${id}`,
        { method: "DELETE" }
      )

      if (!response.ok) {
        setError(
          `Something went wrong: Expected 200 response, got ${response.status}`
        )
        return
      }
      wordRow.style.color = "red"
      wordRow.style.textDecoration = "line-through"
      const updatedWords = words.filter(word => word._id !== id)
      setTimeout(() => {
        setWords(updatedWords)
        wordRow.style.color = "inherit"
        wordRow.style.textDecoration = "none"
      }, 2500)
    } catch (e) {
      setError(`Error deleting word (id: ${id}): ${e}`)
    }
  }

  return (
    <Layout>
      <SEO title="Words" />
      <WordsTableStyles>
        <thead>
          <tr>
            <th className="word">Word</th>
            <th>Definition</th>
          </tr>
        </thead>
        {words && !error && !loading && (
          <tbody>
            {words.map((word, idx) => (
              <tr key={idx} style={{ background: idx % 2 === 0 && `#f2f2f2` }}>
                <td className="wordCell">{word.name}</td>
                <td className="definitionCell">
                  {word.definition}
                  <button
                    className="removeWordBtn"
                    style={{ background: idx % 2 !== 0 ? `#f2f2f2` : `white` }}
                    onClick={e => removeWord(e, word._id)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </WordsTableStyles>
      {loading && <Message>Loading . . .</Message>}
      {error && <Message error>{error}</Message>}
    </Layout>
  )
}

export default WordsPage
