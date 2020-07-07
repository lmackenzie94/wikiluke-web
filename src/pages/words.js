import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./words.css"

const WordsPage = () => {
  const [words, setWords] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    const getWords = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://wikiluke.herokuapp.com/words")

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
        `https://wikiluke.herokuapp.com/words/${id}`,
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
      <table style={{ padding: `15px` }}>
        <thead style={{ background: "#32a852" }}>
          <tr style={{ color: `white` }}>
            <th
              className="word"
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
        {words && !error && !loading && (
          <tbody>
            {words.map((word, idx) => (
              <tr key={idx} style={{ background: idx % 2 === 0 && `#f2f2f2` }}>
                <td
                  style={{
                    border: `1px solid #ddd`,
                    padding: `8px`,
                  }}
                >
                  {word.name}
                </td>
                <td
                  style={{
                    display: `flex`,
                    justifyContent: `space-between`,
                    alignItems: `center`,
                    border: `1px solid #ddd`,
                    padding: `10px`,
                  }}
                >
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
      </table>
      {loading && <p>Loading . . .</p>}
      {error && <p>{error}</p>}
    </Layout>
  )
}

export default WordsPage
