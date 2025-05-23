"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Search, ShoppingBag, X, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function Navigation() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // Check if current page is homepage
  const isHomePage = pathname === "/"

  // Determine initial header style based on page
  const [isDarkHeader, setIsDarkHeader] = useState(isHomePage)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10
      setIsScrolled(scrolled)

      // When scrolled, always use dark header
      if (scrolled) {
        setIsDarkHeader(true)
      } else {
        // Reset to initial state based on page
        setIsDarkHeader(isHomePage)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHomePage])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [menuOpen])

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen)
  }

  const handleMenuClose = () => {
    setMenuOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md"
            : isHomePage
              ? "bg-transparent"
              : "bg-white border-b border-gray-200"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className={`text-xl font-medium ${isDarkHeader ? "text-white" : "text-gray-900"}`}>
              Nature Light®
            </Link>

            {/* Desktop Navigation with Shop Dropdown */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`${
                      isDarkHeader
                        ? "bg-transparent text-white/80 hover:text-white hover:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white"
                        : "bg-transparent text-gray-700 hover:text-gray-900 hover:bg-gray-100 data-[state=open]:bg-gray-100 data-[state=open]:text-gray-900"
                    }`}
                  >
                    Shop
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            href="/shop/acrylic-sheets"
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-gray-900 to-black p-6 no-underline outline-none focus:shadow-md"
                          >
                            <div className="mt-4 mb-2 text-lg font-medium text-white">Acrylic Sheets</div>
                            <p className="text-sm leading-tight text-white/90">
                              High-clarity acrylic with 92% light transmission, UV-stabilized for outdoor use
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <Link
                          href="/shop/acrylic-sheets?thickness=2mm"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Thin Sheets (2mm)</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Perfect for crafts and small displays
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/shop/acrylic-sheets?thickness=5mm"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Medium Sheets (5mm)</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Ideal for signage and displays
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/shop/acrylic-sheets?thickness=10mm"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Thick Sheets (10mm)</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            For heavy-duty applications and furniture
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/products" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} ${
                        isDarkHeader
                          ? "bg-transparent text-white/80 hover:text-white hover:bg-white/10"
                          : "bg-transparent text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      Products
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} ${
                        isDarkHeader
                          ? "bg-transparent text-white/80 hover:text-white hover:bg-white/10"
                          : "bg-transparent text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/support" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} ${
                        isDarkHeader
                          ? "bg-transparent text-white/80 hover:text-white hover:bg-white/10"
                          : "bg-transparent text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      Support
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-4">
            {isSearchOpen ? (
              <div className="absolute inset-0 flex h-16 items-center justify-center bg-black/80 backdrop-blur-md px-4">
                <div className="flex w-full max-w-md items-center gap-2">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="h-9 rounded-full border-white/20 bg-white/10 text-white placeholder:text-white/50"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(false)}
                    aria-label="Close search"
                    className="text-white"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Search"
                  className={isDarkHeader ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"}
                >
                  <Search className="h-5 w-5" />
                </Button>
                <Link href="/account">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Account"
                    className={isDarkHeader ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"}
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/cart">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Cart"
                    className={`relative ${isDarkHeader ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"}`}
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span
                      className={`absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-medium ${
                        isDarkHeader ? "bg-white text-black" : "bg-black text-white"
                      }`}
                    >
                      0
                    </span>
                  </Button>
                </Link>

                {/* Mobile Menu Button */}
                <Button variant="ghost" className="md:hidden" onClick={handleMenuToggle}>
                  <span className={isDarkHeader ? "text-white" : "text-gray-700"}>Menu</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Full Screen Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link href="/" className="text-xl font-medium text-white" onClick={handleMenuClose}>
              Nature Light®
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMenuClose}
              aria-label="Close menu"
              className="text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-8 p-8">
            <Link
              href="/shop"
              className="text-2xl font-medium text-white hover:text-gray-300 transition-colors"
              onClick={handleMenuClose}
            >
              Shop
            </Link>
            <Link
              href="/products"
              className="text-2xl font-medium text-white hover:text-gray-300 transition-colors"
              onClick={handleMenuClose}
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-2xl font-medium text-white hover:text-gray-300 transition-colors"
              onClick={handleMenuClose}
            >
              About
            </Link>
            <Link
              href="/support"
              className="text-2xl font-medium text-white hover:text-gray-300 transition-colors"
              onClick={handleMenuClose}
            >
              Support
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
