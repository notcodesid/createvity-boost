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
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1 text-xs font-medium text-zinc-400 mb-6">
            <Zap className="h-3 w-3 text-zinc-400" />
            <span>Built for Monad — 10k TPS, sub-second finality</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1] max-w-4xl mx-auto">
            Diverge locally. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
              Converge onchain.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            A research-backed OS for creative flow. Run walking protocols, SCAMPER brainstorming, and diverge/converge ideation. Record your work verifiably on Monad.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/api/auth/google"
              className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-zinc-950 hover:bg-zinc-200 active:scale-[0.98] transition-all duration-200"
            >
              Start Brainstorming
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contract"
              className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 px-6 text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100 hover:border-zinc-700 transition-all duration-200"
            >
              Verify Smart Contract
            </a>
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
              A workspace tuned for creative momentum.
            </h2>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
              We separate idea generation from evaluation. Capture wild sparks offchain, process them locally, and sign only what matters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Block 1: Capture Bar */}
            <div className="md:col-span-2 rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 hover:border-zinc-800/80 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-40 w-40 bg-zinc-800/5 rounded-full blur-3xl pointer-events-none group-hover:bg-zinc-800/10 transition-all duration-500" />
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white mb-6">
                <Lightbulb className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">Instant Capture Bar</h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-md">
                Fleeting thoughts evaporate in minutes. Type directly into the global capture input. Ideas are structured and saved instantly in a local offchain SQLite database, keeping your raw drafts 100% private.
              </p>
            </div>

            {/* Bento Block 2: Privacy */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 hover:border-zinc-800/80 transition-all duration-300 relative overflow-hidden group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white mb-6">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">Draft Privacy</h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                Your brainstorms are your competitive advantage. Keep draft bodies, notes, and session logs offchain and protected. No public records until you decide to ship.
              </p>
            </div>

            {/* Bento Block 3: Walk Protocol */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 hover:border-zinc-800/80 transition-all duration-300 relative overflow-hidden group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white mb-6">
                <Footprints className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">Walk Protocol</h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                Science shows walking boosts creative output by 60%. Trigger the built-in timer, leave the screen behind, and log your breakthroughs as soon as you step back inside the studio.
              </p>
            </div>

            {/* Bento Block 4: SCAMPER Prompts */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 hover:border-zinc-800/80 transition-all duration-300 relative overflow-hidden group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white mb-6">
                <Shuffle className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">SCAMPER Framework</h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                Stuck on a design? Apply the seven prompts: Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Rearrange. Spin out new iterations of your current ideas dynamically.
              </p>
            </div>

            {/* Bento Block 5: Converge */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 hover:border-zinc-800/80 transition-all duration-300 relative overflow-hidden group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white mb-6">
                <Scale className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">Converge & Prune</h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                Generation is easy; selection is hard. Enter Converge mode to grade, prioritize, and prune your ideas. Keep the viable gems, kill the distractions, and ship the winners.
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
                <span>Onchain Receipts</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl leading-tight">
                Verifiable proofs of work. Published on Monad.
              </h2>
              <p className="mt-6 text-zinc-400 text-sm sm:text-base leading-relaxed">
                When you ship, Createvity generates a client-side cryptographically secure content hash of your work (combining your local idea ID, title, and link). 
              </p>
              <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
                By calling `ShipReceipt.ship()`, your wallet registers a public, timestamped, append-only receipt. Anyone can verify you held this exact content at this exact time, without revealing your private drafts.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-zinc-900/60 pt-8">
                <div>
                  <p className="text-2xl font-bold text-white">100%</p>
                  <p className="mt-1 text-xs text-zinc-500">Draft Privacy Guarded</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-zinc-300">Keccak256</p>
                  <p className="mt-1 text-xs text-zinc-500">Onchain Content Hashes</p>
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
                <p className="text-zinc-500">{"// Cryptographic Content Hash Generation"}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-zinc-400">const ideaData = &#123;</p>
                  <p className="pl-4">id: <span className="text-zinc-300">&quot;idea_d8c973a2&quot;</span>,</p>
                  <p className="pl-4">title: <span className="text-zinc-300">&quot;Decentralized Art Collective&quot;</span>,</p>
                  <p className="pl-4">link: <span className="text-zinc-300">&quot;https://github.com/createvity&quot;</span></p>
                  <p className="text-zinc-400">&#125;;</p>
                </div>

                <div>
                  <p className="text-zinc-500">{"// Compute fingerprint locally (in browser)"}</p>
                  <p className="text-zinc-400">
                    const contentHash = keccak256(
                  </p>
                  <p className="pl-4 text-zinc-300">
                    encodePacked(ideaData.id, ideaData.title, ideaData.link)
                  </p>
                  <p className="text-zinc-400">);</p>
                </div>

                <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/80">
                  <p className="text-zinc-500">{"// Resulting Hash submitted to Monad:"}</p>
                  <p className="text-zinc-200 mt-1 break-all select-all selection:bg-zinc-800">
                    0x937f2e86d26c59b207559195b058097b6ec34d284a14b9a3f2d655f47514f9g8
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-zinc-400 bg-zinc-900/20 border border-zinc-800/50 p-2 rounded-lg">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-zinc-500" />
                  </span>
                  <span>Transaction Successful on Monad Testnet</span>
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
                Monad Testnet Deployment
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                ShipReceipt Contract
              </h2>
              <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
                An append-only smart registry deployed on Monad. You can interact with the verified code directly or inspect existing creativity receipts on the block explorer.
              </p>
              
              {/* Address display */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <div className="rounded-lg bg-zinc-900 px-3 py-2 font-mono text-xs sm:text-sm text-zinc-200 border border-zinc-800 flex items-center gap-3">
                  <span className="select-all">{contractAddress}</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none cursor-pointer"
                    title="Copy Contract Address"
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
                <span>MonadVision Explorer</span>
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
