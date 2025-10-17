/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { CartItem } from '@/types/cart'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
})


export async function GET(request: NextRequest) {
  const sessionId = request.cookies.get('sessionId')?.value
  if (!sessionId) {
    return NextResponse.json({ items: [] })
  }

  const cartItems = await redis.get<CartItem[]>(`cart:${sessionId}`)

  
  return NextResponse.json({ items: cartItems || [] })
}

export async function POST(request: NextRequest) {
  const { item, action } = await request.json()
  const sessionId = request.cookies.get('sessionId')?.value || crypto.randomUUID()

  const cartItems = await redis.get<CartItem[]>(`cart:${sessionId}`) || []
  
  if (!Array.isArray(cartItems)) {
    console.error('Unexpected cart items format:', cartItems)
    return NextResponse.json({ success: false, message: 'Invalid cart data' }, { status: 500 })
  }

  const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.productId === item.productId && cartItem.selectedSize === item.selectedSize)

  if (existingItemIndex > -1) {
    if (action === 'add') {
      // Update the existing item's quantity
      cartItems[existingItemIndex].quantity += item.quantity
    } else if (action === 'addAndCheckout') {
      // Replace the existing item
      cartItems[existingItemIndex] = item
    }
    // Update total prices
  } else {
    // Add the new item
    cartItems.push(item)
  }

  await redis.set(`cart:${sessionId}`, JSON.stringify(cartItems), { ex: 3600 }) // 1 hour expiration

  const response = NextResponse.json({ success: true, items: cartItems })
  response.cookies.set('sessionId', sessionId, { httpOnly: true, maxAge: 3600 })
  return response
}
export async function DELETE(request: NextRequest) {
  const sessionId = request.cookies.get('sessionId')?.value

  if (!sessionId) {
    return NextResponse.json({ success: false, message: 'No session found' }, { status: 401 })
  }

  // Check if the request has a body
  const hasBody = parseInt(request.headers.get('content-length') || '0') > 0

  try {
    if (hasBody) {
      // Remove specific item
      const { id } = await request.json()
      
      if (!id) {
        return NextResponse.json({ success: false, message: 'Item ID is required' }, { status: 400 })
      }

      let cartItems = await redis.get<CartItem[]>(`cart:${sessionId}`) || []
      
      if (!Array.isArray(cartItems)) {
        console.error('Unexpected cart items format:', cartItems)
        return NextResponse.json({ success: false, message: 'Invalid cart data' }, { status: 500 })
      }
      
      cartItems = cartItems.filter((item) => item.id !== id)
      await redis.set(`cart:${sessionId}`, JSON.stringify(cartItems), { ex: 3600 })
      return NextResponse.json({ success: true, items: cartItems })
    } else {
      // Clear entire cart
      await redis.del(`cart:${sessionId}`)
      return NextResponse.json({ success: true, items: [] })
    }
  } catch (error) {
    console.error('Error processing DELETE request:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}


export async function PUT(request: NextRequest) {
  const sessionId = request.cookies.get('sessionId')?.value

  if (!sessionId) {
    return NextResponse.json({ success: false, message: 'No session found' })
  }

  const { id, quantity } = await request.json()

  if (!id || typeof quantity !== 'number' || quantity < 1) {
    return NextResponse.json({ success: false, message: 'Invalid input' }, { status: 400 })
  }

  const cartItems = await redis.get<CartItem[]>(`cart:${sessionId}`) || []

  if (!Array.isArray(cartItems)) {
    console.error('Unexpected cart items format:', cartItems)
    return NextResponse.json({ success: false, message: 'Invalid cart data' }, { status: 500 })
  }

  const itemIndex = cartItems.findIndex((item) => item.id === id)

  if (itemIndex === -1) {
    return NextResponse.json({ success: false, message: 'Item not found in cart' }, { status: 404 })
  }

  cartItems[itemIndex].quantity = quantity

  await redis.set(`cart:${sessionId}`, JSON.stringify(cartItems), { ex: 3600 }) // 1 hour expiration

  return NextResponse.json({ success: true, items: cartItems })
}

