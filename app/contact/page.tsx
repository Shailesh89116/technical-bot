/* eslint-disable react/no-unescaped-entities */
import Image from "next/image"
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden bg-black py-20 text-center text-white md:py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Contact Us"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <h1 className="mb-4 text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">Contact Us</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg font-light text-gray-300 md:text-xl">
            We're here to help with your acrylic sheet needs
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-medium tracking-tight md:text-4xl">Get in Touch</h2>
              <p className="mb-8 text-gray-600">
                Have questions about our products or need a custom solution? Our team is ready to assist you.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-gray-100 p-3">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-medium">Phone</h3>
                    <p className="text-gray-600">+1 (800) 123-4567</p>
                    <p className="text-gray-600">Monday - Friday, 9am - 5pm EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-gray-100 p-3">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-medium">Email</h3>
                    <p className="text-gray-600">info@naturelight.com</p>
                    <p className="text-gray-600">sales@naturelight.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-gray-100 p-3">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-medium">Office & Warehouse</h3>
                    <p className="text-gray-600">123 Acrylic Way</p>
                    <p className="text-gray-600">New York, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-gray-100 p-3">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-medium">Live Chat</h3>
                    <p className="text-gray-600">Chat with our AI assistant for instant quotes</p>
                    <Button variant="link" className="h-auto p-0 text-black">
                      Start Chat
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-xl font-medium">Send us a Message</h3>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone
                  </label>
                  <Input id="phone" placeholder="Your phone number" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="How can we help you?" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Your message" rows={5} />
                </div>
                <Button className="w-full rounded-full">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-gray-50 py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-8 text-center text-3xl font-medium tracking-tight md:text-4xl">Visit Our Location</h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="aspect-video w-full">
              <Image
                src="/placeholder.svg?height=600&width=1200"
                alt="Map"
                width={1200}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-medium tracking-tight md:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  question: "What thickness is best for outdoor signs?",
                  answer:
                    "For outdoor signs, we recommend acrylic sheets with a thickness of 5mm or greater to ensure durability against weather conditions. Our UV-stabilized sheets are specifically designed to withstand outdoor exposure without yellowing.",
                },
                {
                  question: "How do I cut the sheets safely?",
                  answer:
                    "Acrylic sheets can be cut using various methods including laser cutting, sawing, or scoring and breaking. For DIY projects, we recommend using a fine-toothed saw or a scoring tool. Always wear protective gear and work on a clean, flat surface.",
                },
                {
                  question: "Do you ship nationwide?",
                  answer:
                    "Yes, we offer nationwide shipping for all our products. Shipping costs are calculated based on the weight and dimensions of your order. We also offer expedited shipping options for urgent requirements.",
                },
                {
                  question: "Can I get custom sizes?",
                  answer:
                    "We offer custom cutting services to provide acrylic sheets in the exact dimensions you need. Simply specify your requirements when placing an order or contact our customer service team for assistance.",
                },
              ].map((faq, index) => (
                <div key={index} className="rounded-lg border border-gray-200 p-6">
                  <h3 className="mb-3 text-lg font-medium">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
