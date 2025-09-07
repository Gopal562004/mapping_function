// // "use client";
// // import React, { useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { generateQuiz, evaluateAnswers } from "@/actions/gemini_res";

// // export default function GeminiPage() {
// //   const [step, setStep] = useState("start"); // start | quiz | result
// //   const [quiz, setQuiz] = useState(null);
// //   const [answers, setAnswers] = useState({});
// //   const [result, setResult] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   // Track current question
// //   const [currentPart, setCurrentPart] = useState("partA");
// //   const [currentIndex, setCurrentIndex] = useState(0);

// //   // Loader component
// //   const Loader = ({ text }) => (
// //     <div className="flex flex-col items-center justify-center py-10">
// //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-300"></div>
// //       <p className="mt-4 text-gray-400">{text}</p>
// //     </div>
// //   );

// //   // Start quiz → fetch from Gemini
// //   const handleStart = async () => {
// //     setLoading(true);
// //     try {
// //       const q = await generateQuiz();
// //       setQuiz(q);
// //       setStep("quiz");
// //       setCurrentPart("partA");
// //       setCurrentIndex(0);
// //     } catch (err) {
// //       console.error("Error fetching quiz:", err);
// //     }
// //     setLoading(false);
// //   };

// //   // Record answer and auto-next
// //   const handleAnswer = (option) => {
// //     const currentQ =
// //       currentPart === "partA"
// //         ? quiz.partA[currentIndex]
// //         : quiz.partB[currentIndex];

// //     setAnswers((prev) => ({
// //       ...prev,
// //       [currentPart]: { ...prev[currentPart], [currentQ.id]: option },
// //     }));

// //     // Auto move to next
// //     setTimeout(() => {
// //       if (currentPart === "partA" && currentIndex < quiz.partA.length - 1) {
// //         setCurrentIndex((prev) => prev + 1);
// //       } else if (
// //         currentPart === "partA" &&
// //         currentIndex === quiz.partA.length - 1
// //       ) {
// //         setCurrentPart("partB");
// //         setCurrentIndex(0);
// //       } else if (
// //         currentPart === "partB" &&
// //         currentIndex < quiz.partB.length - 1
// //       ) {
// //         setCurrentIndex((prev) => prev + 1);
// //       } else {
// //         handleSubmit(); // End of quiz
// //       }
// //     }, 50); // slight delay for animation
// //   };

// //   // Previous question
// //   const handlePrev = () => {
// //     if (currentPart === "partB" && currentIndex === 0) {
// //       setCurrentPart("partA");
// //       setCurrentIndex(quiz.partA.length - 1);
// //     } else if (currentIndex > 0) {
// //       setCurrentIndex((prev) => prev - 1);
// //     }
// //   };

// //   // Submit answers
// //   const handleSubmit = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await evaluateAnswers(answers);
// //       setResult(res);
// //       setStep("result");
// //     } catch (err) {
// //       console.error("Error evaluating:", err);
// //     }
// //     setLoading(false);
// //   };

// //   // Progress
// //   const totalQ = quiz ? quiz.partA.length + quiz.partB.length : 0;
// //   const answeredQ =
// //     (Object.values(answers.partA || {}).length || 0) +
// //     (Object.values(answers.partB || {}).length || 0);
// //   const progress = totalQ > 0 ? Math.round((answeredQ / totalQ) * 100) : 0;

// //   // Animation variants
// //   const variants = {
// //     enter: { opacity: 0, x: 50 },
// //     center: { opacity: 1, x: 0 },
// //     exit: { opacity: 0, x: -50 },
// //   };

// //   return (
// //     <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
// //       <div className="w-full max-w-3xl bg-zinc-900 shadow-2xl rounded-2xl p-8 transition duration-500">
// //         {/* Title */}
// //         <h1 className="text-3xl font-bold text-center mb-6">
// //           Career Guidance Quiz 🎓
// //         </h1>

