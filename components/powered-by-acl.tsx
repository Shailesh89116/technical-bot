"use client"

import Image from "next/image"
import Link from "next/link"

export function PoweredByACL() {
  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3 text-gray-600">
            <span className="text-sm md:text-xl font-medium">Powered by</span>
            <Link
              href="https://acl.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-gray-800"
            >
              <div className="relative h-10 w-24">
                <Image src="/acl-logo.png" alt="ACL Logo" fill className="object-contain" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
