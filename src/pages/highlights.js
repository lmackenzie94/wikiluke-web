import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled, { css } from "styled-components"

const Message = styled.p`
  text-align: center;
  font-weight: bold;
  ${props =>
    props.error &&
    css`
      color: red;
    `}
`

// TO DO: make the highlights collapsable

const HighlightsPage = () => {
  const [highlights, setHighlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  const formatHighlights = highlightsArray => {
    const formattedHighlights = []

    for (let i = 0; i < highlightsArray.length; i++) {
      if (formattedHighlights.some(h => h.title === highlightsArray[i].title)) {
        const idx = formattedHighlights.findIndex(
          h => h.title === highlightsArray[i].title
        )
        formattedHighlights[idx].highlights.push(highlightsArray[i].text)
      } else {
        const obj = {}
        obj.title = highlightsArray[i].title
        obj.url = highlightsArray[i].url
        obj.highlights = [highlightsArray[i].text]
        formattedHighlights.push(obj)
      }
    }

    return formattedHighlights
  }

  useEffect(() => {
    const getHighlights = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          "https://wikiluke.herokuapp.com/highlights"
        )

        if (!response.ok) {
          setError(
            `Something went wrong: Expected 200 response, got ${response.status}`
          )
          return
        }
        const data = await response.json()
        const formattedHighlights = formatHighlights(data)
        setHighlights(formattedHighlights)
      } catch (e) {
        setError(`Error fetching data: ${e}`)
      } finally {
        setLoading(false)
      }
    }
    getHighlights()
  }, [])

  return (
    <Layout>
      <SEO title="Highlights" />
      <h1 style={{ marginBottom: 50 }}>Highlights</h1>
      {highlights.map((highlight, idx) => {
        const { title, url, highlights } = highlight
        return (
          <div key={idx}>
            <h3 style={{ paddingBottom: 5 }}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--green)" }}
              >
                {title}
              </a>
            </h3>
            <ul style={{ marginBottom: 50 }}>
              {highlights.map((h, idx) => (
                <li key={idx}>{h}</li>
              ))}
            </ul>
          </div>
        )
      })}
      {loading && <Message>Loading . . .</Message>}
      {error && <Message error>{error}</Message>}
    </Layout>
  )
}

export default HighlightsPage