// //         {/* Step 1: Start */}
// //         {step === "start" && (
// //           <div className="text-center">
// //             <p className="text-lg text-gray-400 mb-6">
// //               Discover your ideal IT career path based on your interests and
// //               aptitude.
// //             </p>
// //             <button
// //               onClick={handleStart}
// //               disabled={loading}
// //               className="px-8 py-3 bg-white text-black font-semibold rounded-xl shadow-md 
// //               hover:bg-gray-200 transition transform hover:scale-105"
// //             >
// //               {loading ? "Loading..." : "Start Quiz"}
// //             </button>
// //           </div>
// //         )}

// //         {/* Step 2: Quiz */}
// //         {step === "quiz" && quiz && (
// //           <>
// //             {loading && <Loader text="Loading quiz..." />}
// //             {!loading && (
// //               <div className="space-y-6">
// //                 {/* Progress Bar */}
// //                 <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden mb-6">
// //                   <div
// //                     className="bg-white h-3 transition-all duration-500"
// //                     style={{ width: `${progress}%` }}
// //                   ></div>
// //                 </div>
// //                 <p className="text-gray-400 text-sm text-right">
// //                   {answeredQ}/{totalQ} answered
// //                 </p>

// //                 {/* Current Question with animation */}
// //                 <AnimatePresence mode="wait">
// //                   <motion.div
// //                     key={`${currentPart}-${currentIndex}`}
// //                     variants={variants}
// //                     initial="enter"
// //                     animate="center"
// //                     exit="exit"
// //                     transition={{ duration: 0.3 }}
// //                     className="mb-6"
// //                   >
// //                     <h2 className="text-xl font-semibold mb-4">
// //                       {currentPart === "partA"
// //                         ? "Part A – Interest Mapping"
// //                         : "Part B – Aptitude & Awareness"}
// //                     </h2>
// //                     <p className="text-gray-200 mb-4">
// //                       {currentPart === "partA"
// //                         ? quiz.partA[currentIndex].question
// //                         : quiz.partB[currentIndex].question}
// //                     </p>

// //                     <div className="flex flex-col gap-3">
// //                       {(currentPart === "partA"
// //                         ? quiz.partA[currentIndex].options
// //                         : quiz.partB[currentIndex].options
// //                       ).map((opt, idx) => (
// //                         <button
// //                           key={idx}
// //                           onClick={() => handleAnswer(opt)}
// //                           className={`px-4 py-3 rounded-xl ${
// //                             answers[currentPart]?.[
// //                               currentPart === "partA"
// //                                 ? quiz.partA[currentIndex].id
// //                                 : quiz.partB[currentIndex].id
// //                             ] === opt
// //                               ? "bg-white text-black font-semibold"
// //                               : "bg-zinc-800 text-gray-200 hover:bg-white hover:text-black"
// //                           } transition-all duration-200 transform hover:scale-105`}
// //                         >
// //                           {opt}
// //                         </button>
// //                       ))}
// //                     </div>
// //                   </motion.div>
// //                 </AnimatePresence>

// //                 {/* Navigation */}
// //                 <div className="flex justify-between mt-6">
// //                   <button
// //                     onClick={handlePrev}
// //                     disabled={currentPart === "partA" && currentIndex === 0}
// //                     className="px-5 py-2 bg-zinc-800 text-gray-300 rounded-lg 
// //                     hover:bg-white hover:text-black transition disabled:opacity-40"
// //                   >
// //                     ← Previous
// //                   </button>
// //                   {/* Removed Next button */}
// //                 </div>
// //               </div>
// //             )}
// //           </>
// //         )}

// //         {/* Step 3: Result */}
// //         {step === "result" && result && (
// //           <>
// //             {loading && <Loader text="Evaluating your answers..." />}
// //             {!loading && (
// //               <motion.div
// //                 initial={{ opacity: 0, y: 30 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.5 }}
// //                 className="space-y-8"
// //               >
// //                 <h2 className="text-2xl font-bold text-gray-100 mb-4">
// //                   🎯 Your Career Path
// //                 </h2>
// //                 <p className="text-gray-400 mb-6">{result.summary}</p>

