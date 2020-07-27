import React from "react"
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
        color: var(--green);
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
- turn notes into an array so they can be mapped over
- sort books alphabetically
*/

  return (
    <Layout>
      <SEO title="Book Notes" />
      <BookNotesStyles>
        <div className="customScrollbar">
          {data.books.edges.map(({ node: book }) => (
            <div key={book.book} id={book.book}>
              <h2>
                {book.book} <span>{book.author}</span>
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
