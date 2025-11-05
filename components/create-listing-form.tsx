"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Checkbox } from "./ui/checkbox"
import { Card, CardContent } from "./ui/card"
import { ImageUpload } from "./image-upload"
import type { BookCopy, Book } from "@prisma/client"

interface CreateListingFormProps {
  bookCopy: BookCopy & { book: Book }
}

export function CreateListingForm({ bookCopy }: CreateListingFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [photos, setPhotos] = useState<string[]>([])
  const [description, setDescription] = useState("")
  const [pickupLocation, setPickupLocation] = useState("")
  
  const [transferTypes, setTransferTypes] = useState({
    FREE: true,
    FOR_KOLOCOINS: false,
    TRADE: false,
    LOAN: false,
  })
  
  const [deliveryMethods, setDeliveryMethods] = useState({
    SELF_PICKUP: true,
    NOVA_POSHTA: false,
    UKRPOSHTA: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const selectedTransferTypes = Object.entries(transferTypes)
      .filter(([_, value]) => value)
      .map(([key]) => key)

    const selectedDeliveryMethods = Object.entries(deliveryMethods)
      .filter(([_, value]) => value)
      .map(([key]) => key)

    if (selectedTransferTypes.length === 0) {
      setError("Please select at least one transfer type")
      setLoading(false)
      return
    }

    if (selectedDeliveryMethods.length === 0) {
      setError("Please select at least one delivery method")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookCopyId: bookCopy.id,
          description,
          photos,
          transferTypes: selectedTransferTypes,
          deliveryMethods: selectedDeliveryMethods,
          pickupLocation: selectedDeliveryMethods.includes("SELF_PICKUP") ? pickupLocation : null,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to create listing")
      }

      router.push("/listings")
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
            <Label>Photos</Label>
            <ImageUpload value={photos} onChange={setPhotos} maxFiles={5} />
            <p className="text-sm text-muted-foreground">
              Add photos of your book to attract potential readers
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add any additional details about the book or your offer"
              rows={4}
            />
          </div>

          <div className="space-y-4">
            <Label>Transfer Types *</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="free"
                  checked={transferTypes.FREE}
                  onCheckedChange={(checked) =>
                    setTransferTypes({ ...transferTypes, FREE: checked as boolean })
                  }
                />
                <label
                  htmlFor="free"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Free - Give it away
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="kolocoins"
                  checked={transferTypes.FOR_KOLOCOINS}
                  onCheckedChange={(checked) =>
                    setTransferTypes({ ...transferTypes, FOR_KOLOCOINS: checked as boolean })
                  }
                />
                <label
                  htmlFor="kolocoins"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  For Kolocoins - Exchange for 1 KLC
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="trade"
                  checked={transferTypes.TRADE}
                  onCheckedChange={(checked) =>
                    setTransferTypes({ ...transferTypes, TRADE: checked as boolean })
                  }
                />
                <label
                  htmlFor="trade"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Trade - Exchange for another book
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="loan"
                  checked={transferTypes.LOAN}
                  onCheckedChange={(checked) =>
                    setTransferTypes({ ...transferTypes, LOAN: checked as boolean })
                  }
                />
                <label
                  htmlFor="loan"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Loan - Temporary borrowing
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Delivery Methods *</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="self_pickup"
                  checked={deliveryMethods.SELF_PICKUP}
                  onCheckedChange={(checked) =>
                    setDeliveryMethods({ ...deliveryMethods, SELF_PICKUP: checked as boolean })
                  }
                />
                <label
                  htmlFor="self_pickup"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Self-Pickup - Meet in person
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="nova_poshta"
                  checked={deliveryMethods.NOVA_POSHTA}
                  onCheckedChange={(checked) =>
                    setDeliveryMethods({ ...deliveryMethods, NOVA_POSHTA: checked as boolean })
                  }
                />
                <label
                  htmlFor="nova_poshta"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Nova Poshta
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ukrposhta"
                  checked={deliveryMethods.UKRPOSHTA}
                  onCheckedChange={(checked) =>
                    setDeliveryMethods({ ...deliveryMethods, UKRPOSHTA: checked as boolean })
                  }
                />
                <label
                  htmlFor="ukrposhta"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Ukrposhta
                </label>
              </div>
            </div>
          </div>

          {deliveryMethods.SELF_PICKUP && (
            <div className="space-y-2">
              <Label htmlFor="pickupLocation">Pickup Location</Label>
              <Textarea
                id="pickupLocation"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                placeholder="Enter your preferred pickup location (e.g., near metro station)"
                rows={2}
              />
            </div>
          )}

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive rounded-md">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <div className="flex gap-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Creating Listing..." : "Create Listing"}
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