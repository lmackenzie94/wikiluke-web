import React, { useState } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Wrapper } from "./styles/GlobalStyles"
import { GithubPicker } from "react-color"
import { useThemeColour } from "../contexts/themeColourContext"
import { useOutsideClickDetect } from "@lmack/hooks"

const HeaderStyles = styled.header`
  background: var(--lightGray);
  margin-bottom: 1.45rem;
  border-bottom: 1px solid #dedede;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    h1 {
      margin: 0;
      padding: 1rem 0;
      font-size: 1rem;
      a {
        text-decoration: none;
        color: black;
      }
    }
    span {
      line-height: 1;
    }
    button {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      border: none;
      outline: none;
      cursor: pointer;
      background: ${props => props.btnColor};
    }
    .github-picker {
      position: absolute !important;
      top: 75px !important;
      right: 0 !important;
      z-index: 1;
      > div {
        right: 9px !important;
        left: unset !important;
      }
    }
  }
`

const Header = ({ siteTitle }) => {
  const [pickerOpen, setPickerOpen] = useState(false)
  const [themeColour, setThemeColour] = useThemeColour()

  const handleOutsideClick = () => {
    if (!pickerOpen) return
    setPickerOpen(false)
  }
  const { wrapper } = useOutsideClickDetect(handleOutsideClick)

  const handleThemeColour = color => {
    localStorage.setItem("themeColour", color.hex)
    setThemeColour(color.hex)
  }

  console.log(pickerOpen)

  return (
    <HeaderStyles btnColor={themeColour}>
      <Wrapper>
        <div className="container">
          <h1>
            <Link to="/">{siteTitle}</Link>
          </h1>
          <span ref={wrapper}>
            <button
              onClick={() => setPickerOpen(prev => !prev)}
              aria-label="change theme colour"
            ></button>
            {pickerOpen && (
              <GithubPicker
                color={themeColour}
                onChangeComplete={color => handleThemeColour(color)}
              />
            )}
          </span>
        </div>
      </Wrapper>
    </HeaderStyles>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `wikiluke`,
}

export default Header