// //                 <div className="bg-zinc-800 p-5 rounded-xl border border-gray-700">
// //                   <h3 className="font-bold text-white mb-3">Top Fields</h3>
// //                   <ul className="list-disc list-inside space-y-1">
// //                     {result.topFields.map((field, idx) => (
// //                       <li key={idx} className="text-gray-300">
// //                         {field}
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>

// //                 <div className="bg-zinc-800 p-5 rounded-xl border border-gray-700">
// //                   <h3 className="font-bold text-white mb-3">Roadmaps</h3>
// //                   {Object.entries(result.roadmaps).map(([field, phases]) => (
// //                     <div key={field} className="mb-4">
// //                       <h4 className="text-lg font-semibold text-gray-100 mb-2">
// //                         {field}
// //                       </h4>
// //                       <ul className="list-decimal list-inside space-y-1 text-gray-300">
// //                         {phases.map((phase, idx) => (
// //                           <li key={idx}>{phase}</li>
// //                         ))}
// //                       </ul>
// //                     </div>
// //                   ))}
// //                 </div>

// //                 <div className="text-center">
// //                   <button
// //                     onClick={() => {
// //                       setStep("start");
// //                       setResult(null);
// //                       setQuiz(null);
// //                       setAnswers({});
// //                     }}
// //                     className="px-8 py-3 bg-white text-black font-semibold rounded-xl shadow-md 
// //                     hover:bg-gray-200 transition transform hover:scale-105"
// //                   >
// //                     Retake Quiz
// //                   </button>
// //                 </div>
// //               </motion.div>
// //             )}
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { generateQuiz, evaluateAnswers } from "@/actions/gemini_res";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   RadarChart,
//   Radar,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
// } from "recharts";

