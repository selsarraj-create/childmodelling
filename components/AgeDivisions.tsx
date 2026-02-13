import { Camera, Clapperboard, Sparkles, Footprints } from 'lucide-react'

export function AgeDivisions() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
                        From Commercials to High-Fashion
                    </h2>
                    <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
                        We define clear pathways for every age group, maximizing opportunities.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    {/* The Commercial Star */}
                    <div className="group relative overflow-hidden rounded-[40px] bg-[#FFFACD] p-8 md:p-12 transition-all hover:shadow-2xl hover:-translate-y-2 border-4 border-brand-yellow/20">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Clapperboard className="w-32 h-32 text-brand-yellow" />
                        </div>
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 bg-brand-yellow text-black font-black px-4 py-2 rounded-full mb-6 text-sm uppercase tracking-wide">
                                Ages 4 - 10
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 mb-4">The Commercial Star</h3>
                            <p className="text-gray-700 font-medium text-lg mb-8 leading-relaxed">
                                Perfect for toy brands, supermarkets, and family-themed TV ads. We focus on bringing out their natural energy and bubbly personalities.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "TV Commercials & Acting",
                                    "Toy & Game Packaging",
                                    "Family Lifestyle Shoots"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 font-bold text-gray-800">
                                        <Sparkles className="w-5 h-5 text-brand-yellow fill-current" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* The Editorial Professional */}
                    <div className="group relative overflow-hidden rounded-[40px] bg-[#E0F7FA] p-8 md:p-12 transition-all hover:shadow-2xl hover:-translate-y-2 border-4 border-brand-blue/20">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Camera className="w-32 h-32 text-brand-blue" />
                        </div>
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 bg-brand-blue text-white font-black px-4 py-2 rounded-full mb-6 text-sm uppercase tracking-wide">
                                Ages 11 - 17
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 mb-4">The Editorial Professional</h3>
                            <p className="text-gray-700 font-medium text-lg mb-8 leading-relaxed">
                                Aimed at high-street fashion brands, social media campaigns, and footwear. We develop their posing precision and on-set discipline.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "High-Street Fashion Campaigns",
                                    "Social Media Content Creation",
                                    "Teen Lifestyle & Footwear"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 font-bold text-gray-800">
                                        <Footprints className="w-5 h-5 text-brand-blue fill-current" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
