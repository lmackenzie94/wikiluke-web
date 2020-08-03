import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import styled from "styled-components"

export const query = graphql`
  {
    beliefs: allGoogleSheetBeliefsRow {
      edges {
        node {
          belief
          point1
          point2
          point3
          point4
          point5
          point6
        }
      }
    }
    facts: allGoogleSheetFactsRow {
      edges {
        node {
          belief
          fact1
          fact2
          fact3
          fact4
        }
      }
    }
  }
`

const BeliefsStyles = styled.section`
  display: flex;
  height: 85vh;

  div {
    overflow-y: scroll;
    padding-right: 30px;
    padding-top: 15px;
    div {
      margin-bottom: 25px;
      h2 {
        margin-bottom: 20px;
        color: var(--theme);
        span {
          font-size: 0.6rem;
          color: black;
        }
      }
      ul li {
        margin-bottom: 0.4rem;
      }
      div {
        border-left: 5px solid var(--theme);
        padding: 20px;
        background: var(--lightGray);
        h3 {
          font-size: 1rem;
          text-transform: uppercase;
          margin: 0;
        }
      }
    }
  }

  .panel {
    overflow-y: scroll;
    padding: 20px;
    border-left: 1px solid var(--lightGray);
    background: var(--lightGray);
    min-width: 225px;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        margin-bottom: 0.4rem;
        a {
          font-family: var(--headingFont);
          color: black;
        }
      }
    }
  }

  @media (max-width: 800px) {
    flex-direction: column-reverse;

    .panel {
      flex: 0 0 175px;
      margin-bottom: 30px;
      border: none;
      border-top: 15px solid rgb(242, 242, 242);
      border-bottom: 15px solid rgb(242, 242, 242);
      padding: 0 20px !important;
    }
  }
`

const formatBeliefsAndFacts = (beliefs, facts) => {
  const allFacts = facts
    .map(({ node: fact }) => {
      const points = Object.keys(fact)
        .filter(point => point.includes("fact"))
        .map(point => fact[point])
        .filter(point => point)

      return {
        belief: fact.belief,
        points,
      }
    })
    .filter(fact => fact.points.length)

  const allBeliefs = beliefs
    .map(({ node: belief }) => {
      const points = Object.keys(belief)
        .filter(point => point.includes("point"))
        .map(point => belief[point])
        .filter(point => point)

      return {
        belief: belief.belief,
        points,
        facts: [],
      }
    })
    .filter(belief => belief.points.length)

  for (let i = 0; i < allFacts.length; i++) {
    const belief = allFacts[i].belief
    const facts = allFacts[i].points
    const nonEmptyBelief = allBeliefs.find(b => b.belief === belief)
    nonEmptyBelief && (nonEmptyBelief.facts = facts)
  }

  return allBeliefs
}

const BeliefsPage = ({ data }) => {
  const [beliefs, setBeliefs] = useState([])

  useEffect(() => {
    const formattedBeliefs = formatBeliefsAndFacts(
      data.beliefs.edges,
      data.facts.edges
    )

    setBeliefs(formattedBeliefs)
  }, [data])

  return (
    <Layout>
      <SEO title="Beliefs" />
      <BeliefsStyles>
        <div className="customScrollbar">
          {beliefs.map(belief => (
            <div key={belief.belief} id={belief.belief}>
              <h2>{belief.belief}</h2>
              <ul>
                {belief.points.map((point, idx) => (
                  <li key={`${belief}-${idx}`}>{point}</li>
                ))}
              </ul>
              {belief.facts.length > 0 && (
                <div>
                  <h3>Facts</h3>
                  <ul style={{ marginBottom: 0 }}>
                    {belief.facts.map((fact, idx) => (
                      <li
                        key={`${belief}-${idx}`}
                        style={{ marginTop: 15, marginBottom: 0 }}
                      >
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
        <aside className="customScrollbar panel">
          <ul>
            {beliefs.map(belief => (
              <li key={`${belief.belief}-link`}>
                <a href={`#${belief.belief}`} className="removeVisitedStyle">
                  {belief.belief}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </BeliefsStyles>
    </Layout>
  )
}

export default BeliefsPage
