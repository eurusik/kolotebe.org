"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { X } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  value: string[]
  onChange: (urls: string[]) => void
  maxFiles?: number
}

export function ImageUpload({ value, onChange, maxFiles = 5 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    if (files.length + value.length > maxFiles) {
      setError(`Maximum ${maxFiles} images allowed`)
      return
    }

    setUploading(true)
    setError(null)

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || "Upload failed")
        }

        const data = await response.json()
        return data.url
      })

      const urls = await Promise.all(uploadPromises)
      onChange([...value, ...urls])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (url: string) => {
    onChange(value.filter((v) => v !== url))
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {value.map((url) => (
          <div key={url} className="relative aspect-square">
            <Image
              src={url}
              alt="Upload"
              fill
              className="object-cover rounded-lg"
            />
            <button
              onClick={() => removeImage(url)}
              className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        
        {value.length < maxFiles && (
          <label className="aspect-square border-2 border-dashed border-border rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
            <div className="text-center">
              <div className="text-muted-foreground">
                {uploading ? "Uploading..." : "Add Photo"}
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        )}
      </div>
      
      {error && <p className="text-sm text-destructive">{error}</p>}
      
      <p className="text-sm text-muted-foreground">
        {value.length} / {maxFiles} photos uploaded
      </p>
    </div>
  )
}
