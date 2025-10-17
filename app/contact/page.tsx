/* eslint-disable react/no-unescaped-entities */
import Image from "next/image"
import { Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden bg-black py-16 text-center text-white md:py-32">
        <div className="absolute inset-0 z-0">
          <Image src="/modern-office-exterior.png" alt="Contact Us" fill className="object-cover opacity-60" priority />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="mb-6 flex justify-center">
            <Image
              src="/logo.png"
              alt="NatureLight Logo"
              width={200}
              height={80}
              className="h-16 w-auto md:h-20"
            />
          </div>
          <h1 className="mb-4 text-3xl font-medium tracking-tight md:text-5xl lg:text-6xl">Contact Us</h1>
          <p className="mx-auto mb-8 max-w-2xl text-base font-light text-gray-300 md:text-xl">
            We're here to help with your acrylic sheet needs
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-white py-16 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="mb-6 text-2xl font-medium tracking-tight md:text-4xl">Get in Touch</h2>
              <p className="mb-8 text-sm text-gray-600 md:text-base">
                Have questions about our products or need a custom solution? Our team is ready to assist you.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="rounded-full bg-gray-100 p-2 md:p-3">
                    <Phone className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-base font-medium md:text-lg">Phone</h3>
                    <p className="text-sm text-gray-600 md:text-base">+91 9594084630</p>
                    <p className="text-sm text-gray-600 md:text-base">+91 9594084626</p>
                    <p className="text-xs text-gray-600 md:text-sm">Monday - Saturday, 9:30am - 6pm IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="rounded-full bg-gray-100 p-2 md:p-3">
                    <Mail className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-base font-medium md:text-lg">Email</h3>
                    <p className="text-sm text-gray-600 md:text-base">shinkolite@aclindia.co</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="rounded-full bg-gray-100 p-2 md:p-3">
                    <MapPin className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-base font-medium md:text-lg">Showroom Address</h3>
                    <p className="text-sm text-gray-600 md:text-base">A/16, Patel Shopping Centre, Off Chandavarkar Road,</p>
                    <p className="text-sm text-gray-600 md:text-base"> Borivali West, Mumbai 400092</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
              <h3 className="mb-4 text-lg font-medium md:mb-6 md:text-xl">Send us a Message</h3>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" className="text-sm md:text-base" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Your email" className="text-sm md:text-base" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone
                  </label>
                  <Input id="phone" placeholder="Your phone number" className="text-sm md:text-base" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="How can we help you?" className="text-sm md:text-base" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Your message" rows={5} className="text-sm md:text-base" />
                </div>
                <Button className="w-full rounded-full text-sm md:text-base bg-[#1f504b]">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-gray-50 py-16 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-6 text-center text-2xl font-medium tracking-tight md:mb-8 md:text-4xl">
            Visit Our Location
          </h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="aspect-video w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d332.1316932081753!2d72.85473803807542!3d19.231259856911866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b19de5301b57%3A0xb01d197c732fceba!2sAmbica%20Foundation!5e1!3m2!1sen!2sin!4v1756352862292!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Shinkolite Showroom"
                className="h-full w-full"
              />
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 md:text-base">
              <strong>A/16, Patel Shopping Centre, Off Chandavarkar Road, Borivali West, Mumbai 400092</strong>
            </p>
            <p className="text-xs text-gray-500 md:text-sm">Click and drag to explore the map • Tap for directions</p>
          </div>
        </div>
      </section>

    </div>
  )
}
