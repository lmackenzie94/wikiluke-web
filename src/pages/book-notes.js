import React, {useState, useEffect} from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import styled from "styled-components"

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

const BookNotesStyles = styled.section`
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

const BooksPage = ({ data }) => {
  /* 
TO-DO:
- sort books alphabetically
*/

const [notes, setNotes] = useState([])

useEffect(() => {
  const formattedData = data.books.edges.map(node => {
    const {author, book} = node.node;
    const notes = []
    Object.keys(node.node).forEach(key => {
      if (key.includes('note') && node.node[key]) {
        notes.push(node.node[key])
      }
    })
    return {author, book, notes }
  })

  setNotes(formattedData)
  
}, [])

  return (
    <Layout>
      <SEO title="Book Notes" />
      <BookNotesStyles>
        <div className="customScrollbar">
          {notes.map(book => {
            return (
            <div key={book.book} id={book.book}>
              <h2>
                {book.book} <span>{book.author}</span>
              </h2>
              <ul>
                {book.notes.map((n,idx) => 
                  n.includes('*') ? 
                  <li
                  key={`note-${idx}`}
                  dangerouslySetInnerHTML={{
                  __html: n.replace('*', '<strong>').replace('**', '</strong>')
                  }}></li>
                 : 
                  <li key={`note-${idx}`}>{n}</li>
                )}
              </ul>
            </div>
          )
          })}
        </div>
        <aside className="customScrollbar panel">
          <ul>
            {data.books.edges.map(({ node: book }) => (
              <li key={`${book.book}-link`}>
                <a href={`#${book.book}`} className="removeVisitedStyle">
                  {book.book}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </BookNotesStyles>
    </Layout>
  )
}

export default BooksPage
