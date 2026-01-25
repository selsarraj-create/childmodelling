import { ApplicationForm } from '@/components/ApplicationForm'
import { Button } from '@/components/ui/button'
import { ScrollToTop } from '@/components/ScrollToTop'
import { Star, Instagram, Facebook, Twitter, Heart } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F5F2] selection:bg-brand-yellow selection:text-black relative">
      <ScrollToTop />

      {/* Navbar Placeholder */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-6 md:px-8">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-yellow to-brand-pink shadow-lg ring-2 ring-white" />
          <span className="text-2xl font-black text-white drop-shadow-md tracking-tight">TinyTalent<span className="text-brand-pink">.</span></span>
        </div>
        <Button variant="ghost" size="sm" className="hidden md:flex bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border-white/40">Parent Login</Button>
      </header>

      {/* Hero Section with Full Width Image */}
      <section className="relative min-h-[90vh] w-full pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-child.png"
            alt="Happy diverse child model"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent md:from-black/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F7F5F2]" />
        </div>

        {/* Floating 3D Elements */}
        <div className="absolute top-[15%] left-[5%] z-10 animate-bounce duration-[3000ms] hidden md:block">
          <Image src="/star-3d.png" alt="3D Star" width={120} height={120} className="drop-shadow-2xl hover:scale-110 transition-transform cursor-pointer" />
        </div>
        <div className="absolute bottom-[20%] right-[10%] z-10 animate-pulse duration-[4000ms] hidden lg:block">
          <Image src="/block-3d.png" alt="3D Block" width={140} height={140} className="drop-shadow-2xl hover:rotate-12 transition-transform cursor-pointer" />
        </div>
        <div className="absolute top-[20%] right-[30%] z-10 animate-bounce duration-[3500ms] hidden lg:block">
          <Image src="/camera-3d.png" alt="3D Camera" width={100} height={100} className="drop-shadow-2xl hover:-rotate-6 transition-transform cursor-pointer" />
        </div>

        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex flex-col md:flex-row items-center justify-center md:items-start md:justify-between gap-8 pt-12 md:pt-24">

          {/* Left Column: Copy */}
          <div className="space-y-6 text-center md:text-left md:max-w-xl md:pt-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-4 py-2 text-sm font-bold text-gray-900 shadow-xl ring-2 ring-brand-pink/50 animate-[pulse_3s_infinite]">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Accepting Applications for 2026
            </div>

            <h1 className="text-5xl font-black tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl leading-[1.1]">
              Turn Your Child's <br />
              <span className="text-brand-yellow drop-shadow-md">Smile</span> Into Stardom.
            </h1>

            <p className="text-lg font-medium text-white/90 drop-shadow-md lg:text-xl md:max-w-md">
              We connect cuteness with confidence. The UK's most trusted agency for baby and child modelling.
            </p>
          </div>

          {/* Right Column: Form */}
          <div className="w-full max-w-md md:pt-4">
            <ApplicationForm />
          </div>

        </div>
      </section>

      {/* Success Stories */}
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
              <div className="mb-6 flex items-center gap-1 text-brand-yellow">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
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

      {/* Portfolio Gallery (Masonry-ish) */}
      <section className="bg-white py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 relative">
          {/* Decorative Background for Gallery */}
          <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-brand-yellow/20 rounded-full blur-[80px]" />
          <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-[80px]" />

          <div className="relative text-center mb-16 max-w-2xl mx-auto">
            <span className="inline-block mb-4 text-sm font-bold tracking-widest text-brand-pink uppercase">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Meet The Future Stars</h2>
            <p className="text-gray-500 text-lg">From high fashion to commercial fun, our talent shines in every frame.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px] md:h-[600px] w-full rounded-[40px] overflow-hidden shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              <Image
                src="/portfolio-collage.png"
                alt="Portfolio Collage"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                <p className="text-white font-bold text-xl">Fresh Faces 2026</p>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="bg-brand-yellow/10 p-8 rounded-[30px] border border-brand-yellow/20 hover:bg-brand-yellow/20 transition-colors">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Commercial</h3>
                <p className="text-gray-600">Perfect for TV commercials, print ads, and catalogue work. We look for bright smiles and confidence.</p>
              </div>
              <div className="bg-brand-blue/10 p-8 rounded-[30px] border border-brand-blue/20 hover:bg-brand-blue/20 transition-colors">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">High Fashion</h3>
                <p className="text-gray-600">Editorial and runway work for luxury kids' brands. Unique looks and strong features standout here.</p>
              </div>
              <div className="bg-brand-pink/10 p-8 rounded-[30px] border border-brand-pink/20 hover:bg-brand-pink/20 transition-colors">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Acting & Extras</h3>
                <p className="text-gray-600">Roles in films, TV series, and background work for motion pictures.</p>
              </div>
            </div>
          </div>
        </div>
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
          </div>

          <div className="flex gap-8 text-sm font-bold text-gray-600">
            <a href="#" className="hover:text-brand-pink transition-colors">Home</a>
            <a href="#" className="hover:text-brand-pink transition-colors">Success Stories</a>
            <a href="#" className="hover:text-brand-pink transition-colors">Apply Now</a>
            <a href="#" className="hover:text-brand-pink transition-colors">Parent Login</a>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-brand-pink hover:text-white transition-all">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-brand-blue hover:text-white transition-all">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-brand-yellow hover:text-white transition-all">
                <Twitter className="h-5 w-5" />
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
