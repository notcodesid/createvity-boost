"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  ArrowRight, 
  Check, 
  Copy, 
  ExternalLink, 
  Footprints, 
  Lightbulb, 
  Scale, 
  Shuffle, 
  ShieldCheck,
  Zap,
  Lock
} from "lucide-react";

export function LandingPage() {
  const [copied, setCopied] = useState(false);

  const contractAddress = "0xB56f1d22C37c85C7658C66Fb692FD9AB74405c4E";

  function handleCopy() {
    void navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 selection:bg-zinc-800 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#030303]/80 backdrop-blur-md">
        <div className="w-full px-[30px] h-16 flex items-center justify-between">
          {/* Left: Minimal Turbine Logo Icon */}
          <div className="flex items-center">
            <TurbineIcon className="h-[35px] w-[35px] text-white" />
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
            <span>Where your ideas become real</span>
            <ArrowRight className="h-3 w-3 text-zinc-500" />
          </div>

          {/* Heading in Hedvig Letters Serif */}
          <h1 className="text-[44px] sm:text-[80px] font-serif font-normal tracking-tight text-white leading-[1.05] max-w-4xl mx-auto">
            Write down your ideas. <br />
            Make them real.
          </h1>

          {/* Subtitle */}
          <p className="mt-8 text-[16px] sm:text-[18px] text-zinc-500 max-w-2xl mx-auto leading-relaxed font-sans">
            A simple notepad for your brain. Jot down quick thoughts, use fun brainstorm exercises to grow them, and save them in a way that proves you came up with them first.
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
                src="/images/createvity-mockup.jpg"
                alt="Createvity App Dashboard Mockup"
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
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              A neat place to grow your thoughts.
            </h2>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
              Write down your raw thoughts instantly, make them better with fun exercises, and save only the ones you love.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Block 1: Capture Bar */}
            <div className="md:col-span-2 rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 hover:border-zinc-800/80 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-40 w-40 bg-zinc-800/5 rounded-full blur-3xl pointer-events-none group-hover:bg-zinc-800/10 transition-all duration-500" />
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white mb-6">
                <Lightbulb className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">Quick Typing Bar</h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-md">
                Thoughts disappear fast. Type them in instantly to save them right away. Your drafts are kept completely private to you.
              </p>
            </div>

            {/* Bento Block 2: Privacy */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 hover:border-zinc-800/80 transition-all duration-300 relative overflow-hidden group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white mb-6">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">Total Privacy</h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                Your ideas belong to you. Your drafts, notes, and brainstorms are stored safely and privately. Nothing is shared with anyone else unless you want to.
              </p>
            </div>

            {/* Bento Block 3: Walk Protocol */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 hover:border-zinc-800/80 transition-all duration-300 relative overflow-hidden group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white mb-6">
                <Footprints className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">Brain-Walk Timer</h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                Walking makes your brain work 60% better. Start the timer, go for a quick walk, and write down your best thoughts when you return.
              </p>
            </div>

            {/* Bento Block 4: SCAMPER Prompts */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 hover:border-zinc-800/80 transition-all duration-300 relative overflow-hidden group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white mb-6">
                <Shuffle className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">Brainstorm Tricks</h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                Stuck on an idea? Use simple word prompts to change, mix, or rearrange things. It’s like a puzzle helper for your thoughts.
              </p>
            </div>

            {/* Bento Block 5: Converge */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 hover:border-zinc-800/80 transition-all duration-300 relative overflow-hidden group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white mb-6">
                <Scale className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">Pick the Winners</h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                {"It's"} easy to make up ideas, but hard to choose the best ones. Score and clean up your list to find the absolute best ones to build.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Onchain Proofs Section */}
      <section id="onchain" className="py-20 border-t border-zinc-900 bg-[#030303]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-400 mb-6 border border-zinc-800">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Digital Stamp</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl leading-tight font-serif font-normal">
                Prove it was your idea first.
              </h2>
              <p className="mt-6 text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
                When you are ready, Createvity makes a unique digital code for your work (like a digital fingerprint of your title and link).
              </p>
              <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
                This registers a public, timestamped digital receipt. Anyone can verify you had this exact idea at this exact time, without you ever having to show them your private notes.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-zinc-900/60 pt-8">
                <div>
                  <p className="text-2xl font-bold text-white font-sans">100%</p>
                  <p className="mt-1 text-xs text-zinc-500 font-sans">Draft Privacy Guarded</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-zinc-300 font-sans">Unique</p>
                  <p className="mt-1 text-xs text-zinc-500 font-sans">Digital Fingerprints</p>
                </div>
              </div>
            </div>

            {/* Visual Cryptography Hash Panel */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-6 font-mono text-xs text-zinc-400 relative overflow-hidden">
              <div className="absolute top-2 right-2 flex gap-1">
                <span className="h-2 w-2 rounded-full bg-zinc-800" />
                <span className="h-2 w-2 rounded-full bg-zinc-800" />
                <span className="h-2 w-2 rounded-full bg-zinc-800" />
              </div>
              
              <div className="border-b border-zinc-900 pb-3 mb-4">
                <p className="text-zinc-500">{"// Creating a unique fingerprint for your idea"}</p>
              </div>

              <div className="space-y-4 font-sans">
                <div className="font-mono">
                  <p className="text-zinc-400">const ideaData = &#123;</p>
                  <p className="pl-4">id: <span className="text-zinc-300">&quot;idea_d8c973a2&quot;</span>,</p>
                  <p className="pl-4">title: <span className="text-zinc-300">&quot;New Art Idea&quot;</span>,</p>
                  <p className="pl-4">link: <span className="text-zinc-300">&quot;https://mywork.com&quot;</span></p>
                  <p className="text-zinc-400">&#125;;</p>
                </div>

                <div className="font-mono">
                  <p className="text-zinc-500">{"// Compute fingerprint locally"}</p>
                  <p className="text-zinc-400">
                    const fingerprint = hash(
                  </p>
                  <p className="pl-4 text-zinc-300">
                    ideaData.id + ideaData.title + ideaData.link
                  </p>
                  <p className="text-zinc-400">);</p>
                </div>

                <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80 font-mono">
                  <p className="text-zinc-500">{"// Resulting Unique Fingerprint:"}</p>
                  <p className="text-zinc-200 mt-1 break-all select-all selection:bg-zinc-800">
                    0x937f2e86d26c59b207559195b058097b6ec34d284a14b9a3f2d655f47514f9g8
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-zinc-400 bg-zinc-900/20 border border-zinc-800/50 p-2 rounded-lg font-sans">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-zinc-500" />
                  </span>
                  <span>Saved successfully</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contract & Explorer Section */}
      <section id="contract" className="py-20 border-t border-zinc-900 bg-zinc-950/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
            <div className="absolute top-0 left-0 h-full w-2 bg-gradient-to-b from-white to-zinc-800" />
            
            <div className="space-y-3">
              <span className="inline-block badge bg-zinc-900 text-zinc-400 border border-zinc-800 font-sans">
                Secure Registry
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-serif font-normal">
                Verified Registry
              </h2>
              <p className="text-sm text-zinc-400 max-w-xl leading-relaxed font-sans">
                A secure public registry. You can inspect the code directly or view existing receipts on the block explorer.
              </p>
              
              {/* Address display */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <div className="rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs sm:text-sm text-zinc-200 border border-zinc-800 flex items-center gap-3">
                  <span className="select-all">{contractAddress}</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none cursor-pointer"
                    title="Copy Address"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-white animate-scale" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a
                href={`https://testnet.monadvision.com/address/${contractAddress}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 px-6 text-sm font-semibold transition-all duration-200"
              >
                <span>View Explorer</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-[#030303] py-12 text-center text-xs text-zinc-500">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="font-semibold text-zinc-400">Createvity Boost</p>
          <p>
            An open source project built for BuildAnything Spark. Distributed under the MIT License.
          </p>
          <div className="flex justify-center gap-4 text-zinc-400 pt-2">
            <a href="https://monad.xyz" target="_blank" rel="noreferrer" className="hover:underline">Monad Network</a>
            <span>•</span>
            <a href="https://buildanything.so" target="_blank" rel="noreferrer" className="hover:underline">BuildAnything Spark</a>
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