// export default function GeminiPage() {
//   const [step, setStep] = useState("start");
//   const [quiz, setQuiz] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [currentPart, setCurrentPart] = useState("partA");
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const Loader = ({ text }) => (
//     <div className="flex flex-col items-center justify-center py-10">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-300"></div>
//       <p className="mt-4 text-gray-400">{text}</p>
//     </div>
//   );

//   const handleStart = async () => {
//     setLoading(true);
//     try {
//       const q = await generateQuiz();
//       setQuiz(q);
//       setStep("quiz");
//       setCurrentPart("partA");
//       setCurrentIndex(0);
//     } catch (err) {
//       console.error("Error fetching quiz:", err);
//     }
//     setLoading(false);
//   };

//   const handleAnswer = (option) => {
//     const currentQ =
//       currentPart === "partA"
//         ? quiz.partA[currentIndex]
//         : quiz.partB[currentIndex];

//     setAnswers((prev) => ({
//       ...prev,
//       [currentPart]: { ...prev[currentPart], [currentQ.id]: option },
//     }));

//     setTimeout(() => {
//       if (currentPart === "partA" && currentIndex < quiz.partA.length - 1) {
//         setCurrentIndex((prev) => prev + 1);
//       } else if (
//         currentPart === "partA" &&
//         currentIndex === quiz.partA.length - 1
//       ) {
//         setCurrentPart("partB");
//         setCurrentIndex(0);
//       } else if (
//         currentPart === "partB" &&
//         currentIndex < quiz.partB.length - 1
//       ) {
//         setCurrentIndex((prev) => prev + 1);
//       } else {
//         handleSubmit();
//       }
//     }, 50);
//   };

//   const handlePrev = () => {
//     if (currentPart === "partB" && currentIndex === 0) {
//       setCurrentPart("partA");
//       setCurrentIndex(quiz.partA.length - 1);
//     } else if (currentIndex > 0) {
//       setCurrentIndex((prev) => prev - 1);
//     }
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const res = await evaluateAnswers(answers);
//       setResult(res);
//       setStep("result");
//     } catch (err) {
//       console.error("Error evaluating:", err);
//     }
//     setLoading(false);
//   };

//   const totalQ = quiz ? quiz.partA.length + quiz.partB.length : 0;
//   const answeredQ =
//     (Object.values(answers.partA || {}).length || 0) +
//     (Object.values(answers.partB || {}).length || 0);
//   const progress = totalQ > 0 ? Math.round((answeredQ / totalQ) * 100) : 0;

//   const variants = {
//     enter: { opacity: 0, x: 50 },
//     center: { opacity: 1, x: 0 },
//     exit: { opacity: 0, x: -50 },
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
//       <div className="w-full max-w-4xl bg-zinc-900 shadow-2xl rounded-2xl p-8 transition duration-500">
//         <h1 className="text-3xl font-bold text-center mb-6">
//           Career Guidance Quiz 🎓
//         </h1>

//         {/* Start */}
//         {step === "start" && (
//           <div className="text-center">
//             <p className="text-lg text-gray-400 mb-6">
//               Discover your ideal IT career path based on your interests and
//               aptitude.
//             </p>
//             <button
//               onClick={handleStart}
//               disabled={loading}
//               className="px-8 py-3 bg-white text-black font-semibold rounded-xl shadow-md hover:bg-gray-200 transition transform hover:scale-105"
//             >
//               {loading ? "Loading..." : "Start Quiz"}
//             </button>
//           </div>
//         )}

//         {/* Quiz */}
//         {step === "quiz" && quiz && (
//           <>
//             {loading && <Loader text="Loading quiz..." />}
//             {!loading && (
//               <div className="space-y-6">
//                 <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden mb-6">
//                   <div
//                     className="bg-white h-3 transition-all duration-500"
//                     style={{ width: `${progress}%` }}
//                   ></div>
//                 </div>
//                 <p className="text-gray-400 text-sm text-right">
//                   {answeredQ}/{totalQ} answered
//                 </p>

//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={`${currentPart}-${currentIndex}`}
//                     variants={variants}
//                     initial="enter"
//                     animate="center"
//                     exit="exit"
//                     transition={{ duration: 0.25 }}
//                     className="mb-6"
//                   >
//                     <h2 className="text-xl font-semibold mb-4">
//                       {currentPart === "partA"
//                         ? "Part A – Interest Mapping"
//                         : "Part B – Aptitude & Awareness"}
//                     </h2>
//                     <p className="text-gray-200 mb-4">
//                       {currentPart === "partA"
//                         ? quiz.partA[currentIndex].question
//                         : quiz.partB[currentIndex].question}
//                     </p>

//                     <div className="flex flex-col gap-3">
//                       {(currentPart === "partA"
//                         ? quiz.partA[currentIndex].options
//                         : quiz.partB[currentIndex].options
//                       ).map((opt, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => handleAnswer(opt)}
//                           className={`px-4 py-3 rounded-xl ${
//                             answers[currentPart]?.[
//                               currentPart === "partA"
//                                 ? quiz.partA[currentIndex].id
//                                 : quiz.partB[currentIndex].id
//                             ] === opt
//                               ? "bg-white text-black font-semibold"
//                               : "bg-zinc-800 text-gray-200 hover:bg-white hover:text-black"
//                           } transition-all duration-200 transform hover:scale-105`}
//                         >
//                           {opt}
//                         </button>
//                       ))}
//                     </div>
//                   </motion.div>
//                 </AnimatePresence>

//                 <div className="flex justify-between mt-6">
//                   <button
//                     onClick={handlePrev}
//                     disabled={currentPart === "partA" && currentIndex === 0}
//                     className="px-5 py-2 bg-zinc-800 text-gray-300 rounded-lg hover:bg-white hover:text-black transition disabled:opacity-40"
//                   >
//                     ← Previous
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}

