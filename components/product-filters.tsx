"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SlidersHorizontal } from "lucide-react"

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 200])

  const MobileFilters = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="mb-4 md:hidden">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="py-4">
          <h2 className="mb-4 text-lg font-medium">Filters</h2>
          <FiltersContent />
        </div>
      </SheetContent>
    </Sheet>
  )

  const FiltersContent = () => (
    <Accordion type="multiple" defaultValue={["thickness", "color", "size", "price"]} className="w-full">
      <AccordionItem value="thickness">
        <AccordionTrigger>Thickness</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="thickness-2mm" />
              <Label htmlFor="thickness-2mm">2 mm</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="thickness-3mm" />
              <Label htmlFor="thickness-3mm">3 mm</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="thickness-5mm" />
              <Label htmlFor="thickness-5mm">5 mm</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="thickness-10mm" />
              <Label htmlFor="thickness-10mm">10 mm</Label>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="color">
        <AccordionTrigger>Color</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="color-clear" />
              <Label htmlFor="color-clear">Clear</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="color-frosted" />
              <Label htmlFor="color-frosted">Frosted</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="color-black" />
              <Label htmlFor="color-black">Black</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="color-white" />
              <Label htmlFor="color-white">White</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="color-blue" />
              <Label htmlFor="color-blue">Blue</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="color-red" />
              <Label htmlFor="color-red">Red</Label>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="size">
        <AccordionTrigger>Size</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="size-4x8" />
              <Label htmlFor="size-4x8">4' × 8'</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="size-5x10" />
              <Label htmlFor="size-5x10">5' × 10'</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="size-custom" />
              <Label htmlFor="size-custom">Custom Size</Label>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="price">
        <AccordionTrigger>Price Range</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <Slider defaultValue={[0, 200]} max={500} step={10} value={priceRange} onValueChange={setPriceRange} />
            <div className="flex items-center justify-between">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )

  return (
    <div>
      <MobileFilters />
      <div className="hidden md:block">
        <h2 className="mb-4 text-lg font-medium">Filters</h2>
        <FiltersContent />
      </div>
    </div>
  )
}
