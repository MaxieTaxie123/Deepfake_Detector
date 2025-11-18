// src/components/Summary.tsx

import React from "react";
import { imagePairs } from "../data/pairs";
import { deepfakeMeta } from "../data/deepfakeMeta";

type SummaryProps = {
  onBack?: () => void;
};

const Summary: React.FC<SummaryProps> = ({ onBack }) => {
  return (
    <section
      className="min-h-screen w-full flex items-start justify-center bg-slate-950 text-slate-50 px-4 py-8 select-none"
      style={{
        backgroundImage:
          "radial-gradient(1200px 600px at 20% -10%, rgba(227,6,19,0.25), transparent 60%), radial-gradient(800px 500px at 90% 110%, rgba(227,6,19,0.18), transparent 55%)",
      }}
    >
      <div className="w-full max-w-6xl flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col gap-2">
            <div className="rounded-full border border-red-500/60 bg-black/40 px-5 py-1 inline-flex">
              <p className="text-[0.55rem] tracking-[0.35em] uppercase text-red-400 font-sharetech">
                Phantom&apos;s Lab — Deepfake Detector
              </p>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-red-500 font-sharetech tracking-[0.25em] uppercase">
              Deepfake summary & explanations
            </h1>
            <p className="text-xs md:text-sm text-slate-300 font-sharetech max-w-2xl">
              Below is an overview of all image pairs used in this training. For each pair,
              you can see which image was the deepfake and what visual clues give it away.
            </p>
          </div>

          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="px-5 py-2 rounded-full border border-red-500 text-[0.7rem] tracking-[0.25em] uppercase font-semibold font-sharetech
                         bg-black/40 text-red-300 hover:bg-red-500/10 hover:text-red-100
                         hover:shadow-[0_0_25px_rgba(248,113,113,0.7)] transition"
            >
              Back to training
            </button>
          )}
        </div>

        {/* Content list */}
        <div className="mt-2 space-y-6 overflow-y-auto max-h-[calc(100vh-9rem)] pr-2">
          {imagePairs.map((pair, index) => {
            const meta = deepfakeMeta[index];
            const fakeIndex = meta?.fakeIndex ?? 0;
            const reason =
              meta?.reason ||
              "No specific explanation provided for this pair yet.";

            const imageA = pair[0];
            const imageB = pair[1] ?? pair[0];

            return (
              <div
                key={index}
                className="rounded-2xl border border-red-900/50 bg-[#050610]/90 shadow-[0_0_20px_rgba(0,0,0,0.7)] p-4 md:p-5"
              >
                {/* Pair header */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center rounded-full border border-red-500/70 bg-black/60 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-red-300 font-sharetech">
                      Pair {index + 1}
                    </span>
                  </div>
                </div>

                {/* Images row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  {/* Image A */}
                  <div className="relative md:h-52 rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/70">
                    <img
                      src={imageA}
                      alt={`Pair ${index + 1} - Image A`}
                      className="w-full h-full object-cover"
                    />
                    {fakeIndex === 0 && (
                      <div className="absolute right-3 top-3 rounded-full bg-red-500/80 px-3 py-0.5 shadow-[0_0_12px_rgba(248,113,113,0.8)]">
                        <span className="text-[0.6rem] uppercase tracking-[0.18em] font-sharetech text-black flex items-center">
                          Deepfake
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Image B */}
                  <div className="relative h-44 md:h-52 rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/70">
                    <img
                      src={imageB}
                      alt={`Pair ${index + 1} - Image B`}
                      className="w-full h-full object-cover"
                    />
                    {fakeIndex === 1 && (
                      <div className="absolute right-3 top-3 rounded-full bg-red-500/80 px-3 py-0.5 shadow-[0_0_12px_rgba(248,113,113,0.8)]">
                        <span className="text-[0.6rem] uppercase tracking-[0.18em] font-sharetech text-black">
                          Deepfake
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Explanation */}
                <div className="border-t border-slate-700/70 pt-3">
                  <p className="text-[0.6rem] uppercase tracking-[0.25em] text-red-400 font-sharetech mb-1">
                    Why this is a deepfake
                  </p>
                  <p className="text-xs md:text-sm text-slate-200 font-sharetech leading-relaxed">
                    {reason}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Summary;