//         {/* Result */}
//         {step === "result" && result && (
//           <>
//             {loading && <Loader text="Evaluating your answers..." />}
//             {!loading && (
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//                 className="space-y-8"
//               >
//                 <h2 className="text-2xl font-bold text-gray-100 mb-4">
//                   🎯 Your Career Path
//                 </h2>
//                 <p className="text-gray-400 mb-6">{result.summary}</p>

//                 {/* Chart for Top Fields */}
//                 <div className="bg-zinc-800 p-5 rounded-xl border border-gray-700">
//                   <h3 className="font-bold text-white mb-4">
//                     Top Fields (Visual)
//                   </h3>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <RadarChart
//                       data={result.topFields.map((f) => ({
//                         field: f,
//                         score: 90,
//                       }))}
//                     >
//                       <PolarGrid />
//                       <PolarAngleAxis dataKey="field" />
//                       <PolarRadiusAxis />
//                       <Radar
//                         name="Suitability"
//                         dataKey="score"
//                         stroke="#fff"
//                         fill="#fff"
//                         fillOpacity={0.4}
//                       />
//                       <Tooltip />
//                     </RadarChart>
//                   </ResponsiveContainer>
//                 </div>

//                 {/* Roadmap as Flow Timeline */}
//                 <div className="bg-zinc-800 p-5 rounded-xl border border-gray-700">
//                   <h3 className="font-bold text-white mb-4">
//                     Learning Roadmap
//                   </h3>
//                   {Object.entries(result.roadmaps).map(([field, phases]) => (
//                     <div key={field} className="mb-6">
//                       <h4 className="text-lg font-semibold text-gray-100 mb-2">
//                         {field}
//                       </h4>
//                       <div className="relative border-l-2 border-gray-600 ml-4">
//                         {phases.map((phase, idx) => (
//                           <motion.div
//                             key={idx}
//                             initial={{ opacity: 0, x: -30 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: idx * 0.2 }}
//                             className="mb-6 ml-4"
//                           >
//                             <div className="w-3 h-3 bg-white rounded-full absolute -left-1.5 mt-2"></div>
//                             <p className="text-gray-300">{phase}</p>
//                           </motion.div>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="text-center">
//                   <button
//                     onClick={() => {
//                       setStep("start");
//                       setResult(null);
//                       setQuiz(null);
//                       setAnswers({});
//                     }}
//                     className="px-8 py-3 bg-white text-black font-semibold rounded-xl shadow-md hover:bg-gray-200 transition transform hover:scale-105"
//                   >
//                     Retake Quiz
//                   </button>
//                 </div>
//               </motion.div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateQuiz, evaluateAnswers } from "@/actions/gemini_res";
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  BookOpen,
  Cpu,
  FlaskConical,
  Rocket,
  Trophy,
  ArrowLeft,
} from "lucide-react";

/* ------------------------------ helpers ------------------------------ */

// normalize roadmap phases (Gemini may return strings OR {phase, details})
function normalizePhases(phases) {
  return (phases || []).map((p, i) => {
    if (typeof p === "string") {
      // try to split "Phase X: Title — details"
      const [titlePart, ...rest] = p.split(":");
      const title =
        p.toLowerCase().includes("phase") && titlePart ? p : `Phase ${i + 1}`;
      const details =
        p.toLowerCase().includes("phase") && p.includes(":")
          ? p.split(":").slice(1).join(":").trim()
          : p;
      return {
        id: `phase-${i + 1}`,
        phase: title.trim(),
        details: details.trim(),
      };
    }
    // already structured
    return {
      id: p.id || `phase-${i + 1}`,
      phase: p.phase || `Phase ${i + 1}`,
      details: p.details || "",
    };
  });
}

