/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  X,
  ArrowLeft,
  ShieldCheck,
  Truck,
  Award,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CartItem } from "@/types/cart";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.currentPrice * item.quantity,
    0
  );
  const promoDiscount = appliedPromo === "SAVE10" ? subtotal * 0.1 : 0;
  const shipping = subtotal > 5000 ? 0 : 200;
  const taxRate = 0.18; // GST in India
  const tax = (subtotal - promoDiscount) * taxRate;
  const total = subtotal - promoDiscount + shipping + tax;

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

  const updateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, quantity: newQuantity }),
      });
      const data = await response.json();
      setCartItems(data.items);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const removeFromCart = async (id: string) => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      setCartItems(data.items);
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const applyPromoCode = () => {
    if (promoCode === "SAVE10") {
      setAppliedPromo("SAVE10");
    }
    setPromoCode("");
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      grand: "bg-purple-100 text-purple-800",
      prime: "bg-blue-100 text-blue-800",
      heatcut: "bg-orange-100 text-orange-800",
      nature: "bg-green-100 text-green-800",
      superior: "bg-indigo-100 text-indigo-800",
      shade: "bg-gray-100 text-gray-800",
      advertising: "bg-red-100 text-red-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <nav className="mb-4 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Shopping Cart</span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Your Cart
          </h1>
          <p className="mt-2 text-gray-600">
            Review your selected acrylic sheets before checkout
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                className="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Your cart is empty
            </h2>
            <p className="mb-8 text-gray-600 max-w-md mx-auto">
              Discover our premium acrylic sheets for your construction and
              design projects.
            </p>  
            <Button
              asChild
              className="rounded-full bg-black px-8 py-3 hover:bg-gray-800"
            >
              <Link href="/shop">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Cart Items
                    </h2>
                    <Badge variant="secondary" className="text-sm">
                      {cartItems.length}{" "}
                      {cartItems.length === 1 ? "item" : "items"}
                    </Badge>
                  </div>

                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0"
                      >
                        {/* Product Image */}
                        <div className="h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200">
                          <Image
                            src={
                              item.image ||
                              "/placeholder.svg?height=112&width=112&query=acrylic sheet"
                            }
                            alt={item.productName}
                            width={112}
                            height={112}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-1 flex-col">
                          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-start gap-2 mb-2">
                                <h3 className="text-base font-semibold text-gray-900">
                                  {item.productName}
                                </h3>
                                <Badge
                                  className={`text-xs ${getCategoryColor(
                                    item.category
                                  )}`}
                                >
                                  {item.category.charAt(0).toUpperCase() +
                                    item.category.slice(1)}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">
                                Code: {item.code}
                              </p>
                              <p className="text-sm text-gray-600 mb-2">
                                {item.specs}
                              </p>

                              <div className="flex flex-wrap gap-2 mb-3">
                                {item.attributes.map((attr) => (
                                  <Badge
                                    key={attr.id}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {attr.key}: {attr.value}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold text-gray-900">
                                ₹{item.currentPrice.toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-500">per sheet</p>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex h-10 items-center rounded-full border border-gray-300 bg-white">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="flex h-full w-10 items-center justify-center rounded-l-full hover:bg-gray-50 transition-colors"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="flex h-full min-w-[3rem] items-center justify-center text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="flex h-full w-10 items-center justify-center rounded-r-full hover:bg-gray-50 transition-colors"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="flex h-10 items-center rounded-full border border-gray-300 bg-white px-5 justify-center">
                              <p className="text-sm text-gray-600">
                                Selected Size : {item.selectedSize}
                              </p>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="flex items-center text-sm text-red-600 hover:text-red-700 transition-colors"
                            >
                              <X className="mr-1 h-4 w-4" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 p-6 sm:p-8 gap-4">
                  <Button
                    variant="outline"
                    asChild
                    className="rounded-full w-full sm:w-auto bg-transparent"
                  >
                    <Link href="/products">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Link>
                  </Button>
                  <div className="text-sm text-gray-600">
                    Subtotal:{" "}
                    <span className="font-semibold text-gray-900">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Promo Code
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="text"
                    placeholder="Enter promo code (try SAVE10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="rounded-full border-gray-300 flex-1"
                  />
                  <Button
                    onClick={applyPromoCode}
                    className="rounded-full bg-black px-6 hover:bg-gray-800 w-full sm:w-auto"
                  >
                    Apply
                  </Button>
                </div>
                {appliedPromo && (
                  <div className="mt-3 flex items-center text-sm text-green-600">
                    <Award className="mr-2 h-4 w-4" />
                    Promo code "{appliedPromo}" applied! You saved ₹
                    {promoDiscount.toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="mb-6 text-xl font-semibold text-gray-900">
                    Order Summary
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Subtotal (
                        {cartItems.reduce(
                          (sum, item) => sum + item.quantity,
                          0
                        )}{" "}
                        items)
                      </span>
                      <span className="font-medium text-gray-900">
                        ₹{subtotal.toLocaleString()}
                      </span>
                    </div>

                    {appliedPromo && (
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">
                          Discount ({appliedPromo})
                        </span>
                        <span className="font-medium text-green-600">
                          -₹{promoDiscount.toLocaleString()}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-gray-900">
                        {shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `₹${shipping.toLocaleString()}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        GST ({(taxRate * 100).toFixed(0)}%)
                      </span>
                      <span className="font-medium text-gray-900">
                        ₹{tax.toLocaleString()}
                      </span>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">
                        ₹{total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="mt-6 w-full rounded-full bg-black py-6 text-base hover:bg-gray-800"
                  >
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>

                  {shipping === 0 && (
                    <div className="mt-4 flex items-center text-sm text-green-600">
                      <Truck className="mr-2 h-4 w-4" />
                      Free shipping on orders over ₹5,000
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Secure Checkout
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Your payment information is protected with 256-bit SSL
                          encryption.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Fast Delivery
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Most orders ship within 2-3 business days across
                          India.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
