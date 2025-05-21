"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, CreditCard, ArrowRight, ShieldCheck, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { processOrder } from "@/lib/actions"

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

  // In a real app, this would come from a cart state or API
  const cartItems = [
    {
      id: 1,
      name: "Clear 5mm Acrylic Sheet",
      image: "/placeholder.svg?height=400&width=400",
      specs: "5mm thickness, 4'×8'",
      price: 89.99,
      quantity: 2,
    },
    {
      id: 5,
      name: "Frosted 3mm Acrylic Sheet",
      image: "/placeholder.svg?height=400&width=400",
      specs: "3mm thickness, 4'×8'",
      price: 69.99,
      quantity: 1,
    },
  ]

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = shippingMethod === "express" ? 35 : subtotal > 200 ? 0 : 25
  const tax = subtotal * 0.07 // 7% tax rate
  const total = subtotal + shipping + tax

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]: value,
    })

    // Clear error when field is updated
    if (formErrors[id]) {
      setFormErrors({
        ...formErrors,
        [id]: null,
      })
    }
  }

  const nextStep = () => {
    // Validate current step before proceeding
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
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const validateShippingInfo = () => {
    const errors = {}
    const requiredFields = ["firstName", "lastName", "email", "phone", "address", "city", "zip"]

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = "This field is required"
      }
    })

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      errors.phone = "Please enter a valid 10-digit phone number"
    }

    // ZIP code validation
    if (formData.zip && !/^\d{5}(-\d{4})?$/.test(formData.zip)) {
      errors.zip = "Please enter a valid ZIP code"
    }

    return errors
  }

  const validatePaymentInfo = () => {
    const errors = {}

    // Credit card validation
    if (!formData.cardNumber) {
      errors.cardNumber = "Card number is required"
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      errors.cardNumber = "Please enter a valid 16-digit card number"
    }

    // Expiry validation
    if (!formData.cardExpiry) {
      errors.cardExpiry = "Expiry date is required"
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry)) {
      errors.cardExpiry = "Please use MM/YY format"
    }

    // CVC validation
    if (!formData.cardCvc) {
      errors.cardCvc = "CVC is required"
    } else if (!/^\d{3,4}$/.test(formData.cardCvc)) {
      errors.cardCvc = "Please enter a valid CVC"
    }

    // Name validation
    if (!formData.nameOnCard) {
      errors.nameOnCard = "Name on card is required"
    }

    return errors
  }

  const handlePlaceOrder = async () => {
    try {
      setIsSubmitting(true)

      // Create order object
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
          // In a real app, you would NOT send full card details to the server
          // Instead, you would use a payment processor token
          lastFour: paymentMethod === "credit-card" ? formData.cardNumber.slice(-4) : null,
        },
        items: cartItems,
        subtotal,
        tax,
        total,
        date: new Date().toISOString(),
      }

      // Process the order (in a real app, this would be a server action)
      const result = await processOrder(order)

      // Store order in session storage for confirmation page
      sessionStorage.setItem("lastOrder", JSON.stringify(order))

      // Redirect to confirmation page
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
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <div className="mt-4 flex items-center">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {step > 1 ? <CheckCircle2 className="h-5 w-5" /> : "1"}
          </div>
          <div className={`h-1 w-16 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {step > 2 ? <CheckCircle2 className="h-5 w-5" /> : "2"}
          </div>
          <div className={`h-1 w-16 ${step >= 3 ? "bg-primary" : "bg-muted"}`} />
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {step > 3 ? <CheckCircle2 className="h-5 w-5" /> : "3"}
          </div>
          <div className={`h-1 w-16 ${step >= 4 ? "bg-primary" : "bg-muted"}`} />
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              step >= 4 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            4
          </div>
        </div>
        <div className="mt-2 flex w-full justify-between text-sm">
          <span className={step >= 1 ? "text-primary font-medium" : "text-muted-foreground"}>Shipping</span>
          <span className={step >= 2 ? "text-primary font-medium" : "text-muted-foreground"}>Delivery</span>
          <span className={step >= 3 ? "text-primary font-medium" : "text-muted-foreground"}>Payment</span>
          <span className={step >= 4 ? "text-primary font-medium" : "text-muted-foreground"}>Review</span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="rounded-lg border">
              <div className="p-6">
                <h2 className="mb-6 text-xl font-medium">Shipping Address</h2>
                <div className="grid gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName" className="flex">
                        First Name <span className="text-destructive ml-1">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={formErrors.firstName ? "border-destructive" : ""}
                      />
                      {formErrors.firstName && <p className="text-destructive text-sm">{formErrors.firstName}</p>}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName" className="flex">
                        Last Name <span className="text-destructive ml-1">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={formErrors.lastName ? "border-destructive" : ""}
                      />
                      {formErrors.lastName && <p className="text-destructive text-sm">{formErrors.lastName}</p>}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="flex">
                      Email <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={formErrors.email ? "border-destructive" : ""}
                    />
                    {formErrors.email && <p className="text-destructive text-sm">{formErrors.email}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone" className="flex">
                      Phone <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={formErrors.phone ? "border-destructive" : ""}
                    />
                    {formErrors.phone && <p className="text-destructive text-sm">{formErrors.phone}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address" className="flex">
                      Address <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Input
                      id="address"
                      placeholder="123 Main St"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={formErrors.address ? "border-destructive" : ""}
                    />
                    {formErrors.address && <p className="text-destructive text-sm">{formErrors.address}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address2">Address Line 2 (Optional)</Label>
                    <Input
                      id="address2"
                      placeholder="Apartment, suite, etc."
                      value={formData.address2}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="city" className="flex">
                        City <span className="text-destructive ml-1">*</span>
                      </Label>
                      <Input
                        id="city"
                        placeholder="New York"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={formErrors.city ? "border-destructive" : ""}
                      />
                      {formErrors.city && <p className="text-destructive text-sm">{formErrors.city}</p>}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="state" className="flex">
                        State <span className="text-destructive ml-1">*</span>
                      </Label>
                      <Select
                        value={formData.state}
                        onValueChange={(value) => setFormData({ ...formData, state: value })}
                      >
                        <SelectTrigger id="state">
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
                    <div className="grid gap-2">
                      <Label htmlFor="zip" className="flex">
                        ZIP Code <span className="text-destructive ml-1">*</span>
                      </Label>
                      <Input
                        id="zip"
                        placeholder="10001"
                        value={formData.zip}
                        onChange={handleInputChange}
                        className={formErrors.zip ? "border-destructive" : ""}
                      />
                      {formErrors.zip && <p className="text-destructive text-sm">{formErrors.zip}</p>}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="country" className="flex">
                      Country <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) => setFormData({ ...formData, country: value })}
                    >
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="MX">Mexico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Order Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Special instructions for delivery"
                      value={formData.notes}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between p-6">
                <Button variant="outline" asChild>
                  <Link href="/cart">
                    <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                    Back to Cart
                  </Link>
                </Button>
                <Button onClick={nextStep}>Continue to Delivery</Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="rounded-lg border">
              <div className="p-6">
                <h2 className="mb-6 text-xl font-medium">Shipping Method</h2>
                <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-4">
                  <div className="flex items-start space-x-3 rounded-lg border p-4">
                    <RadioGroupItem value="standard" id="standard" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="standard" className="text-base font-medium">
                        Standard Shipping
                      </Label>
                      <p className="text-sm text-muted-foreground">Delivery in 5-7 business days</p>
                      <p className="mt-1 font-medium">{subtotal > 200 ? "Free" : "$25.00"}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 rounded-lg border p-4">
                    <RadioGroupItem value="express" id="express" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="express" className="text-base font-medium">
                        Express Shipping
                      </Label>
                      <p className="text-sm text-muted-foreground">Delivery in 2-3 business days</p>
                      <p className="mt-1 font-medium">$35.00</p>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              <Separator />
              <div className="flex justify-between p-6">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                  Back to Shipping
                </Button>
                <Button onClick={nextStep}>Continue to Payment</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="rounded-lg border">
              <div className="p-6">
                <h2 className="mb-6 text-xl font-medium">Payment Method</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="flex items-start space-x-3 rounded-lg border p-4">
                    <RadioGroupItem value="credit-card" id="credit-card" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="credit-card" className="text-base font-medium">
                        Credit Card
                      </Label>
                      <p className="text-sm text-muted-foreground">Pay with Visa, Mastercard, or American Express</p>
                      {paymentMethod === "credit-card" && (
                        <div className="mt-4 grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="cardNumber" className="flex">
                              Card Number <span className="text-destructive ml-1">*</span>
                            </Label>
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              className={formErrors.cardNumber ? "border-destructive" : ""}
                            />
                            {formErrors.cardNumber && (
                              <p className="text-destructive text-sm">{formErrors.cardNumber}</p>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="cardExpiry" className="flex">
                                Expiry Date <span className="text-destructive ml-1">*</span>
                              </Label>
                              <Input
                                id="cardExpiry"
                                placeholder="MM/YY"
                                value={formData.cardExpiry}
                                onChange={handleInputChange}
                                className={formErrors.cardExpiry ? "border-destructive" : ""}
                              />
                              {formErrors.cardExpiry && (
                                <p className="text-destructive text-sm">{formErrors.cardExpiry}</p>
                              )}
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="cardCvc" className="flex">
                                CVC <span className="text-destructive ml-1">*</span>
                              </Label>
                              <Input
                                id="cardCvc"
                                placeholder="123"
                                value={formData.cardCvc}
                                onChange={handleInputChange}
                                className={formErrors.cardCvc ? "border-destructive" : ""}
                              />
                              {formErrors.cardCvc && <p className="text-destructive text-sm">{formErrors.cardCvc}</p>}
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="nameOnCard" className="flex">
                              Name on Card <span className="text-destructive ml-1">*</span>
                            </Label>
                            <Input
                              id="nameOnCard"
                              placeholder="John Doe"
                              value={formData.nameOnCard}
                              onChange={handleInputChange}
                              className={formErrors.nameOnCard ? "border-destructive" : ""}
                            />
                            {formErrors.nameOnCard && (
                              <p className="text-destructive text-sm">{formErrors.nameOnCard}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 rounded-lg border p-4">
                    <RadioGroupItem value="paypal" id="paypal" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="paypal" className="text-base font-medium">
                        PayPal
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        You will be redirected to PayPal to complete your purchase
                      </p>
                    </div>
                  </div>
                </RadioGroup>
                <div className="mt-6 flex items-center gap-2 rounded-lg bg-muted/50 p-4">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <p className="text-sm">
                    Your payment information is secure. We use SSL encryption to protect your data.
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between p-6">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                  Back to Delivery
                </Button>
                <Button onClick={nextStep}>Review Order</Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="rounded-lg border">
              <div className="p-6">
                <h2 className="mb-6 text-xl font-medium">Review Your Order</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 font-medium">Shipping Address</h3>
                    <div className="rounded-lg border p-4">
                      <p>
                        {formData.firstName} {formData.lastName}
                      </p>
                      <p>{formData.address}</p>
                      {formData.address2 && <p>{formData.address2}</p>}
                      <p>
                        {formData.city}, {formData.state} {formData.zip}
                      </p>
                      <p>
                        {formData.country === "US" ? "United States" : formData.country === "CA" ? "Canada" : "Mexico"}
                      </p>
                      <p>{formData.email}</p>
                      <p>{formData.phone}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 font-medium">Shipping Method</h3>
                    <div className="rounded-lg border p-4">
                      <p>
                        {shippingMethod === "standard"
                          ? "Standard Shipping (5-7 business days)"
                          : "Express Shipping (2-3 business days)"}
                      </p>
                      <p className="font-medium">
                        {shippingMethod === "express" ? "$35.00" : subtotal > 200 ? "Free" : "$25.00"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 font-medium">Payment Method</h3>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        <p>{paymentMethod === "credit-card" ? "Credit Card" : "PayPal"}</p>
                      </div>
                      {paymentMethod === "credit-card" && formData.cardNumber && (
                        <p className="mt-1 text-sm text-muted-foreground">Ending in {formData.cardNumber.slice(-4)}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 font-medium">Order Items</h3>
                    <div className="rounded-lg border">
                      {cartItems.map((item, index) => (
                        <div key={item.id} className={`p-4 ${index !== cartItems.length - 1 ? "border-b" : ""}`}>
                          <div className="flex gap-4">
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={64}
                                height={64}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex flex-1 flex-col">
                              <div className="flex justify-between">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                              <p className="text-sm text-muted-foreground">{item.specs}</p>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between p-6">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                  Back to Payment
                </Button>
                <Button onClick={handlePlaceOrder} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>

        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-medium">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (7%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Order Items ({cartItems.length})</h3>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
