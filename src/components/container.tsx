import React, { useRef, useState } from "react";
import { X } from "lucide-react";
import { imagePairs } from "../data/pairs";
import "../App.css";

const ANIMATION_DURATION = 2000; // ms
const FLIP_TO_BACK_FRACTION = 0.25; // when cards are fully back-side up

// Configure which card is the deepfake and why, per pair index
// fakeIndex: 0 = left image, 1 = right image
const deepfakeMeta: { fakeIndex: number; reason: string }[] = [
    {
        // Pair 1
        fakeIndex: 0,
        reason:
        "Notice how the hairline starts in an unnatural place, there are lots of hairs floating around that don't seem to come from anywhere, and her neck is quite unnaturally long.",
    },
    {
        // Pair 2
        fakeIndex: 0,
        reason:
        "Notice how the image on the left has two colors of eyebrows, among other things.",
    },
    {
        // Pair 3
        fakeIndex: 0,
        reason:
        "Notice how the earring of the woman on the left is positioned in a very unusual manner in her earlobe..",
    },
    {
        // Pair 4
        fakeIndex: 0,
        reason:
        "Notice how the nose piercing of the woman on the right does not go into her nose; an earring is missing.",
    },
    {
        // Pair 5
        fakeIndex: 0,
        reason:
        "Notice how the woman's shoulder is unnaturally high and very asymmetrical, her arm does not extend properly behind her leg. Her leg stops abruptly. A thumb is growing out of her wrist.",
    },
    {
        // Pair 6
        fakeIndex: 0,
        reason:
        "",
    },
];

