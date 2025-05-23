"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { SlidersHorizontal} from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 200])
  const [isOpen, setIsOpen] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const filtersRef = useRef<HTMLDivElement>(null)

  // Track changes in filters
  useEffect(() => {
    setHasChanges(true)
  }, [priceRange])

  const handleReset = () => {
    setPriceRange([0, 200])
    setHasChanges(false)
  }

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-4 py-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">{title}</h3>
      {children}
    </div>
  )

  const FiltersContent = () => (
    <div className="space-y-1">
      {/* Thickness Filter */}
      <FilterSection title="Thickness">
        <div className="space-y-3">
          {["2mm", "3mm", "5mm", "8mm", "10mm"].map((thickness) => (
            <div key={thickness} className="flex items-center space-x-3">
              <Checkbox
                id={`thickness-${thickness}`}
                className="h-5 w-5 rounded-sm border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
              />
              <Label htmlFor={`thickness-${thickness}`} className="text-sm font-normal text-gray-700 cursor-pointer">
                {thickness}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator className="bg-gray-200" />

      {/* Color Filter */}
      <FilterSection title="Color">
        <div className="space-y-3">
          {[
            { name: "Clear", color: "bg-transparent border-2 border-gray-300" },
            { name: "Frosted", color: "bg-gray-100" },
            { name: "Black", color: "bg-black" },
            { name: "White", color: "bg-white border border-gray-300" },
            { name: "Blue", color: "bg-blue-500" },
            { name: "Red", color: "bg-red-500" },
          ].map((item) => (
            <div key={item.name} className="flex items-center space-x-3">
              <Checkbox
                id={`color-${item.name.toLowerCase()}`}
                className="h-5 w-5 rounded-sm border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
              />
              <div className={`h-5 w-5 rounded-sm ${item.color}`} />
              <Label
                htmlFor={`color-${item.name.toLowerCase()}`}
                className="text-sm font-normal text-gray-700 cursor-pointer"
              >
                {item.name}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator className="bg-gray-200" />

      {/* Size Filter */}
      <FilterSection title="Size">
        <div className="space-y-3">
          {["4' × 8'", "5' × 10'", "Custom Size"].map((size) => (
            <div key={size} className="flex items-center space-x-3">
              <Checkbox
                id={`size-${size.replace(/[^a-zA-Z0-9]/g, "")}`}
                className="h-5 w-5 rounded-sm border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
              />
              <Label
                htmlFor={`size-${size.replace(/[^a-zA-Z0-9]/g, "")}`}
                className="text-sm font-normal text-gray-700 cursor-pointer"
              >
                {size}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator className="bg-gray-200" />

      {/* Price Range Filter */}
      <FilterSection title="Price Range">
        <div className="space-y-6">
          <Slider value={priceRange} onValueChange={setPriceRange} max={500} step={10} className="w-full" />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </FilterSection>
    </div>
  )

  return (
    <div>
      {/* Mobile Filter Button */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="mb-6 w-full rounded-full border-gray-300 lg:hidden">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters & Sort
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col p-0 border-0 shadow-xl w-[85%] sm:max-w-md"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {/* Header */}
          <SheetHeader className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <SheetTitle className="text-lg font-medium">Filters</SheetTitle>
           
          </SheetHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 pb-24" ref={filtersRef}>
            <FiltersContent />
          </div>

          {/* Fixed Bottom Buttons */}
          <div className="border-t border-gray-200 bg-white px-6 py-4 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleReset}
              className="text-gray-500 hover:text-gray-700"
              disabled={!hasChanges}
            >
              Reset
            </Button>
            <Button className="rounded-full bg-black text-white hover:bg-gray-800 px-8">Apply</Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-medium">Filters</h2>
            <Button
              variant="ghost"
              className="h-auto p-0 text-sm text-gray-500 hover:text-gray-700"
              onClick={handleReset}
              disabled={!hasChanges}
            >
              Reset
            </Button>
          </div>
          <FiltersContent />
          <Button className="mt-6 w-full rounded-full bg-black text-white hover:bg-gray-800">Apply Filters</Button>
        </div>
      </div>
    </div>
  )
}
