import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Contact Us</h1>
          <p className="mb-8 text-muted-foreground">
            Have questions about our acrylic sheets or need a custom quote? Our team is here to help. Fill out the form
            or use one of our contact methods below.
          </p>

          <div className="grid gap-6">
            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <Phone className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-sm text-muted-foreground">Mon-Fri, 9am-5pm EST</p>
                  <p className="mt-1">+1 (555) 123-4567</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <Mail className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                  <p className="mt-1">info@naturelight.com</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <MessageSquare className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Live Chat & WhatsApp</h3>
                  <p className="text-sm text-muted-foreground">Get instant quotes and support</p>
                  <p className="mt-1">Available on website and +1 (555) 987-6543</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Office & Warehouse</h3>
                  <p className="text-sm text-muted-foreground">Visit our showroom</p>
                  <p className="mt-1">123 Acrylic Way, Clarity City, AC 12345</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <form className="grid gap-6 rounded-lg border p-6">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input id="name" placeholder="Your name" />
            </div>

            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" placeholder="Your email address" />
            </div>

            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone
              </label>
              <Input id="phone" type="tel" placeholder="Your phone number" />
            </div>

            <div className="grid gap-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Input id="subject" placeholder="What is this regarding?" />
            </div>

            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea id="message" placeholder="Your message" rows={5} />
            </div>

            <Button type="submit" size="lg">
              Send Message
            </Button>
          </form>

          <div className="mt-8 rounded-lg border p-4">
            <h3 className="mb-4 text-lg font-medium">Our Location</h3>
            <div className="aspect-video overflow-hidden rounded-md bg-muted">
              {/* In a real implementation, this would be a Google Maps embed */}
              <div className="flex h-full items-center justify-center">
                <MapPin className="mr-2 h-6 w-6 text-primary" />
                <span>Map Embed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