const Container: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const boxRef = useRef<(HTMLDivElement | null)[]>([]);
    const [pairIndex, setPairIndex] = useState(0);

    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackTitle, setFeedbackTitle] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const handleFlip = () => {
        const container = containerRef.current;
        if (!container) return;

        // const { x, y, height, width } = container.getBoundingClientRect();
        // const targetX = x + width / 2;
        // const targetY = y + height / 2;

        // Run flip animation on both cards
        boxRef.current.forEach((item) => {
            if (!item) return;
            //   const {
            //     x: childX,
            //     y: childY,
            //     height: childHeight,
            //     width: childWidth,
            //   } = item.getBoundingClientRect();

            //   const distanceX = childX + childWidth / 2;
            //   const distanceY = childY + childHeight / 2;

            //   const dx = targetX - distanceX;
            //   const dy = targetY - distanceY;

            // 0.00 → 0.25 : flip front → back (0 → 180deg)
            // 0.25 → 0.70 : shuffle while card stays back-side up
            // 0.70 → 1.00 : flip back → front (180 → 360deg)
            item.animate(
                [
                {
                    transform: "translate3d(0,0,0) rotateY(0deg)",
                    offset: 0,
                },
                {
                    transform: "translate3d(0,0,0) rotateY(180deg)",
                    offset: 0.25,
                },
                //   {
                //     transform: `translate3d(${dx}px, ${dy}px, 0) rotateY(180deg)`,
                //     offset: 0.5,
                //   },
                {
                    transform: "translate3d(0,0,0) rotateY(180deg)",
                    offset: 0.75,
                },
                {
                    transform: "translate3d(0,0,0) rotateY(360deg)",
                    offset: 1,
                },
                ],
                {
                    duration: ANIMATION_DURATION,
                }
            );
        });

        // After cards are flipped to the back (at 25% of animation),
        // update to the next image pair.
        const flipToBackTime = ANIMATION_DURATION * FLIP_TO_BACK_FRACTION;
        window.setTimeout(() => {
        setPairIndex((prev) => (prev + 1) % imagePairs.length);
        setShowFeedback(false); // hide any old feedback for the new pair
        }, flipToBackTime);

        setShowFeedback(false);
    };

    const handleCardClick = (cardIndex: number) => {
        const meta = deepfakeMeta[pairIndex];

        // If we don't have meta for this pair, just show a generic message
        if (!meta) {
        setFeedbackTitle("Deepfake clue");
        setFeedbackMessage(
            "Look closely at skin texture, lighting, and edges of the face and hair. Small inconsistencies often reveal a deepfake."
        );
        setShowFeedback(true);
        window.setTimeout(() => setShowFeedback(false), 6000);
        return;
        }

        const isDeepfake = cardIndex === meta.fakeIndex;

        setFeedbackTitle(
        isDeepfake ? "Correct – this one is the deepfake." : "This one is likely real."
        );

        setFeedbackMessage(
        isDeepfake
            ? meta.reason
            : `Compare this with the other image: ${meta.reason}`
        );

        setShowFeedback(true);
    };

    return (
        <section className="min-h-screen w-full overflow-x-hidden flex flex-col items-center justify-center bg-slate-950 text-slate-50 gap-8 px-4 py-10 relative"
        style={{
          backgroundImage:
            "radial-gradient(1200px 600px at 20% -10%, rgba(227,6,19,0.25), transparent 60%), radial-gradient(800px 500px at 90% 110%, rgba(227,6,19,0.18), transparent 55%)",
        }}>
        <h1 className="px-6 py-2 rounded-full border border-red-500 tracking-[0.25em] uppercase font-semiboldbg-transparent transition duration-150 font-bold">
            Which one is the deepfake?
        </h1>

        <div
            ref={containerRef}
            className="mt-1 grid grid-cols-2 gap-10 w-full max-w-5xl"
        >
            {Array.from({ length: 2 }).map((_, index) => {
            const pair = imagePairs[pairIndex] || [];
            const src = pair[index] || pair[0] || "";

            return (
                <div
                key={index}
                className="h-[80vh] w-full max-w-120 mx-auto perspective-[1000px] flex items-center justify-center overflow-hidden"
                >
                <div
                    ref={(el) => {
                    boxRef.current[index] = el;
                    }}
                    className="flip-card-inner rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.9)] w-full h-full"
                >
                    {/* FRONT */}
                    <div
                    className="flip-card-front flex items-center bg-center justify-center rounded-xl
                                bg-slate-900/70 border border-slate-600
                                overflow-hidden"
                    >
                    <button
                        type="button"
                        onClick={() => handleCardClick(index)}
                        className="w-full h-full overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                    >
                        <img
                        className="w-full h-full object-cover block"
                        src={src}
                        alt={`Card ${index + 1}`}
                        />
                    </button>
                    </div>

                    {/* BACK */}
                    <div
                    className="flip-card-back flex items-center justify-center rounded-xl
                                border bg-black border-red-500
                                text-3xl font-bold text-red-400"
                                style={{
                                    backgroundImage:
                                    "radial-gradient(1200px 600px at 20% -10%, rgba(227,6,19,0.25), transparent 60%), radial-gradient(800px 500px at 90% 110%, rgba(227,6,19,0.18), transparent 55%)",
                                }}
                    >
                    <img
                        className="flex scale-105 justify-center items-center"
                        src="./logo-icon.png"
                        alt="Phantom's Lab"
                    />
                    </div>
                </div>
                </div>
            );
            })}
        </div>

        {/* BOTTOM POP-UP FEEDBACK */}
        {feedbackMessage && (
            <div
                className={`fixed bottom-4 left-1/2 -translate-x-1/2 max-w-xl w-[calc(100%-2rem)] sm:w-lg
                            rounded-xl border border-red-500 bg-slate-900/95 text-slate-50
                            shadow-[0_0_25px_rgba(239,68,68,0.6)] px-4 py-3 text-sm
                            transition-all duration-300
                            ${showFeedback ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4"}`}
            >
                {/* Make the whole popup a column */}
                <div className="flex flex-col gap-3">
                    {/* Top row: text + close button */}
                    <div className="flex items-start justify-between gap-3">
                        <div>
                        <p className="text-[0.6rem] uppercase tracking-[0.25em] text-red-400 mb-1">
                            Deepfake feedback
                        </p>
                        {feedbackTitle && (
                            <p className="font-semibold text-xs sm:text-sm mb-1">
                            {feedbackTitle}
                            </p>
                        )}
                        <p className="text-xs sm:text-sm text-slate-200">
                            {feedbackMessage}
                        </p>
                        </div>
                        <button
                        type="button"
                        onClick={() => setShowFeedback(false)}
                        className="ml-2 text-xs text-slate-400 hover:text-slate-100"
                        >
                        <X size={16} />
                        </button>
                    </div>

                    {/* Bottom row: Next button aligned to the right */}
                    <div className="flex justify-end">
                        <button
                        type="button"
                        onClick={() => {
                            handleFlip();
                        }}
                        className="px-4 py-1 rounded-full border border-red-500 text-[0.7rem] uppercase tracking-[0.18em]
                                    text-slate-200 hover:bg-red-500/10 hover:text-red-300 transition"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        )}
    </section>
  );
};

export default Container;
