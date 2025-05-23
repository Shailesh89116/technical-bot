"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, CreditCard, ArrowLeft, ShieldCheck, Loader2, Lock, Truck, Package } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    address2: "",
    city: "",
    state: "NY",
    zip: "",
    country: "US",
    notes: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    nameOnCard: "",
  })

  // Cart items
  const cartItems = [
    {
      id: 1,
      name: "Clear 5mm Acrylic Sheet",
      image: "/img-2.png",
      specs: "5mm thickness, 4'×8'",
      price: 89.99,
      quantity: 2,
    },
    {
      id: 5,
      name: "Frosted 3mm Acrylic Sheet",
      image: "/img-1.png",
      specs: "3mm thickness, 4'×8'",
      price: 69.99,
      quantity: 1,
    },
  ]

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = shippingMethod === "express" ? 35 : subtotal > 200 ? 0 : 25
  const tax = subtotal * 0.07
  const total = subtotal + shipping + tax

  const steps = [
    { number: 1, title: "Shipping", icon: Package },
    { number: 2, title: "Delivery", icon: Truck },
    { number: 3, title: "Payment", icon: CreditCard },
    { number: 4, title: "Review", icon: CheckCircle2 },
  ]

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
    if (formErrors[id]) {
      setFormErrors({ ...formErrors, [id]: null })
    }
  }

  const nextStep = () => {
    if (step === 1) {
      const errors = validateShippingInfo()
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors)
        return
      }
    } else if (step === 3 && paymentMethod === "credit-card") {
      const errors = validatePaymentInfo()
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors)
        return
      }
    }
    setStep(step + 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const validateShippingInfo = () => {
    const errors = {}
    const requiredFields = ["firstName", "lastName", "email", "phone", "address", "city", "zip"]

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = "This field is required"
      }
    })

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      errors.phone = "Please enter a valid 10-digit phone number"
    }

    if (formData.zip && !/^\d{5}(-\d{4})?$/.test(formData.zip)) {
      errors.zip = "Please enter a valid ZIP code"
    }

    return errors
  }

  const validatePaymentInfo = () => {
    const errors = {}

    if (!formData.cardNumber) {
      errors.cardNumber = "Card number is required"
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      errors.cardNumber = "Please enter a valid 16-digit card number"
    }

    if (!formData.cardExpiry) {
      errors.cardExpiry = "Expiry date is required"
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry)) {
      errors.cardExpiry = "Please use MM/YY format"
    }

    if (!formData.cardCvc) {
      errors.cardCvc = "CVC is required"
    } else if (!/^\d{3,4}$/.test(formData.cardCvc)) {
      errors.cardCvc = "Please enter a valid CVC"
    }

    if (!formData.nameOnCard) {
      errors.nameOnCard = "Name on card is required"
    }

    return errors
  }

  const handlePlaceOrder = async () => {
    try {
      setIsSubmitting(true)

      const order = {
        id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },
        shipping: {
          address: formData.address,
          address2: formData.address2,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
          method: shippingMethod,
          cost: shipping,
        },
        payment: {
          method: paymentMethod,
          lastFour: paymentMethod === "credit-card" ? formData.cardNumber.slice(-4) : null,
        },
        items: cartItems,
        subtotal,
        tax,
        total,
        date: new Date().toISOString(),
      }

      sessionStorage.setItem("lastOrder", JSON.stringify(order))
      router.push(`/checkout/confirmation?orderId=${order.id}`)
    } catch (error) {
      console.error("Error placing order:", error)
      toast({
        title: "Error",
        description: "There was a problem processing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900">Checkout</h1>
          <p className="mt-2 text-lg text-gray-600">Complete your order in just a few steps</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center justify-between">
              {steps.map((stepItem, index) => (
                <div key={stepItem.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        step >= stepItem.number
                          ? "border-black bg-black text-white"
                          : "border-gray-300 bg-white text-gray-400"
                      }`}
                    >
                      {step > stepItem.number ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : (
                        <stepItem.icon className="h-6 w-6" />
                      )}
                    </div>
                    <span
                      className={`mt-2 text-sm font-medium ${step >= stepItem.number ? "text-black" : "text-gray-400"}`}
                    >
                      {stepItem.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`mx-4 h-0.5 w-16 transition-all duration-300 sm:w-24 ${
                        step > stepItem.number ? "bg-black" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <div className="p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900">Shipping Information</h2>
                    <p className="mt-1 text-gray-600">Where should we send your order?</p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-medium text-gray-900">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`rounded-xl border-gray-200 focus:border-black focus:ring-black ${
                            formErrors.firstName ? "border-red-500" : ""
                          }`}
                        />
                        {formErrors.firstName && <p className="text-sm text-red-600">{formErrors.firstName}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-medium text-gray-900">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`rounded-xl border-gray-200 focus:border-black focus:ring-black ${
                            formErrors.lastName ? "border-red-500" : ""
                          }`}
                        />
                        {formErrors.lastName && <p className="text-sm text-red-600">{formErrors.lastName}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-900">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`rounded-xl border-gray-200 focus:border-black focus:ring-black ${
                          formErrors.email ? "border-red-500" : ""
                        }`}
                      />
                      {formErrors.email && <p className="text-sm text-red-600">{formErrors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-900">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`rounded-xl border-gray-200 focus:border-black focus:ring-black ${
                          formErrors.phone ? "border-red-500" : ""
                        }`}
                      />
                      {formErrors.phone && <p className="text-sm text-red-600">{formErrors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-sm font-medium text-gray-900">
                        Street Address
                      </Label>
                      <Input
                        id="address"
                        placeholder="123 Main Street"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`rounded-xl border-gray-200 focus:border-black focus:ring-black ${
                          formErrors.address ? "border-red-500" : ""
                        }`}
                      />
                      {formErrors.address && <p className="text-sm text-red-600">{formErrors.address}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address2" className="text-sm font-medium text-gray-900">
                        Apartment, Suite, etc. (Optional)
                      </Label>
                      <Input
                        id="address2"
                        placeholder="Apartment, suite, etc."
                        value={formData.address2}
                        onChange={handleInputChange}
                        className="rounded-xl border-gray-200 focus:border-black focus:ring-black"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm font-medium text-gray-900">
                          City
                        </Label>
                        <Input
                          id="city"
                          placeholder="New York"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`rounded-xl border-gray-200 focus:border-black focus:ring-black ${
                            formErrors.city ? "border-red-500" : ""
                          }`}
                        />
                        {formErrors.city && <p className="text-sm text-red-600">{formErrors.city}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-sm font-medium text-gray-900">
                          State
                        </Label>
                        <Select
                          value={formData.state}
                          onValueChange={(value) => setFormData({ ...formData, state: value })}
                        >
                          <SelectTrigger className="rounded-xl border-gray-200 focus:border-black focus:ring-black">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="NY">New York</SelectItem>
                            <SelectItem value="CA">California</SelectItem>
                            <SelectItem value="TX">Texas</SelectItem>
                            <SelectItem value="FL">Florida</SelectItem>
                            <SelectItem value="IL">Illinois</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip" className="text-sm font-medium text-gray-900">
                          ZIP Code
                        </Label>
                        <Input
                          id="zip"
                          placeholder="10001"
                          value={formData.zip}
                          onChange={handleInputChange}
                          className={`rounded-xl border-gray-200 focus:border-black focus:ring-black ${
                            formErrors.zip ? "border-red-500" : ""
                          }`}
                        />
                        {formErrors.zip && <p className="text-sm text-red-600">{formErrors.zip}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-sm font-medium text-gray-900">
                        Order Notes (Optional)
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Special instructions for delivery"
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="rounded-xl border-gray-200 focus:border-black focus:ring-black"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-8">
                    <Button variant="ghost" asChild className="rounded-full">
                      <Link href="/cart">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Cart
                      </Link>
                    </Button>
                    <Button onClick={nextStep} className="rounded-full bg-black px-8 hover:bg-gray-800">
                      Continue to Delivery
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Delivery */}
              {step === 2 && (
                <div className="p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900">Delivery Options</h2>
                    <p className="mt-1 text-gray-600">Choose your preferred delivery method</p>
                  </div>

                  <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-4">
                    <div className="relative rounded-2xl border-2 border-gray-200 p-6 transition-all hover:border-gray-300 data-[state=checked]:border-black data-[state=checked]:bg-gray-50">
                      <RadioGroupItem value="standard" id="standard" className="sr-only" />
                      <Label htmlFor="standard" className="cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="rounded-full bg-gray-100 p-2">
                              <Package className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">Standard Shipping</h3>
                              <p className="text-gray-600">Delivery in 5-7 business days</p>
                              <p className="mt-1 text-sm text-gray-500">
                                Perfect for non-urgent orders. Includes tracking and insurance.
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-900">{subtotal > 200 ? "Free" : "$25.00"}</p>
                            {subtotal > 200 && <p className="text-sm text-green-600">Free shipping applied</p>}
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="relative rounded-2xl border-2 border-gray-200 p-6 transition-all hover:border-gray-300 data-[state=checked]:border-black data-[state=checked]:bg-gray-50">
                      <RadioGroupItem value="express" id="express" className="sr-only" />
                      <Label htmlFor="express" className="cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="rounded-full bg-blue-100 p-2">
                              <Truck className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">Express Shipping</h3>
                              <p className="text-gray-600">Delivery in 2-3 business days</p>
                              <p className="mt-1 text-sm text-gray-500">
                                Faster delivery with priority handling and tracking.
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-900">$35.00</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-8">
                    <Button variant="ghost" onClick={prevStep} className="rounded-full">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Shipping
                    </Button>
                    <Button onClick={nextStep} className="rounded-full bg-black px-8 hover:bg-gray-800">
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div className="p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900">Payment Information</h2>
                    <p className="mt-1 text-gray-600">Choose your payment method</p>
                  </div>

                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                    <div className="relative rounded-2xl border-2 border-gray-200 p-6 transition-all hover:border-gray-300 data-[state=checked]:border-black data-[state=checked]:bg-gray-50">
                      <RadioGroupItem value="credit-card" id="credit-card" className="sr-only" />
                      <Label htmlFor="credit-card" className="cursor-pointer">
                        <div className="flex items-start space-x-4">
                          <div className="rounded-full bg-gray-100 p-2">
                            <CreditCard className="h-5 w-5 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900">Credit or Debit Card</h3>
                            <p className="text-gray-600">Visa, Mastercard, American Express</p>
                          </div>
                        </div>
                      </Label>

                      {paymentMethod === "credit-card" && (
                        <div className="mt-6 space-y-4 border-t border-gray-100 pt-6">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-900">
                              Card Number
                            </Label>
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              className={`rounded-xl border-gray-200 focus:border-black focus:ring-black ${
                                formErrors.cardNumber ? "border-red-500" : ""
                              }`}
                            />
                            {formErrors.cardNumber && <p className="text-sm text-red-600">{formErrors.cardNumber}</p>}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="cardExpiry" className="text-sm font-medium text-gray-900">
                                Expiry Date
                              </Label>
                              <Input
                                id="cardExpiry"
                                placeholder="MM/YY"
                                value={formData.cardExpiry}
                                onChange={handleInputChange}
                                className={`rounded-xl border-gray-200 focus:border-black focus:ring-black ${
                                  formErrors.cardExpiry ? "border-red-500" : ""
                                }`}
                              />
                              {formErrors.cardExpiry && <p className="text-sm text-red-600">{formErrors.cardExpiry}</p>}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cardCvc" className="text-sm font-medium text-gray-900">
                                CVC
                              </Label>
                              <Input
                                id="cardCvc"
                                placeholder="123"
                                value={formData.cardCvc}
                                onChange={handleInputChange}
                                className={`rounded-xl border-gray-200 focus:border-black focus:ring-black ${
                                  formErrors.cardCvc ? "border-red-500" : ""
                                }`}
                              />
                              {formErrors.cardCvc && <p className="text-sm text-red-600">{formErrors.cardCvc}</p>}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="nameOnCard" className="text-sm font-medium text-gray-900">
                              Name on Card
                            </Label>
                            <Input
                              id="nameOnCard"
                              placeholder="John Doe"
                              value={formData.nameOnCard}
                              onChange={handleInputChange}
                              className={`rounded-xl border-gray-200 focus:border-black focus:ring-black ${
                                formErrors.nameOnCard ? "border-red-500" : ""
                              }`}
                            />
                            {formErrors.nameOnCard && <p className="text-sm text-red-600">{formErrors.nameOnCard}</p>}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="relative rounded-2xl border-2 border-gray-200 p-6 transition-all hover:border-gray-300 data-[state=checked]:border-black data-[state=checked]:bg-gray-50">
                      <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
                      <Label htmlFor="paypal" className="cursor-pointer">
                        <div className="flex items-start space-x-4">
                          <div className="rounded-full bg-blue-100 p-2">
                            <div className="h-5 w-5 rounded bg-blue-600"></div>
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">PayPal</h3>
                            <p className="text-gray-600">You'll be redirected to PayPal to complete your purchase</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="mt-6 rounded-2xl bg-green-50 p-4">
                    <div className="flex items-center space-x-3">
                      <ShieldCheck className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-green-800">Your payment is secure</p>
                        <p className="text-sm text-green-700">
                          We use SSL encryption and never store your payment information
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-8">
                    <Button variant="ghost" onClick={prevStep} className="rounded-full">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Delivery
                    </Button>
                    <Button onClick={nextStep} className="rounded-full bg-black px-8 hover:bg-gray-800">
                      Review Order
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <div className="p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900">Review Your Order</h2>
                    <p className="mt-1 text-gray-600">Please review your order details before placing your order</p>
                  </div>

                  <div className="space-y-8">
                    {/* Shipping Address */}
                    <div className="rounded-2xl border border-gray-200 p-6">
                      <h3 className="mb-4 text-lg font-medium text-gray-900">Shipping Address</h3>
                      <div className="text-gray-700">
                        <p className="font-medium">
                          {formData.firstName} {formData.lastName}
                        </p>
                        <p>{formData.address}</p>
                        {formData.address2 && <p>{formData.address2}</p>}
                        <p>
                          {formData.city}, {formData.state} {formData.zip}
                        </p>
                        <p className="mt-2 text-sm text-gray-600">{formData.email}</p>
                        <p className="text-sm text-gray-600">{formData.phone}</p>
                      </div>
                    </div>

                    {/* Shipping Method */}
                    <div className="rounded-2xl border border-gray-200 p-6">
                      <h3 className="mb-4 text-lg font-medium text-gray-900">Delivery Method</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">
                            {shippingMethod === "standard" ? "Standard Shipping" : "Express Shipping"}
                          </p>
                          <p className="text-gray-600">
                            {shippingMethod === "standard" ? "5-7 business days" : "2-3 business days"}
                          </p>
                        </div>
                        <p className="font-medium text-gray-900">
                          {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                        </p>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="rounded-2xl border border-gray-200 p-6">
                      <h3 className="mb-4 text-lg font-medium text-gray-900">Payment Method</h3>
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {paymentMethod === "credit-card" ? "Credit Card" : "PayPal"}
                          </p>
                          {paymentMethod === "credit-card" && formData.cardNumber && (
                            <p className="text-gray-600">Ending in {formData.cardNumber.slice(-4)}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-8">
                    <Button variant="ghost" onClick={prevStep} className="rounded-full">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Payment
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={isSubmitting}
                      className="rounded-full bg-black px-8 hover:bg-gray-800 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          Place Order
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">Order Summary</h2>

              {/* Order Items */}
              <div className="mb-6 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex space-x-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.specs}</p>
                      <p className="mt-1 font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              {/* Pricing Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between text-xl font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 rounded-xl bg-gray-50 p-4">
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Secure Checkout</p>
                    <p className="text-xs text-gray-600">SSL encrypted and secure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
