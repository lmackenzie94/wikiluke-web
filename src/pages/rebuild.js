import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { GrRefresh } from "react-icons/gr"
import styled from "styled-components"

const RebuildStyles = styled.div`
  h1 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    margin-top: 100px;
    color: var(--theme);
  }
  button {
    font-size: 1.5rem;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
    svg {
      font-size: 50px;
    }
  }
`

const RebuildPage = () => {
  const [building, setBuilding] = useState(false)

  const handleRebuild = () => {
    fetch("https://api.netlify.com/build_hooks/5ed0087cfbe7dfef8dea49c1", {
      method: "POST",
    })
      .then(res => {
        setBuilding(true)
      })
      .catch(err => {
        throw new Error(`Build error: ${err}`)
      })
  }
  return (
    <Layout>
      <SEO title="Rebuild Site" />
      <RebuildStyles>
        <h1>{building ? `Building . . .` : `Click to Rebuild`}</h1>
        <button onClick={handleRebuild} aria-label="rebuild site">
          <GrRefresh />
        </button>
      </RebuildStyles>
    </Layout>
  )
}

export default RebuildPage
