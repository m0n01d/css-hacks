import React from "react"
import styled from "styled-components"

const xs = Array.from({ length: 20 }).map((_, i) => i)

export const StyledUl = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  height: 100px;
  overflow-y: scroll;
  border: 1px solid #eee;
`

export const DoesntScrollFF = () => (
  <StyledUl>
    {xs.map(i => (
      <li>`this is a message${i}`</li>
    ))}
  </StyledUl>
)

const WithRotation_ = styled.div`
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

const WithoutRotation_ = styled.div`
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
  <WithRotation_>
    <DoesntScrollFF />
  </WithRotation_>
)

export const WithoutRotation = () => (
  <WithoutRotation_>
    <StyledUl>
      {xs.map(n => (
        <li style={{ "--order": n * -1 }}>{n}</li>
      ))}
    </StyledUl>
  </WithoutRotation_>
)
