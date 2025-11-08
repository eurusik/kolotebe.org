'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n/locale-provider"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface CoverImage {
  file: File
  preview: string
  id: string
}

interface BookCoverUploadSectionProps {
  coverImages: CoverImage[]
  selectedCoverId: string | null
  onImagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveImage: (id: string) => void
  onSelectCover: (id: string) => void
}

export function BookCoverUploadSection({
  coverImages,
  selectedCoverId,
  onImagesChange,
  onRemoveImage,
  onSelectCover,
}: BookCoverUploadSectionProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-2">
      <Label>{t('books.coverImageLabel')}</Label>
      <p className="text-sm text-muted-foreground mb-3">{t('books.coverImageDescription')}</p>
      
      {coverImages.length > 0 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {coverImages.map((image) => (
              <div
                key={image.id}
                className={`relative group cursor-pointer border-4 rounded-lg overflow-hidden transition-all ${
                  selectedCoverId === image.id
                    ? 'border-primary shadow-lg'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => onSelectCover(image.id)}
              >
                <div className="aspect-[2/3] relative">
                  <Image
                    src={image.preview}
                    alt="Book cover"
                    fill
                    className="object-cover"
                  />
                  {selectedCoverId === image.id && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md font-semibold">
                      {t('books.mainCover')}
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemoveImage(image.id)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div>
            <Input
              type="file"
              id="addMoreImages"
              accept="image/*"
              multiple
              className="hidden"
              onChange={onImagesChange}
            />
            <Label htmlFor="addMoreImages">
              <Button type="button" variant="outline" className="w-full" asChild>
                <span className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  {t('books.addMorePhotos')}
                </span>
              </Button>
            </Label>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
          <Input
            type="file"
            id="coverImage"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onImagesChange}
          />
          <Label htmlFor="coverImage" className="cursor-pointer flex flex-col items-center gap-2">
            <Upload className="w-10 h-10 text-muted-foreground" />
            <span className="text-sm font-medium">{t('books.uploadImage')}</span>
            <span className="text-xs text-muted-foreground">PNG, JPG (max 5MB)</span>
          </Label>
        </div>
      )}
    </div>
  )
}
