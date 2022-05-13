import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { displayArticleTitles } from '../utils/index.utils'

describe('Home', () => {
  it('Renders a heading', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Home/>
      </QueryClientProvider>
    )

    const heading = screen.getByText(/Welcome/i)

    expect(heading).toBeInTheDocument()
  })

  it('Displays item list properly', () => {
    let mockData = []
    let mockResult = displayArticleTitles(mockData)

    expect(mockResult).toEqual(expect.arrayContaining([]))

    mockData = [undefined]
    mockResult = displayArticleTitles(mockData)

    expect(mockResult).toEqual(expect.arrayContaining([]))

    mockData = null
    mockResult = displayArticleTitles(mockData)
    
    expect(mockResult).toEqual(expect.arrayContaining([]))

    mockData = [{node:{ slug: "slug", title:"slug" }}]
    mockResult = displayArticleTitles(mockData)

    expect(mockResult.length).toEqual(1)

    mockData = [{node:{ slug: null, title: null }}]
    mockResult = displayArticleTitles(mockData)
    
    expect(mockResult.length).toEqual(1)

    mockData = [{ node: null }]
    mockResult = displayArticleTitles(mockData)
  })
})