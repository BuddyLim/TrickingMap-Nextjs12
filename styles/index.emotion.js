import { css } from '@emotion/react'

export const IndexH1 = css`
  font-size: 3rem;
  font-weight: bold;
`

export const IndexMain = css`
  padding: 2rem;
`

export const IndexArticleList = css`
  margin-top: 1rem;
  li:not(:last-child) { 
    margin-bottom: 1rem;  
  }
`

export const IndexArticleItem = css`
  display: flex;
  flex-direction: row;
  gap: 2%;
  a{
    color: black;
    transition: 0.3s;
  }
  a:hover{
    color: blue;
  }
`