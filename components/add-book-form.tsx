"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Card, CardContent } from "./ui/card"

interface AddBookFormProps {
  userId: string
}

export function AddBookForm({ userId }: AddBookFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    publicationYear: "",
    description: "",
    condition: "GOOD",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to add book")
      }

      const data = await response.json()
      router.push(`/listings/create?bookCopyId=${data.bookCopyId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Book Title *</Label>
            <Input
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter book title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author *</Label>
            <Input
              id="author"
              required
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              placeholder="Enter author name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="isbn">ISBN (optional)</Label>
              <Input
                id="isbn"
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                placeholder="978-0-123456-78-9"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="publicationYear">Publication Year (optional)</Label>
              <Input
                id="publicationYear"
                type="number"
                value={formData.publicationYear}
                onChange={(e) => setFormData({ ...formData, publicationYear: e.target.value })}
                placeholder="2023"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre">Genre (optional)</Label>
            <Input
              id="genre"
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              placeholder="Fiction, Non-fiction, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the book"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">Book Condition *</Label>
            <Select
              value={formData.condition}
              onValueChange={(value) => setFormData({ ...formData, condition: value })}
            >
              <SelectTrigger id="condition">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NEW">New - Unread, pristine condition</SelectItem>
                <SelectItem value="LIKE_NEW">Like New - Minimal wear</SelectItem>
                <SelectItem value="GOOD">Good - Normal used condition</SelectItem>
                <SelectItem value="FAIR">Fair - Noticeable wear but readable</SelectItem>
                <SelectItem value="POOR">Poor - Significant wear</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Personal Notes (optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any additional notes about this copy"
              rows={3}
            />
          </div>

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive rounded-md">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <div className="flex gap-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Adding Book..." : "Continue to Create Listing"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
