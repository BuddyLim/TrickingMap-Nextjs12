import { css } from '@emotion/react'

export const TrickCardStyle = css`
  width: 20rem;
  margin-top: 2%;
  transition: 0.1s;

  &:hover{
    box-shadow: 0 0 0 7px green;
  }
` 

export const TrickVideoStyle = css`
  width: 100%;
  height: 250px;
  object-fit: fill;
  cursor: pointer;
`

export const TrickRowListStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const TrickRowTitleStyle = css`
  font-size: 48px;
  font-weight: bold;
`

export const TrickRowLayoutStyle = css`
  display: flex;
  flex-direction: row;
  width: 2000px;
  flex-wrap: wrap;
  gap: 3%;
  justify-content: center;
`