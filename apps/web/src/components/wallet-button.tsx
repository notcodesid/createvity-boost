"use client";
 
import { useState } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { useSession } from "@/hooks/use-session";
import { monadTestnet } from "@/lib/wagmi";
 
function shortAddr(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}
 
export function WalletButton() {
  const { user, logout } = useSession();
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: switching } = useSwitchChain();
  const [menuOpen, setMenuOpen] = useState(false);
 
  const wrongChain = isConnected && chainId !== monadTestnet.id;
 
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        className="h-8 w-8 rounded-full border border-zinc-800 overflow-hidden hover:border-zinc-700 active:scale-95 transition-all flex items-center justify-center bg-zinc-900 focus:outline-none cursor-pointer"
      >
        {user?.picture ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={user.picture}
            alt={user.name ?? "Profile"}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-[12px] font-semibold text-zinc-300 font-sans">
            {user?.name?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? "U"}
          </span>
        )}
      </button>
 
      {menuOpen && (
        <>
          {/* Click backdrop to close */}
          <div
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setMenuOpen(false)}
          />
          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-64 bg-zinc-950 border border-zinc-800 rounded-none shadow-2xl py-3.5 px-4 z-50 text-left">
            {/* User Profile Info */}
            <div className="space-y-1 pb-2.5">
              <span className="text-[10px] text-zinc-500 font-sans tracking-wide uppercase block">
                Signed in as
              </span>
              {user?.name && (
                <p className="text-sm font-semibold text-white truncate font-sans">
                  {user.name}
                </p>
              )}
              <p className="text-xs text-zinc-400 font-mono truncate">
                {user?.email}
              </p>
            </div>
 
            <div className="border-t border-zinc-900 my-2.5" />
 
            {/* Web3 Wallet Section */}
            <div className="space-y-2 pb-2">
              <span className="text-[10px] text-zinc-500 font-sans tracking-wide uppercase block">
                Onchain Wallet
              </span>
              {isConnected && address ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-zinc-300">
                      {shortAddr(address)}
                    </span>
                    {wrongChain ? (
                      <span className="badge bg-red-950/20 text-red-400 border border-red-900/50">Wrong Chain</span>
                    ) : (
                      <span className="badge bg-emerald-950/20 text-emerald-400 border border-emerald-900/50">Monad</span>
                    )}
                  </div>
                  {wrongChain ? (
                    <button
                      type="button"
                      className="w-full btn-accent text-[11px] py-1 h-8 justify-center items-center"
                      disabled={switching}
                      onClick={() => switchChain({ chainId: monadTestnet.id })}
                    >
                      {switching ? "Switching…" : "Switch to Monad"}
                    </button>
                  ) : null}
                  <button
                    type="button"
                    className="w-full btn-ghost text-[11px] py-1 h-8 justify-center items-center text-center"
                    onClick={() => disconnect()}
                  >
                    Disconnect Wallet
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="w-full btn-ghost text-[11px] py-1.5 h-8 justify-center items-center text-center"
                  disabled={isPending}
                  onClick={() => {
                    const injected =
                      connectors.find((c) => c.id === "injected") ?? connectors[0];
                    if (injected) connect({ connector: injected, chainId: monadTestnet.id });
                  }}
                >
                  {isPending ? "Connecting…" : "Connect wallet"}
                </button>
              )}
            </div>
 
            <div className="border-t border-zinc-900 my-2.5" />
 
            {/* Logout action */}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                void logout();
              }}
              className="w-full text-left text-xs text-red-400 hover:text-red-300 font-semibold py-1 transition-colors focus:outline-none cursor-pointer font-sans"
            >
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