function getPhaseIcon(idx) {
  const icons = [BookOpen, Cpu, FlaskConical, Rocket, Trophy];
  return icons[idx % icons.length];
}

function buildFlowFromPhases(phases) {
  const norm = normalizePhases(phases);
  const gapX = 320;
  const startX = 50;
  const y = 80;

  const nodes = norm.map((p, idx) => {
    const Icon = getPhaseIcon(idx);
    return {
      id: p.id,
      position: { x: startX + idx * gapX, y },
      data: { label: p.phase, details: p.details, Icon },
      type: "default",
      style: {
        padding: 12,
        width: 280,
        borderRadius: 16,
        background:
          "linear-gradient(180deg, rgba(39,39,42,1) 0%, rgba(24,24,27,1) 100%)",
        border: "1px solid #3f3f46",
        color: "#fafafa",
        boxShadow:
          "0 10px 25px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
      },
    };
  });

  const edges = norm.slice(0, -1).map((p, idx) => ({
    id: `e-${p.id}-${norm[idx + 1].id}`,
    source: p.id,
    target: norm[idx + 1].id,
    animated: true,
    type: "smoothstep",
    style: { stroke: "#a855f7" },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#a855f7",
    },
  }));

  return { nodes, edges, normalized: norm };
}

/* ------------------------------ UI bits ------------------------------ */

