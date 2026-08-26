import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function DemoPassportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      {/* Hero Header - Apple Style */}
      <div className="relative bg-black text-white overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1920&q=90" 
            alt="Modern luxury interior"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-32 sm:pt-32 sm:pb-40">
          {/* Verified Badge - Stripe Style */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-sm font-medium">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span>Verified Installation</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              PIK Residence
            </h1>
            <p className="text-xl sm:text-2xl text-white/70 font-light max-w-2xl mx-auto">
              Premium interior finishing by Halla Home
            </p>
          </div>

          {/* Metadata Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            <div className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-sm font-medium">
              ID: H-260824-001
            </div>
            <div className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-sm font-medium">
              📅 Aug 24, 2026
            </div>
            <div className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-sm font-medium">
              🏠 Residential
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Linear/Notion Style */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 -mt-16 pb-24 relative z-10">
        <div className="space-y-8">
          
          {/* Products Section */}
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.05),0_12px_24px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="p-8 sm:p-12">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                <h2 className="text-3xl font-bold text-neutral-900">Installed Products</h2>
              </div>

              <div className="space-y-10">
                {/* Living Room */}
                <div className="space-y-6">
                  {/* Room Header */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/30">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-900">Living Room</h3>
                      <p className="text-sm text-neutral-500">1 product installed</p>
                    </div>
                  </div>

                  {/* Product Card */}
                  <div className="group ml-16 rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50/50 to-white hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-900/5 transition-all duration-300 overflow-hidden">
                    {/* Product Image */}
                    <div className="relative h-64 bg-gradient-to-br from-slate-900 to-slate-700 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" 
                        alt="Modern office with large windows"
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <Badge className="bg-white/90 backdrop-blur-sm text-indigo-600 border-0 hover:bg-white font-medium px-3 py-1.5">
                          Window Film
                        </Badge>
                        <div className="text-right text-white">
                          <div className="text-3xl font-bold drop-shadow-lg">25 m²</div>
                          <div className="text-sm opacity-90">Coverage</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="mb-6">
                        <h4 className="text-xl font-semibold text-neutral-900 mb-1">3M Crystalline 70</h4>
                        <p className="text-neutral-600 font-medium">Crystalline Series</p>
                      </div>

                    {/* Specs - Card Style */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 transition-colors">
                        <div className="text-3xl font-bold bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">70%</div>
                        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">VLT</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 transition-colors">
                        <div className="text-3xl font-bold bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1">99%</div>
                        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">UV Block</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 transition-colors">
                        <div className="text-3xl font-bold bg-gradient-to-br from-red-600 to-orange-600 bg-clip-text text-transparent mb-1">97%</div>
                        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">IR Block</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 transition-colors">
                        <div className="text-3xl font-bold bg-gradient-to-br from-pink-600 to-rose-600 bg-clip-text text-transparent mb-1">65%</div>
                        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">TSER</div>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-neutral-200">
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Installed Aug 24, 2026</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="text-sm font-medium text-emerald-700">Protected until Aug 2031</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

                {/* Master Bedroom */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 shadow-lg shadow-purple-500/30">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-900">Master Bedroom</h3>
                      <p className="text-sm text-neutral-500">1 product installed</p>
                    </div>
                  </div>

                  <div className="group ml-16 rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50/50 to-white hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-900/5 transition-all duration-300 overflow-hidden">
                    {/* Product Image */}
                    <div className="relative h-64 bg-gradient-to-br from-amber-900 to-amber-700 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80" 
                        alt="Luxury vinyl flooring in modern bedroom"
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <Badge className="bg-white/90 backdrop-blur-sm text-purple-600 border-0 hover:bg-white font-medium px-3 py-1.5">
                          Flooring
                        </Badge>
                        <div className="text-right text-white">
                          <div className="text-3xl font-bold drop-shadow-lg">35 m²</div>
                          <div className="text-sm opacity-90">Coverage</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-8">
                      <div className="mb-6">
                        <h4 className="text-xl font-semibold text-neutral-900 mb-1">Armstrong Luxury Vinyl</h4>
                        <p className="text-neutral-600 font-medium">Timeless Collection</p>
                      </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 transition-colors">
                        <div className="text-2xl font-bold text-neutral-900 mb-1">Vinyl</div>
                        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Material</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 transition-colors">
                        <div className="text-2xl font-bold text-neutral-900 mb-1">6mm</div>
                        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Thickness</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 transition-colors">
                        <div className="text-2xl font-bold text-neutral-900 mb-1">0.5mm</div>
                        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Wear Layer</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-neutral-200">
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Installed Aug 24, 2026</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="text-sm font-medium text-emerald-700">Protected until Aug 2029</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

          {/* Photo Gallery Section */}
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.05),0_12px_24px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="p-8 sm:p-12">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full"></div>
                <h2 className="text-3xl font-bold text-neutral-900">Installation Gallery</h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80"
                    alt="Before installation"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-xs font-semibold uppercase tracking-wide mb-1">Before</div>
                    <div className="text-sm">Original condition</div>
                  </div>
                </div>

                <div className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80"
                    alt="During installation"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-xs font-semibold uppercase tracking-wide mb-1">During</div>
                    <div className="text-sm">Installation process</div>
                  </div>
                </div>

                <div className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80"
                    alt="After installation"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-xs font-semibold uppercase tracking-wide mb-1">After</div>
                    <div className="text-sm">Final result</div>
                  </div>
                </div>

                <div className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer sm:col-span-2">
                  <img 
                    src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80"
                    alt="Living room completed"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-xs font-semibold uppercase tracking-wide mb-1">Completed</div>
                    <div className="text-sm">Living room with window film installed</div>
                  </div>
                </div>

                <div className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80"
                    alt="Master bedroom flooring"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-xs font-semibold uppercase tracking-wide mb-1">Detail</div>
                    <div className="text-sm">Flooring close-up</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Maintenance & Care Section */}
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.05),0_12px_24px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="p-8 sm:p-12">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
                <h2 className="text-3xl font-bold text-neutral-900">Maintenance & Care</h2>
              </div>

              <div className="space-y-10">
                {/* Window Film Care */}
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-semibold text-neutral-900">Window Film Care</h3>
                    </div>
                    
                    <div className="space-y-4 text-neutral-700">
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold mb-1">Clean with soft cloth</div>
                          <div className="text-sm text-neutral-600">Use microfiber cloth and mild soap solution</div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold mb-1">Avoid abrasive materials</div>
                          <div className="text-sm text-neutral-600">No harsh chemicals or rough sponges</div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold mb-1">Wait 30 days before cleaning</div>
                          <div className="text-sm text-neutral-600">Allow film to fully cure after installation</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden h-80 lg:h-full">
                    <img 
                      src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
                      alt="Cleaning window film"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>

                {/* Flooring Care */}
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  <div className="rounded-2xl overflow-hidden h-80 lg:h-full order-2 lg:order-1">
                    <img 
                      src="https://images.unsplash.com/photo-1581404649443-8010c9f48e88?w=800&q=80"
                      alt="Luxury vinyl flooring maintenance"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-4 order-1 lg:order-2">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-semibold text-neutral-900">Flooring Care</h3>
                    </div>
                    
                    <div className="space-y-4 text-neutral-700">
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold mb-1">Regular vacuuming</div>
                          <div className="text-sm text-neutral-600">Remove dirt and debris weekly</div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold mb-1">Damp mop as needed</div>
                          <div className="text-sm text-neutral-600">Use vinyl-safe cleaning solution</div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold mb-1">Use protective pads</div>
                          <div className="text-sm text-neutral-600">Place felt pads under furniture legs</div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold mb-1">Avoid standing water</div>
                          <div className="text-sm text-neutral-600">Wipe up spills immediately</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Warranty Card - Premium Design */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-800 shadow-2xl">
            {/* Subtle Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            
            <div className="relative p-8 sm:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-full"></div>
                <h2 className="text-3xl font-bold text-white">Warranty Protection</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="font-semibold text-white text-lg mb-1">Crystalline 70</div>
                      <div className="text-sm text-white/60">Window Film</div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                      <span className="text-xs font-semibold text-emerald-400">ACTIVE</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Valid Until</span>
                      <span className="font-semibold text-white">Aug 24, 2031</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Coverage</span>
                      <span className="font-semibold text-white">60 months</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Days Remaining</span>
                      <span className="font-semibold text-emerald-400">1,826</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="font-semibold text-white text-lg mb-1">Luxury Vinyl</div>
                      <div className="text-sm text-white/60">Flooring</div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                      <span className="text-xs font-semibold text-emerald-400">ACTIVE</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Valid Until</span>
                      <span className="font-semibold text-white">Aug 24, 2029</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Coverage</span>
                      <span className="font-semibold text-white">36 months</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Days Remaining</span>
                      <span className="font-semibold text-emerald-400">1,096</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Statistics */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl shadow-indigo-500/20">
              <div className="text-5xl font-bold mb-2">60m²</div>
              <div className="text-sm font-medium opacity-90">Total Coverage</div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white shadow-xl shadow-emerald-500/20">
              <div className="text-5xl font-bold mb-2">2</div>
              <div className="text-sm font-medium opacity-90">Products Installed</div>
            </div>
            
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-8 text-white shadow-xl shadow-pink-500/20">
              <div className="text-5xl font-bold mb-2">48h</div>
              <div className="text-sm font-medium opacity-90">Installation Time</div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl shadow-amber-500/20">
              <div className="text-5xl font-bold mb-2">5yr</div>
              <div className="text-sm font-medium opacity-90">Max Warranty</div>
            </div>
          </div>

          {/* Contact CTA - Modern Style */}
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_2px_4px_rgba(0,0,0,0.05),0_12px_24px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="p-8 sm:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                <h2 className="text-3xl font-bold text-neutral-900">Get Support</h2>
              </div>
              
              <p className="text-lg text-neutral-600 mb-8 max-w-2xl">
                Need help with your project? Our team is ready to assist with warranty claims, maintenance advice, or service requests.
              </p>

              {/* Installer Profile Card */}
              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-neutral-50 to-white border-2 border-neutral-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-purple-500/30">
                    JD
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900 text-xl">John Doe</div>
                    <div className="text-neutral-600">Lead Installer</div>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-neutral-700">
                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>8 years experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>3M Certified</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <span>4.9/5.0 rating</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>120+ projects</span>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Button className="h-14 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-base rounded-xl shadow-lg shadow-neutral-900/20 transition-all hover:shadow-xl hover:shadow-neutral-900/30 hover:-translate-y-0.5">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp Support
                </Button>

                <Button variant="outline" className="h-14 border-2 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 font-medium text-base rounded-xl transition-all hover:-translate-y-0.5">
                  Request Service
                </Button>
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-neutral-50 border border-neutral-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900 text-lg mb-1">Halla Home</div>
                    <p className="text-neutral-600">Professional Interior Finishing & Building Materials</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">ISO Certified</div>
                      <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">Authorized Dealer</div>
                      <div className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">10+ Years</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-200 bg-neutral-50 mt-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
          <div className="text-center space-y-2">
            <div className="text-sm font-medium text-neutral-900">Project H Digital Passport</div>
            <div className="text-sm text-neutral-500">H-260824-001 • Published August 24, 2026</div>
            <div className="text-xs text-neutral-400 pt-4">Powered by Halla Home © 2026</div>
          </div>
        </div>
      </div>
    </div>
  )
}
