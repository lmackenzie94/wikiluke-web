import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled, { css } from "styled-components"
import { FaPlus, FaMinus } from "react-icons/fa"
import { motion as M, AnimatePresence } from "framer-motion"

const Message = styled.p`
  text-align: center;
  font-weight: bold;
  ${props =>
    props.error &&
    css`
      color: red;
    `}
`

const HighlightsStyles = styled.div`
  h1 {
    margin-bottom: 10px;
  }
  .disclaimer {
    font-size: 14px;
    font-style: italic;
    margin-top: 0;
  }
  .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
    button {
      border: none;
      background: none;
      outline: none;
      margin: 0 0 0 25px;
      padding: 0;
      &:hover svg,
      &:focus svg {
        color: black;
      }
      svg {
        font-size: 24px;
        color: var(--gray);
        transition: color 0.3s ease-out;
      }
    }
  }
  h2 {
    font-size: 18px;
    margin: 0;
    a {
      color: var(--theme);
    }
  }
  ul {
    margin-bottom: 50px;
    padding-left: 30px;
  }
`

const Highlight = ({ key, title, url, highlights }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div key={key}>
      <div className="heading">
        <h2>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>
        <button onClick={() => setCollapsed(prev => !prev)}>
          {collapsed ? <FaPlus /> : <FaMinus />}
        </button>
      </div>
      <AnimatePresence>
        {!collapsed && (
          <M.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {highlights.map((h, idx) => (
              <M.li
                key={idx}
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                exit={{ y: -10 }}
              >
                {h}
              </M.li>
            ))}
          </M.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

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
          "https://wikiluke-api.onrender.com/highlights"
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
      <HighlightsStyles>
        <h1>Highlights</h1>
        <p className="disclaimer">* this content was taken from articles I found interesting & thought-provoking and does not necessarily reflect my personal beliefs</p>
        {highlights.map((highlight, idx) => {
          return <Highlight key={idx} {...highlight} />
        })}
      </HighlightsStyles>
      {loading && <Message>Loading . . .</Message>}
      {error && <Message error>{error}</Message>}
    </Layout>
  )
}

export default HighlightsPage
