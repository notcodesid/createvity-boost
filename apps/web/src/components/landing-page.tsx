"use client";

import Image from "next/image";
import { 
  ArrowRight, 
  Footprints, 
  Lightbulb, 
  Scale, 
  ShieldCheck,
  Zap
} from "lucide-react";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 selection:bg-zinc-800 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#030303]/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left: Minimal Turbine Logo Icon & Name */}
          <div className="flex items-center gap-2.5">
            <TurbineIcon className="h-[35px] w-[35px] text-white" />
            <span className="font-semibold text-white text-lg tracking-tight">Creativity</span>
          </div>

          {/* Right: Navigation & Auth matching Midday.ai screenshot exactly */}
          <div className="flex items-center gap-8 text-[15px] text-zinc-400/90">
            <a href="#features" className="hover:text-zinc-100 transition-colors">
              Features
            </a>
            <a href="#story" className="hover:text-zinc-100 transition-colors">Story</a>
            <a href="#resources" className="hover:text-zinc-100 transition-colors">
              Resources
            </a>

            {/* Vertical Divider */}
            <div className="h-4 w-px bg-zinc-800/80" aria-hidden="true" />

            <a
              href="/api/auth/google"
              className="text-zinc-200 hover:text-white font-medium transition-colors"
            >
              Sign in
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Monochromatic Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800/80 bg-zinc-900/40 px-3.5 py-1 text-[13px] font-sans text-zinc-400 mb-6 hover:border-zinc-700/80 transition-colors cursor-pointer">
            <span>A notepad for your creativity</span>
            <ArrowRight className="h-3 w-3 text-zinc-500" />
          </div>

          {/* Heading in Hedvig Letters Serif */}
          <h1 className="text-[44px] sm:text-[80px] font-serif font-normal tracking-tight text-white leading-[1.05] max-w-4xl mx-auto">
            Think better. <br />
            Create more.
          </h1>

          {/* Subtitle */}
          <p className="mt-8 text-[16px] sm:text-[18px] text-zinc-500 max-w-2xl mx-auto leading-relaxed font-sans">
            A simple notebook to clear your mind, play fun brainstorming games to boost your creativity, and save your ideas forever.
          </p>

          {/* CTA & Subtext - Square Corners (rounded-none) */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3">
            <a
              href="/api/auth/google"
              className="inline-flex h-12 items-center justify-center bg-white px-8 text-[14px] font-sans font-medium text-zinc-950 hover:bg-zinc-200 active:scale-[0.98] transition-all rounded-none duration-150"
            >
              Start Brainstorming
            </a>
            <span className="text-[11.5px] font-sans text-zinc-500 tracking-wide">
              Free to use · Saves instantly
            </span>
          </div>

          {/* Minimalist Logo Row */}
          <div className="mt-14 flex items-center justify-center gap-10 opacity-20 grayscale pointer-events-none">
            <TurbineIcon className="h-5 w-5 text-white" />
            <Zap className="h-5 w-5 text-white" />
            <ShieldCheck className="h-5 w-5 text-white" />
            <Lightbulb className="h-5 w-5 text-white" />
            <Footprints className="h-5 w-5 text-white" />
            <Scale className="h-5 w-5 text-white" />
          </div>

          {/* Mockup Display with Monochromatic Glow */}
          <div className="relative mt-16 sm:mt-24 max-w-5xl mx-auto group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-zinc-800/10 via-zinc-900/10 to-zinc-800/10 opacity-30 blur-2xl transition duration-1000 group-hover:opacity-40" />
            <div className="relative rounded-2xl border border-zinc-900 bg-zinc-950 p-2 shadow-2xl">
              <Image
                src="/images/createvity-mockup.png"
                alt="Creativity App Dashboard Mockup"
                width={1000}
                height={563}
                priority
                className="w-full rounded-xl border border-zinc-900 object-cover shadow-inner"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section id="features" className="py-20 border-t border-zinc-900 bg-zinc-950/20 relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[13px] font-sans font-medium text-zinc-500 uppercase tracking-widest block mb-3">
              How it works
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-white leading-tight">
              Catch → Grow → Decide
            </h2>
            <p className="mt-4 text-zinc-500 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
              Five tabs. Save ideas, grow them three ways, pick winners — private notes stay private.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Bento Block 1: Catch */}
            <div className="rounded-none border border-zinc-900 bg-zinc-950/40 p-6 hover:border-zinc-800 transition-all duration-300 relative overflow-hidden group">
              <span className="text-[12px] text-zinc-500 font-sans tracking-wide block mb-1">01. Catch</span>
              <h3 className="text-[20px] font-semibold text-white leading-snug">Save the idea</h3>
              <p className="mt-3 text-[13px] text-zinc-500 leading-relaxed font-sans">
                Write it down before it disappears. Messy is fine — judge later.
              </p>
            </div>

            {/* Bento Block 2: Generate */}
            <div className="rounded-none border border-zinc-900 bg-zinc-950/40 p-6 hover:border-zinc-800 transition-all duration-300 relative overflow-hidden group">
              <span className="text-[12px] text-zinc-500 font-sans tracking-wide block mb-1">02. Generate</span>
              <h3 className="text-[20px] font-semibold text-white leading-snug">Make more ideas</h3>
              <p className="mt-3 text-[13px] text-zinc-500 leading-relaxed font-sans">
                Add freely with no judging. Volume first — quality comes in Decide.
              </p>
            </div>

            {/* Bento Block 3: Walk */}
            <div className="rounded-none border border-zinc-900 bg-zinc-950/40 p-6 hover:border-zinc-800 transition-all duration-300 relative overflow-hidden group">
              <span className="text-[12px] text-zinc-500 font-sans tracking-wide block mb-1">03. Walk</span>
              <h3 className="text-[20px] font-semibold text-white leading-snug">Step away</h3>
              <p className="mt-3 text-[13px] text-zinc-500 leading-relaxed font-sans">
                Start a timer, put the phone down, walk. When you’re back, catch what came up.
              </p>
            </div>

            {/* Bento Block 4: Prompt */}
            <div className="rounded-none border border-zinc-900 bg-zinc-950/40 p-6 hover:border-zinc-800 transition-all duration-300 relative overflow-hidden group">
              <span className="text-[12px] text-zinc-500 font-sans tracking-wide block mb-1">04. Prompt</span>
              <h3 className="text-[20px] font-semibold text-white leading-snug">Use a checklist</h3>
              <p className="mt-3 text-[13px] text-zinc-500 leading-relaxed font-sans">
                Stuck? Pick one idea and answer simple questions — swap, combine, cut — to find new angles.
              </p>
            </div>

            {/* Bento Block 5: Decide */}
            <div className="md:col-span-2 rounded-none border border-zinc-900 bg-zinc-950/40 p-6 hover:border-zinc-800 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden group">
              <div className="space-y-1">
                <span className="text-[12px] text-zinc-500 font-sans tracking-wide block mb-1">05. Decide</span>
                <h3 className="text-[20px] font-semibold text-white leading-snug">Keep or drop</h3>
                <p className="mt-3 text-[13px] text-zinc-500 leading-relaxed font-sans max-w-md">
                  Choose what lives. Keep the ones with energy, drop the rest.
                </p>
              </div>
              <div className="shrink-0 font-serif font-normal text-[48px] sm:text-[64px] text-zinc-200 opacity-90 leading-none select-none tracking-tight sm:pr-4">
                Decide
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-[#030303] py-8 px-[30px] text-zinc-500 font-sans text-xs">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <TurbineIcon className="h-5 w-5 text-white" />
            <span className="font-semibold text-white text-sm">Creativity</span>
          </div>
          <div className="text-[11px] text-zinc-600">
            Open Source under MIT License
          </div>
        </div>
      </footer>
    </div>
  );
}

function TurbineIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
    >
      <path d="M12 12c.5-1.5.8-3 .8-4.5 0-.8-.3-1.6-.8-2.3-.5.7-1 .7-1 1.5 0 1.5.3 3 .8 4.5Z" />
      <path d="M12 12c1.3-.8 2.6-1.5 3.8-2 .7-.3 1.3-.2 1.9.2-.5-.4-1.2-.4-1.8-.1-1.2.5-2.5 1.2-3.9 1.9Z" />
      <path d="M12 12c1.5-.5 3-.8 4.5-.8.8 0 1.6.3 2.3.8-.8-.5-1.6-.5-2.3-.5-1.5 0-3 .3-4.5.8Z" />
      <path d="M12 12c.8 1.3 1.5 2.6 2 3.8.3.7.2 1.3-.2 1.9.4-.5.4-1.2.1-1.8-.5-1.2-1.2-2.5-1.9-3.9Z" />
      <path d="M12 12c-.5 1.5-.8 3-.8 4.5 0 .8.3 1.6.8 2.3.5-.7 1-.7 1-1.5 0-1.5-.3-3-.8-4.5Z" />
      <path d="M12 12c-1.3.8-2.6 1.5-3.8 2-.7.3-1.3.2-1.9-.2.5.4 1.2.4 1.8-.1 1.2-.5 2.5-1.2 3.9-1.9Z" />
      <path d="M12 12c-1.5.5-3 .8-4.5.8-.8 0-1.6-.3-2.3-.8.8.5 1.6.5 2.3.5 1.5 0 3-.3 4.5-.8Z" />
      <path d="M12 12c-.8-1.3-1.5-2.6-2-3.8-.3-.7-.2-1.3.2-1.9-.4.5-.4 1.2-.1 1.8.5 1.2 1.2 2.5 1.9 3.9Z" />
    </svg>
  );
}
