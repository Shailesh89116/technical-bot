/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Upload, X, Check, Calculator, Phone, Mail, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

const steps = [
  { id: 1, title: "Project Type", description: "What are you building?" },
  { id: 2, title: "Specifications", description: "Material and dimensions" },
  { id: 3, title: "Services", description: "Additional services needed" },
  { id: 4, title: "Details", description: "Timeline and requirements" },
  { id: 5, title: "Contact", description: "Your information" },
]

const projectTypes = [
  {
    id: "retail",
    title: "Retail Display",
    description: "Store fixtures, display cases, signage",
    image: "/placeholder.svg?height=200&width=300&text=Retail+Display",
    basePrice: 150,
  },
  {
    id: "architecture",
    title: "Architectural",
    description: "Windows, partitions, facades",
    image: "/placeholder.svg?height=200&width=300&text=Architecture",
    basePrice: 200,
  },
  {
    id: "furniture",
    title: "Furniture",
    description: "Tables, shelving, decorative pieces",
    image: "/placeholder.svg?height=200&width=300&text=Furniture",
    basePrice: 120,
  },
  {
    id: "lighting",
    title: "Lighting",
    description: "Light diffusers, LED panels, fixtures",
    image: "/placeholder.svg?height=200&width=300&text=Lighting",
    basePrice: 180,
  },
  {
    id: "custom",
    title: "Custom Project",
    description: "Unique applications and designs",
    image: "/placeholder.svg?height=200&width=300&text=Custom+Project",
    basePrice: 250,
  },
]

const materials = [
  { id: "clear", name: "Clear Acrylic", multiplier: 1.0, description: "92% light transmission" },
  { id: "frosted", name: "Frosted Acrylic", multiplier: 1.2, description: "Elegant diffusion" },
  { id: "colored", name: "Colored Acrylic", multiplier: 1.3, description: "Various colors available" },
  { id: "textured", name: "Textured Acrylic", multiplier: 1.4, description: "Unique surface patterns" },
  { id: "mirror", name: "Mirror Acrylic", multiplier: 1.5, description: "Reflective finish" },
]

const thicknesses = [
  { id: "3mm", name: "3mm", multiplier: 0.8 },
  { id: "5mm", name: "5mm", multiplier: 1.0 },
  { id: "8mm", name: "8mm", multiplier: 1.3 },
  { id: "10mm", name: "10mm", multiplier: 1.5 },
  { id: "12mm", name: "12mm", multiplier: 1.8 },
  { id: "custom", name: "Custom", multiplier: 2.0 },
]

const services = [
  { id: "cutting", name: "Precision Cutting", price: 50, description: "Laser and CNC cutting services" },
  { id: "polishing", name: "Edge Polishing", price: 30, description: "Diamond polished edges" },
  { id: "drilling", name: "Drilling & Holes", price: 25, description: "Precise hole drilling" },
  { id: "engraving", name: "Engraving", price: 75, description: "Laser engraving and etching" },
  { id: "installation", name: "Installation", price: 200, description: "Professional installation service" },
  { id: "design", name: "Design Consultation", price: 150, description: "Expert design guidance" },
]

