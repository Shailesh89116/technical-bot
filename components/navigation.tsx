"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, X, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCart } from "@/context/cart-context";

export function Navigation() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const { items, isLoading } = useCart();
  const itemCount = items.length;

  // Check if current page is homepage
  const isHomePage = pathname === "/";

  // Determine initial header style based on page
  const [isDarkHeader, setIsDarkHeader] = useState(isHomePage);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);

      // When scrolled, always use dark header
      if (scrolled) {
        setIsDarkHeader(true);
      } else {
        // Reset to initial state based on page
        setIsDarkHeader(isHomePage);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

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
            <Link
              href="/"
              className={`text-xl font-medium ${
                isDarkHeader ? "text-white" : "text-gray-900"
              }`}
            >
              <Image
                src="/shinkolite-logo.png"
                alt="Shinkolite"
                height={100}
                width={200}
                className="h-20 w-auto"
              />
            </Link>

            {/* Desktop Navigation with Shop Dropdown */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
              <NavigationMenuItem>
                  <Link href="/shop" passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} ${
                        isDarkHeader
                          ? "bg-transparent text-white/80 hover:text-white hover:bg-white/10"
                          : "bg-transparent text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      Shop
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/contact" passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} ${
                        isDarkHeader
                          ? "bg-transparent text-white/80 hover:text-white hover:bg-white/10"
                          : "bg-transparent text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      Contact
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
                <Link href="/account">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Account"
                        className={
                          isDarkHeader
                            ? "text-white hover:bg-white/10"
                            : "text-gray-700 hover:bg-gray-100"
                        }
                      >
                        <User className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>User Account</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
                <Link href="/cart">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Cart"
                        className={`relative ${
                          isDarkHeader
                            ? "text-white hover:bg-white/10"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <ShoppingBag className="h-5 w-5" />
                        <span
                          className={`absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-medium ${
                            isDarkHeader
                              ? "bg-white text-black"
                              : "bg-black text-white"
                          }`}
                        >
                          {!isLoading && itemCount > 0 ? <p>{itemCount}</p> : 0}
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Cart</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>

                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  className="md:hidden"
                  onClick={handleMenuToggle}
                >
                  <span
                    className={isDarkHeader ? "text-white" : "text-gray-700"}
                  >
                    Menu
                  </span>
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
            <Link href="/">
              <Image
                src="/shinkolite-logo.png"
                alt="Shinkolite"
                height={100}
                width={200}
                className="h-20 w-auto"
              />
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
              href="/contact"
              className="text-2xl font-medium text-white hover:text-gray-300 transition-colors"
              onClick={handleMenuClose}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