const Loader = ({ text = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center py-16">
    <div className="h-12 w-12 rounded-full border-2 border-zinc-700 border-t-white animate-spin" />
    <p className="mt-4 text-zinc-400">{text}</p>
  </div>
);

const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-2xl ${className}`}
  >
    {children}
  </div>
);

const SectionTitle = ({ children }) => (
  <h3 className="text-lg font-semibold tracking-tight text-zinc-100">
    {children}
  </h3>
);

/* ------------------------------ main page ------------------------------ */

export default function GeminiPage() {
  const [step, setStep] = useState("start"); // start | quiz | result
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // quiz navigation
  const [currentPart, setCurrentPart] = useState("partA");
  const [currentIndex, setCurrentIndex] = useState(0);

  // result UI
  const [selectedField, setSelectedField] = useState(null);

  const totalQ = quiz
    ? (quiz.partA?.length || 0) + (quiz.partB?.length || 0)
    : 0;
  const answeredQ =
    (Object.values(answers.partA || {}).length || 0) +
    (Object.values(answers.partB || {}).length || 0);
  const progress = totalQ > 0 ? Math.round((answeredQ / totalQ) * 100) : 0;

  // Start quiz
  const handleStart = async () => {
    setLoading(true);
    try {
      const q = await generateQuiz();
      setQuiz(q);
      setStep("quiz");
      setCurrentPart("partA");
      setCurrentIndex(0);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Answer + auto-next
  const handleAnswer = (option) => {
    const q =
      currentPart === "partA"
        ? quiz.partA[currentIndex]
        : quiz.partB[currentIndex];

    setAnswers((prev) => ({
      ...prev,
      [currentPart]: { ...(prev[currentPart] || {}), [q.id]: option },
    }));

    setTimeout(() => {
      if (currentPart === "partA" && currentIndex < quiz.partA.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else if (currentPart === "partA") {
        setCurrentPart("partB");
        setCurrentIndex(0);
      } else if (currentIndex < quiz.partB.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        handleSubmit();
      }
    }, 120);
  };

  // Prev
  const handlePrev = () => {
    if (currentPart === "partB" && currentIndex === 0) {
      setCurrentPart("partA");
      setCurrentIndex(quiz.partA.length - 1);
    } else if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  // Submit to Gemini
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await evaluateAnswers(answers);
      setResult(res);
      setSelectedField(res?.topFields?.[0] || null);
      setStep("result");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Radar data (fake 100/90/80 ladder so chart looks nice visually)
  const radarData = useMemo(() => {
    if (!result?.topFields) return [];
    const base = [92, 86, 80, 74, 68];
    return result.topFields.map((field, i) => ({
      field,
      score: base[i] ?? 65,
    }));
  }, [result]);

  // Flow data for selected field
  const { nodes, edges } = useMemo(() => {
    if (!result?.roadmaps || !selectedField) return { nodes: [], edges: [] };
    const phases = result.roadmaps[selectedField] || [];
    return buildFlowFromPhases(phases);
  }, [result, selectedField]);

  // animation variants
  const qVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center text-4xl font-bold tracking-tight"
        >
          Career Guidance Quiz <span className="text-zinc-400">🎓</span>
        </motion.h1>

        {/* START */}
        {step === "start" && (
          <Card className="p-10 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mx-auto mb-8 max-w-2xl text-zinc-400"
            >
              Discover your ideal IT career path based on your{" "}
              <span className="text-zinc-200">interests</span> and{" "}
              <span className="text-zinc-200">aptitude</span>. Take a short
              two-part quiz and get a personalized roadmap with projects,
              internships, and job-prep steps.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStart}
              disabled={loading}
              className="rounded-xl bg-white px-8 py-3 font-semibold text-black shadow-2xl transition hover:bg-zinc-200 disabled:opacity-60"
            >
              {loading ? "Preparing…" : "Start Quiz"}
            </motion.button>
          </Card>
        )}

        {/* QUIZ */}
        {step === "quiz" && quiz && (
          <div className="space-y-6">
            {loading && <Loader text="Loading quiz…" />}
            {!loading && (
              <>
                {/* progress */}
                <Card className="p-4">
                  <div className="mb-2 flex items-center justify-between text-xs text-zinc-400">
                    <span>
                      {currentPart === "partA"
                        ? "Part A — Interest Mapping"
                        : "Part B — Aptitude & Awareness"}
                    </span>
                    <span>
                      {answeredQ}/{totalQ} answered
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.35 }}
                      className="h-full bg-white"
                    />
                  </div>
                </Card>

                {/* question */}
                <Card className="p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${currentPart}-${currentIndex}`}
                      variants={qVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.22 }}
                    >
                      <div className="mb-5 text-sm uppercase tracking-wider text-zinc-400">
                        {currentPart === "partA"
                          ? "Part A: Interest Mapping"
                          : "Part B: Aptitude & Awareness"}
                      </div>
                      <div className="mb-6 text-xl font-medium leading-relaxed text-zinc-100">
                        {currentPart === "partA"
                          ? quiz.partA[currentIndex].question
                          : quiz.partB[currentIndex].question}
                      </div>

                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {(currentPart === "partA"
                          ? quiz.partA[currentIndex].options
                          : quiz.partB[currentIndex].options
                        ).map((opt, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleAnswer(opt)}
                            className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-left text-zinc-200 transition hover:bg-zinc-800"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <button
                          onClick={handlePrev}
                          disabled={
                            currentPart === "partA" && currentIndex === 0
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800 disabled:opacity-40"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Previous
                        </button>
                        <div className="text-xs text-zinc-500">
                          auto-advances on selection
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </Card>
              </>
            )}
          </div>
        )}

        {/* RESULT */}
        {step === "result" && result && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* summary */}
              <Card className="p-6">
                <h2 className="mb-2 text-2xl font-semibold text-zinc-100">
                  🎯 Your Career Path
                </h2>
                <p className="max-w-3xl text-zinc-400">{result.summary}</p>
              </Card>

              {/* radar + fields */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card className="p-6">
                  <SectionTitle>Top Fields (Radar)</SectionTitle>
                  <div className="mt-4 h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="field" stroke="#d4d4d8" />
                        <PolarRadiusAxis stroke="#52525b" />
                        <Radar
                          dataKey="score"
                          stroke="#ffffff"
                          fill="#ffffff"
                          fillOpacity={0.35}
                          name="Suitability"
                        />
                        <Tooltip
                          wrapperStyle={{
                            background: "#18181b",
                            border: "1px solid #3f3f46",
                            color: "#fafafa",
                            borderRadius: 12,
                          }}
                          contentStyle={{
                            background: "#18181b",
                            border: "none",
                            color: "#fafafa",
                          }}
                          labelStyle={{ color: "#fafafa" }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card className="p-6">
                  <SectionTitle>Your Recommended Fields</SectionTitle>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {result.topFields?.map((f) => (
                      <button
                        key={f}
                        onClick={() => setSelectedField(f)}
                        className={`rounded-xl border px-4 py-2 text-sm transition ${
                          selectedField === f
                            ? "border-zinc-200 bg-zinc-200 text-black"
                            : "border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 text-sm text-zinc-500">
                    Click a field to view its roadmap as a flow.
                  </div>
                </Card>
              </div>

              {/* flow map */}
              <Card className="p-6">
                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <SectionTitle>
                      {selectedField
                        ? `${selectedField} — Roadmap Flow`
                        : "Roadmap Flow"}
                    </SectionTitle>
                    <p className="mt-1 text-sm text-zinc-400">
                      Drag to pan • Wheel to zoom • Click nodes for details.
                    </p>
                  </div>
                </div>

                <div className="h-[380px] w-full rounded-xl border border-zinc-800">
                  {selectedField ? (
                    <ReactFlow
                      nodes={nodes.map((n) => ({
                        ...n,
                        data: {
                          ...n.data,
                          label: (
                            <div className="flex items-start gap-3">
                              <div className="rounded-xl bg-zinc-800 p-2">
                                {/* icon */}
                                {n.data.Icon ? (
                                  <n.data.Icon className="h-4 w-4 text-zinc-200" />
                                ) : null}
                              </div>
                              <div className="space-y-1">
                                <div className="text-sm font-semibold text-zinc-100">
                                  {n.data.label}
                                </div>
                                <div className="text-xs leading-relaxed text-zinc-400">
                                  {n.data.details}
                                </div>
                              </div>
                            </div>
                          ),
                        },
                      }))}
                      edges={edges}
                      fitView
                      fitViewOptions={{ padding: 0.2 }}
                    >
                      <Background color="#3f3f46" gap={18} />
                      <MiniMap
                        maskColor="rgba(24,24,27,0.85)"
                        nodeColor="#a855f7"
                      />
                      <Controls />
                    </ReactFlow>
                  ) : (
                    <div className="flex h-full items-center justify-center text-zinc-500">
                      Select a field above to view roadmap
                    </div>
                  )}
                </div>
              </Card>

              {/* textual detail fallback */}
              <Card className="p-6">
                <SectionTitle>Phase Details (Text)</SectionTitle>
                <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {selectedField &&
                    normalizePhases(result.roadmaps?.[selectedField]).map(
                      (p, i) => {
                        const Icon = getPhaseIcon(i);
                        return (
                          <div
                            key={p.id}
                            className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4"
                          >
                            <div className="mb-2 flex items-center gap-2">
                              <span className="rounded-lg bg-zinc-800 p-2">
                                <Icon className="h-4 w-4 text-zinc-200" />
                              </span>
                              <div className="text-sm font-semibold text-zinc-100">
                                {p.phase}
                              </div>
                            </div>
                            <div className="text-sm leading-relaxed text-zinc-400">
                              {p.details}
                            </div>
                          </div>
                        );
                      }
                    )}
                  {!selectedField && (
                    <div className="text-sm text-zinc-500">
                      Choose a field to show phase details.
                    </div>
                  )}
                </div>
              </Card>

              {/* actions */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setStep("start");
                    setResult(null);
                    setQuiz(null);
                    setAnswers({});
                    setSelectedField(null);
                  }}
                  className="rounded-xl bg-white px-8 py-3 font-semibold text-black shadow-2xl transition hover:bg-zinc-200"
                >
                  Retake Quiz
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}