'use client'

import { useState, useCallback, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

// Mock data for demonstration
const mockPosts = [
  { id: 1, title: "Introduction to React", category: "React", content: "React is a popular JavaScript library for building user interfaces..." },
  { id: 2, title: "Getting Started with Next.js", category: "Next.js", content: "Next.js is a powerful framework for building React applications..." },
  { id: 3, title: "CSS-in-JS Solutions", category: "CSS", content: "CSS-in-JS is an approach to styling React components..." },
  { id: 4, title: "State Management in React", category: "React", content: "Effective state management is crucial for building scalable React applications..." },
  { id: 5, title: "Server-Side Rendering with Next.js", category: "Next.js", content: "Server-side rendering (SSR) is a technique for improving the performance and SEO of web applications..." },
  { id: 6, title: "App routing with Next.js", category: "Next.js", content: "App routing is a technique that maps a specific URL to the function that performs a task" },
  { id: 7, title: "Tailwind CSS", category: "CSS", content: "Tailwind CSS is a framework for styling React components..." },
]

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [results, setResults] = useState(mockPosts)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => {
      const filtered = mockPosts.filter(post =>
        (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filter === 'all' || post.category === filter)
      )
      setResults(filtered)
      setIsLoading(false)
    }, 500) // Simulate network delay
  }, [searchTerm, filter])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch()
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, filter, handleSearch])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Blog Search</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
          {isLoading && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-spin text-muted-foreground" size={20} />
          )}
        </div>
        <Select value={filter} onValueChange={(value) => setFilter(value)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="React">React</SelectItem>
            <SelectItem value="Next.js">Next.js</SelectItem>
            <SelectItem value="CSS">CSS</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {results.length} result{results.length !== 1 ? 's' : ''}
          {searchTerm && ` for "${searchTerm}"`}
          {filter !== 'all' && ` in ${filter}`}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.map(post => (
          <Card key={post.id} className="transition-shadow hover:shadow-md">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <Badge className="mb-4">{post.category}</Badge>
              <p className="text-sm line-clamp-3">{post.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-xl font-semibold mb-2">No results found</p>
          <p className="text-muted-foreground">Try a different search term or filter.</p>
        </div>
      )}
    </div>
  )
}
