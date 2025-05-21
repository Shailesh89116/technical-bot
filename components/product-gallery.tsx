"use client"

import { useState } from "react"
import Image from "next/image"

export function ProductGallery({ images }: { images: string[] }) {
  const [mainImage, setMainImage] = useState(images[0])

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-lg border">
        <Image
          src={mainImage || "/placeholder.svg"}
          alt="Product image"
          width={600}
          height={600}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex gap-4 overflow-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative min-w-[80px] overflow-hidden rounded-md border ${
              mainImage === image ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setMainImage(image)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Product thumbnail ${index + 1}`}
              width={80}
              height={80}
              className="h-20 w-20 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
