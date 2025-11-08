"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BookCondition } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from "@/lib/i18n/locale-provider"

interface AddBookFormProps {
  userId: string
}

export function AddBookForm({ userId }: AddBookFormProps) {
  const router = useRouter()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<{
    title: string
    author: string
    isbn: string
    genre: string
    publicationYear: string
    description: string
    condition: BookCondition
    notes: string
  }>({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    publicationYear: "",
    description: "",
    condition: BookCondition.GOOD,
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
            <Label htmlFor="title">{t('books.titleLabel')}</Label>
            <Input
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder={t('books.titlePlaceholder')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">{t('books.authorLabel')}</Label>
            <Input
              id="author"
              required
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              placeholder={t('books.authorPlaceholder')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="isbn">{t('books.isbnLabel')}</Label>
              <Input
                id="isbn"
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                placeholder={t('books.isbnPlaceholder')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="publicationYear">{t('books.publicationYearLabel')}</Label>
              <Input
                id="publicationYear"
                type="number"
                value={formData.publicationYear}
                onChange={(e) => setFormData({ ...formData, publicationYear: e.target.value })}
                placeholder={t('books.publicationYearPlaceholder')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre">{t('books.genreLabel')}</Label>
            <Input
              id="genre"
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              placeholder={t('books.genrePlaceholder')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t('books.descriptionLabel')}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={t('books.descriptionPlaceholder')}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">{t('books.conditionLabel')}</Label>
            <Select
              value={formData.condition}
              onValueChange={(value) => setFormData({ ...formData, condition: value as BookCondition })}
            >
              <SelectTrigger id="condition">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NEW">{t('bookConditions.NEW')}</SelectItem>
                <SelectItem value="LIKE_NEW">{t('bookConditions.LIKE_NEW')}</SelectItem>
                <SelectItem value="GOOD">{t('bookConditions.GOOD')}</SelectItem>
                <SelectItem value="FAIR">{t('bookConditions.FAIR')}</SelectItem>
                <SelectItem value="POOR">{t('bookConditions.POOR')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">{t('books.personalNotesLabel')}</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder={t('books.personalNotesPlaceholder')}
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
              {loading ? t('books.addingBook') : t('books.continueToListing')}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
            >
              {t('books.cancel')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
