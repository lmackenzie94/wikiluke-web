import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

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
                    border: `1px solid #ddd`,
                    padding: `8px`,
                  }}
                >
                  {word.definition}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {loading && <p>Loading. . .</p>}
      {error && <p>{error}</p>}
    </Layout>
  )
}

export default WordsPage
