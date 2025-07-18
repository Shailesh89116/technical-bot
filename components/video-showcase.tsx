"use client"

import HeroVideoDialog from "./magicui/hero-video-dialog"

interface VideoShowcaseProps {
  videoUrl?: string
  thumbnailUrl?: string
  title?: string
  description?: string
}

export function VideoShowcase({
  title = "See the Difference",
  description = "Watch how our premium acrylic transforms spaces with extraordinary clarity, strength, and precision engineering.",
}: VideoShowcaseProps) {


  return (
    <section className="bg-white py-24 md:py-32 text-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-semibold animate-fade-in">{title}</h2>
        <p className="mx-auto mb-8 md:mb-12 max-w-3xl text-lg md:text-xl text-gray-500 animate-fade-in-delay">
          {description}
        </p>

<div className="relative w-full max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] mx-auto px-4">
      <div className="relative">
        <HeroVideoDialog
          className="block dark:hidden"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
          thumbnailAlt="Hero Video"
        />
        <HeroVideoDialog
          className="hidden dark:block"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
          thumbnailAlt="Hero Video"
        />
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none"></div>
      </div>
    </div>

        {/* Additional Info */}
        <div className="mt-8 md:mt-12 text-center">
          <p className="text-sm md:text-base text-gray-500 mb-4">
            Experience the clarity and precision of our premium acrylic solutions
          </p>
        </div>
      </div>
    </section>
  )
}
