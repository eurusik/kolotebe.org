"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BookCondition } from "@prisma/client"
import { Card, CardContent } from "@/components/ui/card"
import { BookBasicInfoSection } from "./form-sections/book-basic-info-section"
import { BookMetadataSection } from "./form-sections/book-metadata-section"
import { BookCoverUploadSection } from "./form-sections/book-cover-upload-section"
import { BookDescriptionSection } from "./form-sections/book-description-section"
import { BookConditionSection } from "./form-sections/book-condition-section"
import { BookNotesSection } from "./form-sections/book-notes-section"
import { FormActions } from "./form-sections/form-actions"

interface AddBookFormProps {
  userId: string
}

export function AddBookForm({ userId }: AddBookFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [coverImages, setCoverImages] = useState<{ file: File; preview: string; id: string }[]>([])
  const [selectedCoverId, setSelectedCoverId] = useState<string | null>(null)
  
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
      // TODO: Upload cover image to S3/R2 if provided
      // For now, we'll skip the image upload
      
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    const newImages = files.map((file) => {
      const id = Math.random().toString(36).substring(7)
      return new Promise<{ file: File; preview: string; id: string }>((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          resolve({
            file,
            preview: reader.result as string,
            id,
          })
        }
        reader.readAsDataURL(file)
      })
    })

    Promise.all(newImages).then((images) => {
      setCoverImages((prev) => [...prev, ...images])
      if (!selectedCoverId && images.length > 0) {
        setSelectedCoverId(images[0].id)
      }
    })

    // Reset input
    e.target.value = ''
  }

  const handleRemoveImage = (id: string) => {
    setCoverImages((prev) => prev.filter((img) => img.id !== id))
    if (selectedCoverId === id) {
      setCoverImages((prev) => {
        if (prev.length > 0) {
          setSelectedCoverId(prev[0].id)
        } else {
          setSelectedCoverId(null)
        }
        return prev
      })
    }
  }

  const handleSelectCover = (id: string) => {
    setSelectedCoverId(id)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <BookBasicInfoSection
            title={formData.title}
            author={formData.author}
            onTitleChange={(value) => setFormData({ ...formData, title: value })}
            onAuthorChange={(value) => setFormData({ ...formData, author: value })}
          />

          <BookMetadataSection
            isbn={formData.isbn}
            publicationYear={formData.publicationYear}
            genre={formData.genre}
            onIsbnChange={(value) => setFormData({ ...formData, isbn: value })}
            onPublicationYearChange={(value) => setFormData({ ...formData, publicationYear: value })}
            onGenreChange={(value) => setFormData({ ...formData, genre: value })}
          />

          <BookCoverUploadSection
            coverImages={coverImages}
            selectedCoverId={selectedCoverId}
            onImagesChange={handleImageChange}
            onRemoveImage={handleRemoveImage}
            onSelectCover={handleSelectCover}
          />

          <BookDescriptionSection
            description={formData.description}
            onDescriptionChange={(value) => setFormData({ ...formData, description: value })}
          />

          <BookConditionSection
            condition={formData.condition}
            onConditionChange={(value) => setFormData({ ...formData, condition: value })}
          />

          <BookNotesSection
            notes={formData.notes}
            onNotesChange={(value) => setFormData({ ...formData, notes: value })}
          />

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive rounded-md">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <FormActions
            loading={loading}
            onCancel={() => router.back()}
          />
        </form>
      </CardContent>
    </Card>
  )
}
