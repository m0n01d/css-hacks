import React from "react"
import styled from "styled-components"

const xs = Array.from({ length: 20 }).map((_, i) => i)

export const StyledUl = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  height: 225px;
  overflow-y: scroll;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 2px 4px;
`

export const DoesntScrollFF = () => (
  <StyledUl>
    {xs.map(i => (
      <li>this is a message {i}</li>
    ))}
  </StyledUl>
)

const WithRotationStyled = styled.div`
  @supports (-moz-appearance: none) {
    ul {
      border: 1px solid red !important;
      flex-direction: column !important;
      -moz-transform: rotate3d(1, 0, 0, 180deg);
      & li {
        -moz-transform: rotate3d(1, 0, 0, 180deg);
      }
    }
  }
`

const WithoutRotationStyled = styled.div`
  @supports (-moz-appearance: none) {
    ul {
      border: 1px solid blue !important;
      flex-direction: column !important;
      & li {
        order: var(--order);
      }
    }
  }
`

export const WithRotation = () => (
  <WithRotationStyled>
    <DoesntScrollFF />
  </WithRotationStyled>
)

export const WithoutRotation = () => (
  <WithoutRotationStyled>
    <StyledUl>
      {xs.map(n => (
        <li style={{ "--order": n * -1 }}>this is a message {n}</li>
      ))}
    </StyledUl>
  </WithoutRotationStyled>
)
