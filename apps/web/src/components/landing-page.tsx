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
          <div className="flex items-center gap-2.5">
            <TurbineIcon className="h-[35px] w-[35px] text-white" />
            <span className="font-semibold text-white text-lg tracking-tight">Createvity</span>
          </div>

          <div className="flex items-center gap-8 text-[15px] text-zinc-400/90">
            <a href="#how-it-works" className="hover:text-zinc-100 transition-colors">
              How it works
            </a>
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
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800/80 bg-zinc-900/40 px-3.5 py-1 text-[13px] font-sans text-zinc-400 mb-6 hover:border-zinc-700/80 transition-colors cursor-pointer">
            <span>A 10-minute creative reset</span>
            <ArrowRight className="h-3 w-3 text-zinc-500" />
          </div>

          <h1 className="text-[44px] sm:text-[80px] font-serif font-normal tracking-tight text-white leading-[1.05] max-w-4xl mx-auto">
            Get unstuck. <br />
            Make the next move.
          </h1>

          <p className="mt-8 text-[16px] sm:text-[18px] text-zinc-500 max-w-2xl mx-auto leading-relaxed font-sans">
            A private practice for turning a messy thought into a direction worth following, without AI doing the thinking for you.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3">
            <a
              href="/api/auth/google"
              className="inline-flex h-12 items-center justify-center bg-white px-8 text-[14px] font-sans font-medium text-zinc-950 hover:bg-zinc-200 active:scale-[0.98] transition-all rounded-none duration-150"
            >
              Start a creative reset
            </a>
            <span className="text-[11.5px] font-sans text-zinc-500 tracking-wide">
              Free, private, and built for your own thinking
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

          <div className="relative mt-16 sm:mt-24 max-w-5xl mx-auto group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-zinc-800/10 via-zinc-900/10 to-zinc-800/10 opacity-30 blur-2xl transition duration-1000 group-hover:opacity-40" />
            <div className="relative rounded-2xl border border-zinc-900 bg-zinc-950 p-2 shadow-2xl">
              <Image
                src="/images/createvity-mockup.png"
                alt="Createvity creative reset dashboard"
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
      <section id="how-it-works" className="py-20 border-t border-zinc-900 bg-zinc-950/20 relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[13px] font-sans font-medium text-zinc-500 uppercase tracking-widest block mb-3">
              A simple loop for stuck moments
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-white leading-tight">
              Catch → Grow → Decide
            </h2>
            <p className="mt-4 text-zinc-500 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
              Catch a thought before it disappears, use the right intervention when you are stuck, then choose what deserves your attention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Bento Block 1: Catch */}
            <div className="rounded-none border border-zinc-900 bg-zinc-950/40 p-6 hover:border-zinc-800 transition-all duration-300 relative overflow-hidden group">
              <span className="text-[12px] text-zinc-500 font-sans tracking-wide block mb-1">01. Catch</span>
              <h3 className="text-[20px] font-semibold text-white leading-snug">Catch the thought</h3>
              <p className="mt-3 text-[13px] text-zinc-500 leading-relaxed font-sans">
                Write it down before it disappears. Messy is fine. Judgment comes later.
              </p>
            </div>

            {/* Bento Block 2: Generate */}
            <div className="rounded-none border border-zinc-900 bg-zinc-950/40 p-6 hover:border-zinc-800 transition-all duration-300 relative overflow-hidden group">
              <span className="text-[12px] text-zinc-500 font-sans tracking-wide block mb-1">02. Grow</span>
              <h3 className="text-[20px] font-semibold text-white leading-snug">Find another angle</h3>
              <p className="mt-3 text-[13px] text-zinc-500 leading-relaxed font-sans">
                Generate options, take a walk, or use a prompt when your usual approach has run dry.
              </p>
            </div>

            {/* Bento Block 3: Walk */}
            <div className="rounded-none border border-zinc-900 bg-zinc-950/40 p-6 hover:border-zinc-800 transition-all duration-300 relative overflow-hidden group">
              <span className="text-[12px] text-zinc-500 font-sans tracking-wide block mb-1">03. Walk</span>
              <h3 className="text-[20px] font-semibold text-white leading-snug">Get unstuck</h3>
              <p className="mt-3 text-[13px] text-zinc-500 leading-relaxed font-sans">
                Step away from the screen. When you come back, catch the thought that surfaced.
              </p>
            </div>

            {/* Bento Block 4: Prompt */}
            <div className="rounded-none border border-zinc-900 bg-zinc-950/40 p-6 hover:border-zinc-800 transition-all duration-300 relative overflow-hidden group">
              <span className="text-[12px] text-zinc-500 font-sans tracking-wide block mb-1">04. Prompt</span>
              <h3 className="text-[20px] font-semibold text-white leading-snug">Change the question</h3>
              <p className="mt-3 text-[13px] text-zinc-500 leading-relaxed font-sans">
                Pick one idea and try a constraint: swap, combine, cut, or reverse it.
              </p>
            </div>

            {/* Bento Block 5: Decide */}
            <div className="md:col-span-2 rounded-none border border-zinc-900 bg-zinc-950/40 p-6 hover:border-zinc-800 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden group">
              <div className="space-y-1">
              <span className="text-[12px] text-zinc-500 font-sans tracking-wide block mb-1">05. Decide</span>
              <h3 className="text-[20px] font-semibold text-white leading-snug">Keep what has energy</h3>
                <p className="mt-3 text-[13px] text-zinc-500 leading-relaxed font-sans max-w-md">
                Separate the ideas worth another pass from the ones you are only holding onto.
                </p>
              </div>
              <div className="shrink-0 font-serif font-normal text-[48px] sm:text-[64px] text-zinc-200 opacity-90 leading-none select-none tracking-tight sm:pr-4">
                Keep one
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
            <span className="font-semibold text-white text-sm">Createvity</span>
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