export default function QuotePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showEstimate, setShowEstimate] = useState(false)
  const [formData, setFormData] = useState({
    projectType: "",
    material: "",
    thickness: "",
    width: "",
    height: "",
    quantity: "1",
    selectedServices: [] as string[],
    timeline: "",
    budget: "",
    description: "",
    files: [] as File[],
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    address: "",
  })

  const progress = (currentStep / steps.length) * 100

  const calculateEstimate = () => {
    const projectType = projectTypes.find((p) => p.id === formData.projectType)
    const material = materials.find((m) => m.id === formData.material)
    const thickness = thicknesses.find((t) => t.id === formData.thickness)

    if (!projectType || !material || !thickness) return 0

    const area = ((Number.parseFloat(formData.width) || 0) * (Number.parseFloat(formData.height) || 0)) / 1000000 // Convert to m²
    const basePrice =
      projectType.basePrice * material.multiplier * thickness.multiplier * area * Number.parseInt(formData.quantity)

    const servicesPrice = formData.selectedServices.reduce((total, serviceId) => {
      const service = services.find((s) => s.id === serviceId)
      return total + (service?.price || 0)
    }, 0)

    return Math.round(basePrice + servicesPrice)
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files).slice(0, 5 - formData.files.length)
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...newFiles],
      }))
    }
  }

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }))
  }

  const toggleService = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter((id) => id !== serviceId)
        : [...prev.selectedServices, serviceId],
    }))
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.projectType !== ""
      case 2:
        return formData.material !== "" && formData.thickness !== "" && formData.width !== "" && formData.height !== ""
      case 3:
        return true // Services are optional
      case 4:
        return formData.timeline !== ""
      case 5:
        return formData.firstName !== "" && formData.lastName !== "" && formData.email !== ""
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-semibold text-gray-900">Get Quote</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowEstimate(!showEstimate)}
              className="flex items-center gap-2 text-[#02a89e] font-medium"
            >
              <Calculator className="h-4 w-4" />₹{calculateEstimate().toLocaleString()}
            </Button>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">
                Step {currentStep} of {steps.length}
              </span>
              <span className="text-gray-500">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="text-center">
              <div className="text-sm font-medium text-gray-900">{steps[currentStep - 1].title}</div>
              <div className="text-xs text-gray-500">{steps[currentStep - 1].description}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Estimate Overlay */}
      {showEstimate && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setShowEstimate(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Estimate Breakdown</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowEstimate(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="text-3xl font-light text-gray-900 mb-2">₹{calculateEstimate().toLocaleString()}</div>
            <p className="text-gray-500 mb-6">Estimated total cost</p>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Base Price:</span>
                <span className="font-medium">₹{Math.round(calculateEstimate() * 0.7).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Services:</span>
                <span className="font-medium">₹{Math.round(calculateEstimate() * 0.3).toLocaleString()}</span>
              </div>
            </div>

            <div className="rounded-2xl bg-blue-50 p-4 text-sm text-blue-700 mb-6">
              This is a preliminary estimate. Final pricing may vary based on specifications and requirements.
            </div>

            {/* Quick Contact */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Need Help?</h4>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-col items-center gap-1 h-auto py-3 bg-transparent"
                >
                  <Phone className="h-4 w-4" />
                  <span className="text-xs">Call</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-col items-center gap-1 h-auto py-3 bg-transparent"
                >
                  <Mail className="h-4 w-4" />
                  <span className="text-xs">Email</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-col items-center gap-1 h-auto py-3 bg-transparent"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-xs">Chat</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="px-4 py-6 pb-24">
        <div className="max-w-2xl mx-auto">
          {/* Step 1: Project Type */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-light text-gray-900 mb-2">What type of project are you working on?</h2>
                <p className="text-gray-600">Choose the category that best fits your needs</p>
              </div>

              <div className="space-y-4">
                {projectTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`cursor-pointer rounded-2xl border-2 p-4 transition-all duration-300 ${
                      formData.projectType === type.id
                        ? "border-[#02a89e] bg-[#02a89e]/5"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                    onClick={() => setFormData((prev) => ({ ...prev, projectType: type.id }))}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={type.image || "/placeholder.svg"} alt={type.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1">{type.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                        <div className="text-sm font-medium text-[#02a89e]">Starting from ₹{type.basePrice}/m²</div>
                      </div>
                      {formData.projectType === type.id && <Check className="h-6 w-6 text-[#02a89e] flex-shrink-0" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Specifications */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-light text-gray-900 mb-2">Project Specifications</h2>
                <p className="text-gray-600">Tell us about your material and size requirements</p>
              </div>

              {/* Material Type */}
              <div>
                <Label className="text-lg font-medium text-gray-900 mb-4 block">Material Type</Label>
                <div className="space-y-3">
                  {materials.map((material) => (
                    <div
                      key={material.id}
                      className={`cursor-pointer rounded-2xl border-2 p-4 transition-all duration-300 ${
                        formData.material === material.id
                          ? "border-[#02a89e] bg-[#02a89e]/5"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                      onClick={() => setFormData((prev) => ({ ...prev, material: material.id }))}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">{material.name}</div>
                          <div className="text-sm text-gray-600">{material.description}</div>
                        </div>
                        {formData.material === material.id && <Check className="h-5 w-5 text-[#02a89e]" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Thickness */}
              <div>
                <Label className="text-lg font-medium text-gray-900 mb-4 block">Thickness</Label>
                <div className="grid grid-cols-3 gap-3">
                  {thicknesses.map((thickness) => (
                    <div
                      key={thickness.id}
                      className={`cursor-pointer rounded-2xl border-2 p-4 text-center transition-all duration-300 ${
                        formData.thickness === thickness.id
                          ? "border-[#02a89e] bg-[#02a89e]/5"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                      onClick={() => setFormData((prev) => ({ ...prev, thickness: thickness.id }))}
                    >
                      <div className="font-semibold text-gray-900">{thickness.name}</div>
                      {formData.thickness === thickness.id && <Check className="h-4 w-4 text-[#02a89e] mx-auto mt-2" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Dimensions */}
              <div className="space-y-4">
                <Label className="text-lg font-medium text-gray-900 block">Dimensions & Quantity</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="width" className="text-sm font-medium text-gray-700 mb-2 block">
                      Width (mm)
                    </Label>
                    <Input
                      id="width"
                      type="number"
                      placeholder="1000"
                      className="h-14 text-lg rounded-2xl border-gray-200"
                      value={formData.width}
                      onChange={(e) => setFormData((prev) => ({ ...prev, width: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="height" className="text-sm font-medium text-gray-700 mb-2 block">
                      Height (mm)
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="1000"
                      className="h-14 text-lg rounded-2xl border-gray-200"
                      value={formData.height}
                      onChange={(e) => setFormData((prev) => ({ ...prev, height: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="quantity" className="text-sm font-medium text-gray-700 mb-2 block">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    className="h-14 text-lg rounded-2xl border-gray-200"
                    value={formData.quantity}
                    onChange={(e) => setFormData((prev) => ({ ...prev, quantity: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Services */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-light text-gray-900 mb-2">Additional Services</h2>
                <p className="text-gray-600">Select any additional services you need (optional)</p>
              </div>

              <div className="space-y-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`cursor-pointer rounded-2xl border-2 p-4 transition-all duration-300 ${
                      formData.selectedServices.includes(service.id)
                        ? "border-[#02a89e] bg-[#02a89e]/5"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                    onClick={() => toggleService(service.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                      <div className="ml-4 text-right flex-shrink-0">
                        <div className="font-semibold text-gray-900">₹{service.price}</div>
                        {formData.selectedServices.includes(service.id) && (
                          <Check className="h-5 w-5 text-[#02a89e] ml-auto mt-1" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Details */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-light text-gray-900 mb-2">Project Details</h2>
                <p className="text-gray-600">Help us understand your timeline and requirements</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="timeline" className="text-lg font-medium text-gray-900 mb-3 block">
                    Project Timeline *
                  </Label>
                  <select
                    id="timeline"
                    className="flex h-14 w-full rounded-2xl border border-gray-200 bg-white px-4 py-2 text-base focus:border-[#02a89e] focus:outline-none"
                    value={formData.timeline}
                    onChange={(e) => setFormData((prev) => ({ ...prev, timeline: e.target.value }))}
                  >
                    <option value="">Select timeline</option>
                    <option value="rush">Rush (1-2 weeks)</option>
                    <option value="standard">Standard (3-4 weeks)</option>
                    <option value="flexible">Flexible (5+ weeks)</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="budget" className="text-lg font-medium text-gray-900 mb-3 block">
                    Budget Range
                  </Label>
                  <select
                    id="budget"
                    className="flex h-14 w-full rounded-2xl border border-gray-200 bg-white px-4 py-2 text-base focus:border-[#02a89e] focus:outline-none"
                    value={formData.budget}
                    onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                  >
                    <option value="">Select budget (optional)</option>
                    <option value="under-1000">Under ₹75,000</option>
                    <option value="1000-5000">₹75,000 - ₹3,75,000</option>
                    <option value="5000-10000">₹3,75,000 - ₹7,50,000</option>
                    <option value="over-10000">Over ₹7,50,000</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="description" className="text-lg font-medium text-gray-900 mb-3 block">
                    Project Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us more about your project requirements, special considerations, or any questions you have..."
                    rows={4}
                    className="rounded-2xl border-gray-200 resize-none text-base"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div>
                  <Label className="text-lg font-medium text-gray-900 mb-4 block">Upload Files (Optional)</Label>
                  <div className="rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center">
                    <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                    <p className="text-gray-600 mb-2">
                      <label className="cursor-pointer text-[#02a89e] hover:underline font-medium">
                        Tap to upload files
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png,.dwg"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e.target.files)}
                        />
                      </label>
                    </p>
                    <p className="text-sm text-gray-500">PDF, JPG, PNG, DWG files up to 10MB each</p>
                  </div>

                  {formData.files.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {formData.files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                          <span className="text-gray-700 font-medium truncate">{file.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="rounded-full ml-2 flex-shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Contact */}
          {currentStep === 5 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-light text-gray-900 mb-2">Contact Information</h2>
                <p className="text-gray-600">We'll use this to send you the quote</p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-base font-medium text-gray-900 mb-2 block">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      required
                      className="h-14 text-base rounded-2xl border-gray-200"
                      value={formData.firstName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-base font-medium text-gray-900 mb-2 block">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      required
                      className="h-14 text-base rounded-2xl border-gray-200"
                      value={formData.lastName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-base font-medium text-gray-900 mb-2 block">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="h-14 text-base rounded-2xl border-gray-200"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-base font-medium text-gray-900 mb-2 block">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    className="h-14 text-base rounded-2xl border-gray-200"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="company" className="text-base font-medium text-gray-900 mb-2 block">
                    Company Name
                  </Label>
                  <Input
                    id="company"
                    className="h-14 text-base rounded-2xl border-gray-200"
                    value={formData.company}
                    onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-base font-medium text-gray-900 mb-2 block">
                    Project Address
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="Street address, city, state, zip code"
                    rows={3}
                    className="rounded-2xl border-gray-200 resize-none text-base"
                    value={formData.address}
                    onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                  />
                </div>

                {/* Project Summary */}
                <div className="rounded-2xl bg-gray-50 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Project Type:</span>
                      <span className="font-medium text-gray-900">
                        {projectTypes.find((p) => p.id === formData.projectType)?.title || "Not selected"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Material:</span>
                      <span className="font-medium text-gray-900">
                        {materials.find((m) => m.id === formData.material)?.name || "Not selected"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Dimensions:</span>
                      <span className="font-medium text-gray-900">
                        {formData.width && formData.height
                          ? `${formData.width}mm × ${formData.height}mm`
                          : "Not specified"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="font-medium text-gray-900">{formData.quantity}</span>
                    </div>
                    {formData.selectedServices.length > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Services:</span>
                        <span className="font-medium text-gray-900">{formData.selectedServices.length} selected</span>
                      </div>
                    )}
                    <Separator className="my-3" />
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-semibold text-gray-900">Estimated Total:</span>
                      <span className="font-bold text-[#02a89e]">₹{calculateEstimate().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2 h-12 px-6 rounded-full border-gray-300 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>

          {currentStep < steps.length ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center gap-2 h-12 px-6 rounded-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="flex items-center gap-2 h-12 px-6 rounded-full bg-[#02a89e] hover:bg-[#028a82] disabled:bg-gray-300"
            >
              Submit Quote
              <Check className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
