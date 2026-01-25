import { ApplicationForm } from '@/components/ApplicationForm'
import { Button } from '@/components/ui/button'
import { ScrollToTop } from '@/components/ScrollToTop'
import { MobileFab } from '@/components/MobileFab'
import { InfinitePortfolio } from '@/components/InfinitePortfolio'
import { StarQualityChecklist } from '@/components/StarQualityChecklist'
import { EthicalModelling } from '@/components/EthicalModelling'
import { AgeDivisions } from '@/components/AgeDivisions'
import { Star, Instagram, Facebook, Twitter, Heart, CheckCircle2, GraduationCap } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F5F2] selection:bg-brand-yellow selection:text-black relative">
      <ScrollToTop />
      <MobileFab />

      {/* Navbar Placeholder */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-6 md:px-8">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-yellow to-brand-pink shadow-lg ring-2 ring-white" />
          <span className="text-2xl font-black text-white drop-shadow-md tracking-tight">TinyTalent<span className="text-brand-pink">.</span></span>
        </div>
      </header>

      {/* Hero Section with Full Width Image */}
      <section className="relative min-h-[90vh] w-full pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-teen-lifestyle.png"
            alt="Diverse group of cool kids and teens"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent md:from-black/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F7F5F2]" />
          {/* Mobile Scrim */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-transparent md:hidden" />
        </div>

        {/* Floating 3D Elements (Soft Focus) */}
        <div className="absolute bottom-[20%] right-[10%] z-10 animate-pulse duration-[4000ms] hidden lg:block opacity-90">
          <Image src="/block-3d.png" alt="3D Block" width={140} height={140} className="drop-shadow-2xl hover:rotate-12 transition-transform cursor-pointer" />
        </div>

        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex flex-col md:flex-row items-center justify-center md:items-start md:justify-between gap-8 pt-12 md:pt-24">

          {/* Left Column: Copy */}
          <div className="space-y-6 text-center md:text-left md:max-w-xl md:pt-12">

            {/* Mobile Glassmorphism Card Wrapper */}
            <div className="md:contents bg-white/30 backdrop-blur-md rounded-3xl p-6 md:p-0 md:bg-transparent md:backdrop-blur-none relative z-10 flex flex-col items-center md:block">

              {/* Wiggling Status Pill */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-4 py-2 text-sm font-bold text-gray-900 shadow-xl ring-2 ring-brand-pink/50 animate-wiggle origin-left mb-4 md:mb-0">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Accepting Applications for Ages 5-17
              </div>

              <h1 className="text-[2.25rem] md:text-5xl font-black tracking-tight text-white drop-shadow-none shadow-pink-200/50 sm:text-6xl lg:text-7xl leading-tight md:leading-[1.1] mb-4 md:mb-0 [text-shadow:_0_4px_12px_rgb(251_207_232_/_0.5)]">
                Empowering the <br className="hidden md:block" />
                <span className="text-brand-yellow drop-shadow-md">Next Generation</span> of Talent.
              </h1>

              <p className="text-lg font-medium text-white/90 drop-shadow-md lg:text-xl md:max-w-md">
                We bridge the gap between young potential and professional opportunity. London's Leading Model Support Service.
              </p>

            </div>

            {/* No Upfront Fees Badge */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="inline-flex items-center gap-2 bg-brand-yellow text-gray-900 font-black px-4 py-2 rounded-lg -rotate-2 shadow-lg border-2 border-white">
                <CheckCircle2 className="w-5 h-5" />
                NO JOINING FEES!
              </div>
              <div className="inline-flex items-center gap-2 bg-white text-brand-blue font-black px-4 py-2 rounded-lg rotate-1 shadow-lg border-2 border-brand-blue">
                <GraduationCap className="w-5 h-5" />
                SCHOOL FIRST POLICY
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="w-full max-w-md md:pt-4">
            <ApplicationForm />
          </div>

        </div>
      </section>

      {/* Age Divisions Section */}
      <AgeDivisions />

      {/* Star Quality Checklist */}
      <StarQualityChecklist />

      {/* Ethical Modelling Section */}
      <EthicalModelling />

      {/* Success Stories (Fade In on Scroll handled by native CSS or simple keyframes if needed, sticking to static for speed unless framer requested) */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-20 bg-[#F7F5F2]">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Success Stories</h2>
          <p className="text-gray-500 font-medium text-lg">Real families, real campaigns.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            { name: "Sarah & Leo", brand: "H&M Kids", quote: "The process was so simple! Leo had so much fun on set.", img: "/profile-leo.png" },
            { name: "Mike & Bella", brand: "Zara Baby", quote: "We were nervous at first, but the team made us feel at home.", img: "/profile-bella.png" },
            { name: "Emma & Noah", brand: "Next", quote: "Within 2 weeks we got our first casting call. Unbelievable!", img: "/profile-noah.png" }
          ].map((t, i) => (
            <div key={i} className="group relative rounded-[30px] bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-1 text-brand-yellow">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-green-600 bg-green-100 px-2 py-1 rounded-full">Verified Parent</span>
              </div>

              <p className="mb-8 text-gray-600 font-medium leading-relaxed text-lg">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-brand-pink/20">
                  <Image
                    src={t.img}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-base font-bold text-gray-900">{t.name}</p>
                  <p className="text-sm font-bold text-brand-pink">{t.brand}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Infinite Portfolio Gallery */}
      <section className="bg-white py-24 overflow-hidden relative">
        <div className="relative text-center mb-12 max-w-2xl mx-auto px-4">
          <span className="inline-block mb-4 text-sm font-bold tracking-widest text-brand-pink uppercase">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Meet The Future Stars</h2>
        </div>

        <InfinitePortfolio />
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-8">

          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-yellow to-brand-pink shadow-md" />
              <span className="text-xl font-black text-gray-900 tracking-tight">TinyTalent<span className="text-brand-pink">.</span></span>
            </div>
            <p className="text-sm text-gray-500 font-medium max-w-xs text-center md:text-left">
              Connecting cuteness with confidence since 2010. The UK's favorite child modelling family.
            </p>
            {/* New Trust Info */}
            <div className="flex flex-col gap-1 text-xs text-gray-400 font-medium text-center md:text-left">
              <p>📍 123 High Street, Kensington, London, W8 5SA</p>
              <p>📧 support@tinytalent.co.uk</p>
            </div>
          </div>

          <div className="flex gap-8 text-sm font-bold text-gray-600">
            <a href="#" className="hover:text-brand-pink transition-colors">Home</a>
            <a href="#" className="hover:text-brand-pink transition-colors">Success Stories</a>
            <a href="#" className="hover:text-brand-pink transition-colors">Apply Now</a>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-4">
              <a href="https://www.instagram.com/edgetalent.uk/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-brand-pink hover:text-white transition-all">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-red-400 fill-current" /> in London. © 2026
            </p>
          </div>

        </div>
      </footer>

    </main>
  )
}
