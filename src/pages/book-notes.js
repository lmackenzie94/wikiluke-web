import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import "./beliefs.css"

export const query = graphql`
  {
    books: allGoogleSheetBookNotesRow {
      edges {
        node {
          book
          author
          note1
          note2
          note3
          note4
          note5
          note6
          note7
        }
      }
    }
  }
`

const BooksPage = ({ data }) => {
  /* 
TO-DO:
- turn notes into an array so they can be mapped over
- sort books alphabetically
*/

  return (
    <Layout>
      <SEO title="Book Notes" />
      <section
        className="beliefsContainer"
        style={{ display: `flex`, height: `85vh` }}
      >
        <div
          className="customScrollbar"
          style={{
            overflowY: `scroll`,
            paddingRight: `30px`,
            paddingTop: `15px`,
          }}
        >
          {data.books.edges.map(({ node: book }) => (
            <div
              key={book.book}
              id={book.book}
              style={{ marginBottom: `50px` }}
            >
              <h2 style={{ marginBottom: `20px`, color: `#32a852` }}>
                {book.book}{" "}
                <span style={{ fontSize: `12px`, color: `black` }}>
                  {book.author}
                </span>
              </h2>
              {/* TO DO: do this better */}
              <ul>
                {book.note1 && <li>{book.note1}</li>}
                {book.note2 && <li>{book.note2}</li>}
                {book.note3 && <li>{book.note3}</li>}
                {book.note4 && <li>{book.note4}</li>}
                {book.note5 && <li>{book.note5}</li>}
                {book.note6 && <li>{book.note6}</li>}
                {book.note7 && <li>{book.note7}</li>}
                {/* {book.note8 && <li>{book.note8}</li>}
                {book.note9 && <li>{book.note9}</li>}
                {book.note10 && <li>{book.note10}</li>} */}
              </ul>
            </div>
          ))}
        </div>
        <aside
          className="customScrollbar topicsPanel"
          style={{
            overflowY: `scroll`,
            padding: `20px`,
            borderLeft: `1px solid`,
            borderColor: `#f2f2f2`,
            background: `#f2f2f2`,
            minWidth: 225,
          }}
        >
          <ul style={{ listStyle: `none`, margin: 0 }}>
            {data.books.edges.map(({ node: book }) => (
              <li key={`${book.book}-link`}>
                <a
                  href={`#${book.book}`}
                  className="removeVisitedStyle"
                  style={{ fontFamily: "Courier" }}
                >
                  {book.book}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </Layout>
  )
}

export default BooksPage
