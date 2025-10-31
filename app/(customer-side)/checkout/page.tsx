/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, ArrowLeft, ShieldCheck, Loader2, Lock, Package } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { CartItem } from "@/types/cart"

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string | null>>({})

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    address2: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
    country: "India",
    notes: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    nameOnCard: "",
    upiId: "",
    gstNumber: "",
  })

    useEffect(() => {
      fetchCart();
    }, []);
  
    const fetchCart = async () => {
      // setIsLoading(true);
      try {
        const response = await fetch("/api/cart");
        const data = await response.json();
        setCartItems(data.items);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      } finally {
        // setIsLoading(false);
      }
    };

  const subtotal = cartItems.reduce((total, item) => total + item.currentPrice * item.quantity, 0)
  const gst = subtotal * 0.18 // 18% GST
  const total = subtotal + gst

  const steps = [
    { number: 1, title: "Shipping", icon: Package },
    { number: 2, title: "Review", icon: CheckCircle2 },
  ]

  const handleInputChange = (e: any) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
    if (formErrors[id]) {
      setFormErrors({ ...formErrors, [id]: null })
    }
  }

    const validateShippingInfo = () => {
    const errors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required"
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required"
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ""))) {
      errors.phone = "Please enter a valid 10-digit Indian mobile number"
    }

    if (!formData.address.trim()) {
      errors.address = "Address is required"
    }

    if (!formData.city.trim()) {
      errors.city = "City is required"
    }

    if (!formData.pincode.trim()) {
      errors.pincode = "PIN code is required"
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      errors.pincode = "Please enter a valid 6-digit PIN code"
    }

    return errors
  }

  const nextStep = () => {
    if (step === 1) {
      const errors = validateShippingInfo()
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors)
        return
      }
    // } else if (step === 3 && paymentMethod === "credit-card") {
    //   const errors = validatePaymentInfo()
    //   if (Object.keys(errors).length > 0) {
    //     setFormErrors(errors)
    //     return
    //   }
    }
    setStep(step + 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }



  // const validatePaymentInfo = () => {
  //   const errors: Record<string, string> = {}

  //   if (paymentMethod === "credit-card") {
  //     if (!formData.cardNumber) {
  //       errors.cardNumber = "Card number is required"
  //     } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
  //       errors.cardNumber = "Please enter a valid 16-digit card number"
  //     }

  //     if (!formData.cardExpiry) {
  //       errors.cardExpiry = "Expiry date is required"
  //     } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry)) {
  //       errors.cardExpiry = "Please use MM/YY format"
  //     }

  //     if (!formData.cardCvc) {
  //       errors.cardCvc = "CVC is required"
  //     } else if (!/^\d{3,4}$/.test(formData.cardCvc)) {
  //       errors.cardCvc = "Please enter a valid CVC"
  //     }

  //     if (!formData.nameOnCard) {
  //       errors.nameOnCard = "Name on card is required"
  //     }
  //   } else if (paymentMethod === "upi") {
  //     if (!formData.upiId) {
  //       errors.upiId = "UPI ID is required"
  //     } else if (!/^[\w.-]+@[\w.-]+$/.test(formData.upiId)) {
  //       errors.upiId = "Please enter a valid UPI ID"
  //     }
  //   }

  //   return errors
  // }

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
          pincode: formData.pincode,
          country: formData.country,
          // method: shippingMethod,
          // cost: shipping,
        },
        items: cartItems,
        subtotal,
        gst,
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
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">Checkout</h1>
          <p className="mt-2 text-base text-gray-600 sm:text-lg">Complete your order in just a few steps</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center justify-between">
              {steps.map((stepItem, index) => (
                <div key={stepItem.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 sm:h-12 sm:w-12 ${
                        step >= stepItem.number
                          ? "border-black bg-black text-white"
                          : "border-gray-300 bg-white text-gray-400"
                      }`}
                    >
                      {step > stepItem.number ? (
                        <CheckCircle2 className="h-4 w-4 sm:h-6 sm:w-6" />
                      ) : (
                        <stepItem.icon className="h-4 w-4 sm:h-6 sm:w-6" />
                      )}
                    </div>
                    <span
                      className={`mt-2 text-xs font-medium sm:text-sm ${step >= stepItem.number ? "text-black" : "text-gray-400"}`}
                    >
                      {stepItem.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`mx-2 h-0.5 w-8 transition-all duration-300 sm:mx-4 sm:w-16 lg:w-24 ${
                        step > stepItem.number ? "bg-black" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 sm:rounded-3xl">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <div className="p-6 sm:p-8">
                  <div className="mb-6 sm:mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Shipping Information</h2>
                    <p className="mt-1 text-gray-600">Where should we send your order?</p>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-medium text-gray-900">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          placeholder="Enter first name"
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
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          placeholder="Enter last name"
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
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email address"
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
                        Mobile Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter mobile number"
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
                        Street Address *
                      </Label>
                      <Input
                        id="address"
                        placeholder="Address line 1"
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
                        Landmark / Area (Optional)
                      </Label>
                      <Input
                        id="address2"
                        placeholder="Address line 2"
                        value={formData.address2}
                        onChange={handleInputChange}
                        className="rounded-xl border-gray-200 focus:border-black focus:ring-black"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm font-medium text-gray-900">
                          City *
                        </Label>
                        <Input
                          id="city"
                          placeholder="Enter city"
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
                          State *
                        </Label>
                        <Select
                          value={formData.state}
                          onValueChange={(value) => setFormData({ ...formData, state: value })}
                        >
                          <SelectTrigger className="rounded-xl border-gray-200 focus:border-black focus:ring-black w-full">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                            <SelectItem value="Delhi">Delhi</SelectItem>
                            <SelectItem value="Karnataka">Karnataka</SelectItem>
                            <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                            <SelectItem value="Gujarat">Gujarat</SelectItem>
                            <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                            <SelectItem value="West Bengal">West Bengal</SelectItem>
                            <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                            <SelectItem value="Haryana">Haryana</SelectItem>
                            <SelectItem value="Punjab">Punjab</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode" className="text-sm font-medium text-gray-900">
                          PIN Code *
                        </Label>
                        <Input
                          id="pincode"
                          placeholder="400001"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className={`rounded-xl border-gray-200 focus:border-black focus:ring-black ${
                            formErrors.pincode ? "border-red-500" : ""
                          }`}
                        />
                        {formErrors.pincode && <p className="text-sm text-red-600">{formErrors.pincode}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gstNumber" className="text-sm font-medium text-gray-900">
                        GST Number (Optional)
                      </Label>
                      <Input
                        id="gstNumber"
                        placeholder="22AAAAA0000A1Z5"
                        value={formData.gstNumber}
                        onChange={handleInputChange}
                        className="rounded-xl border-gray-200 focus:border-black focus:ring-black"
                      />
                      <p className="text-xs text-gray-500">For business purchases and GST invoice</p>
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

                  <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-6 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-8">
                    <Button variant="ghost" asChild className="rounded-full">
                      <Link href="/cart">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Cart
                      </Link>
                    </Button>
                    <Button onClick={nextStep} className="rounded-full bg-black px-6 hover:bg-gray-800 sm:px-8">
                      Continue to Review
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Delivery */}


              {/* Step 4: Review - keeping existing code with currency updates */}
              {step === 2 && (
                <div className="p-6 sm:p-8">
                  <div className="mb-6 sm:mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Review Your Order</h2>
                    <p className="mt-1 text-gray-600">Please review your order details before placing your order</p>
                  </div>

                  <div className="space-y-6 sm:space-y-8">
                    {/* Shipping Address */}
                    <div className="rounded-2xl border border-gray-200 p-4 sm:p-6">
                      <h3 className="mb-4 text-base font-medium text-gray-900 sm:text-lg">Shipping Address</h3>
                      <div className="text-gray-700">
                        <p className="font-medium">
                          {formData.firstName} {formData.lastName}
                        </p>
                        <p>{formData.address}</p>
                        {formData.address2 && <p>{formData.address2}</p>}
                        <p>
                          {formData.city}, {formData.state} {formData.pincode}
                        </p>
                        <p className="mt-2 text-sm text-gray-600">{formData.email}</p>
                        <p className="text-sm text-gray-600">+91 {formData.phone}</p>
                        {formData.gstNumber && <p className="text-sm text-gray-600">GST: {formData.gstNumber}</p>}
                      </div>
                    </div>

                    {/* Shipping Method */}
                    {/* <div className="rounded-2xl border border-gray-200 p-4 sm:p-6">
                      <h3 className="mb-4 text-base font-medium text-gray-900 sm:text-lg">Delivery Method</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">
                            {shippingMethod === "standard" ? "Standard Delivery" : "Express Delivery"}
                          </p>
                          <p className="text-gray-600">
                            {shippingMethod === "standard" ? "5-7 business days" : "2-3 business days"}
                          </p>
                        </div>
                        <p className="font-medium text-gray-900">{shipping === 0 ? "Free" : `₹${shipping}`}</p>
                      </div>
                    </div> */}

                    {/* Payment Method */}
                    {/* <div className="rounded-2xl border border-gray-200 p-4 sm:p-6">
                      <h3 className="mb-4 text-base font-medium text-gray-900 sm:text-lg">Payment Method</h3>
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {paymentMethod === "credit-card"
                              ? "Credit/Debit Card"
                              : paymentMethod === "upi"
                                ? "UPI Payment"
                                : paymentMethod === "netbanking"
                                  ? "Net Banking"
                                  : "Cash on Delivery"}
                          </p>
                          {paymentMethod === "credit-card" && formData.cardNumber && (
                            <p className="text-gray-600">Ending in {formData.cardNumber.slice(-4)}</p>
                          )}
                          {paymentMethod === "upi" && formData.upiId && (
                            <p className="text-gray-600">{formData.upiId}</p>
                          )}
                        </div>
                      </div>
                    </div> */}
                  </div>

                  <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-6 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-8">
                    <Button variant="ghost" onClick={prevStep} className="rounded-full">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Shipping Address
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={isSubmitting}
                      className="rounded-full bg-black px-6 hover:bg-gray-800 disabled:opacity-50 sm:px-8"
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
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:rounded-3xl sm:p-8">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 sm:mb-6 sm:text-xl">Order Summary</h2>

              {/* Order Items */}
              <div className="mb-4 space-y-4 sm:mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex space-x-3 sm:space-x-4">
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-16 sm:w-16">
                      <Image src={item.image || "/placeholder.svg"} alt={item.productName} fill className="object-cover" />
                      <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white sm:-right-2 sm:-top-2 sm:h-6 sm:w-6">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 sm:text-base">{item.productName}</h3>
                      <p className="text-xs text-gray-600 sm:text-sm">{item.specs}</p>
                      <p className="mt-1 text-sm font-medium text-gray-900 sm:text-base">
                        ₹{(item.currentPrice * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4 sm:my-6" />

              {/* Pricing Breakdown */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between text-sm text-gray-700 sm:text-base">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                {/* <div className="flex justify-between text-sm text-gray-700 sm:text-base">
                  <span>Delivery</span>
                  <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div> */}
                <div className="flex justify-between text-sm text-gray-700 sm:text-base">
                  <span>GST (18%)</span>
                  <span>₹{gst.toLocaleString()}</span>
                </div>
                {/* {paymentMethod === "cod" && (
                  <div className="flex justify-between text-sm text-gray-700 sm:text-base">
                    <span>COD Charges</span>
                    <span>₹50</span>
                  </div>
                )} */}
                <Separator className="my-3 sm:my-4" />
                <div className="flex justify-between text-lg font-semibold text-gray-900 sm:text-xl">
                  <span>Total</span>
                  <span>₹{(total).toLocaleString()}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-4 rounded-xl bg-gray-50 p-3 sm:mt-6 sm:p-4">
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="h-4 w-4 text-green-600 sm:h-5 sm:w-5" />
                  <div>
                    <p className="text-xs font-medium text-gray-900 sm:text-sm">Secure Checkout</p>
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
