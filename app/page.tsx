// app/page.tsx

// 1. The Custom Scientific Logo Component
// Represents chaos (noise) transforming into order (invariance)
const Logo = () => (
  <div className="flex items-center gap-3">
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background Chip */}
      <rect width="40" height="40" rx="8" fill="#111" stroke="#333" strokeWidth="1" />
      {/* The Signal Path: A sine wave flattening into a straight line */}
      <path 
        d="M8 20 C9.5 20 10 14 12 14 C14 14 14.5 26 16.5 26 C18.5 26 19 20 20.5 20 H32" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
    <span className="font-bold text-xl tracking-wider text-white font-mono">INVARIANT LABS</span>
  </div>
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6 md:p-24 selection:bg-white selection:text-black">
      
      {/* --- Navigation / Header --- */}
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {/* Top Logo Bar */}
        <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-800 bg-black/80 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border-none lg:bg-transparent lg:p-0">
          <Logo />
        </div>
        {/* Bottom Location Marker */}
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-black via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <span className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 text-gray-500 font-mono text-xs">
            LINZ, AUSTRIA // EST. 2025
          </span>
        </div>
      </div>

      {/* --- Hero Section --- */}
      {/* The background glow effect is created by the 'before' pseudo-element below */}
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-to-br before:from-blue-900 before:to-transparent before:opacity-10 before:blur-3xl content-center my-16 lg:my-0">
        <div className="text-center z-10">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6">
            Signal & Symbol.
          </h1>
          <p className="text-neutral-400 max-w-lg mx-auto text-sm md:text-base font-mono">
            Bridging Industrial Signal Processing with Neuro-Symbolic Intelligence.
          </p>
        </div>
      </div>

      {/* --- Services Grid --- */}
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left mt-12 gap-8">
        
        {/* Service 1: Industrial AI */}
        <a href="mailto:contact@invariant-labs.ai?subject=Inquiry: Industrial AI Solutions" 
           className="group rounded-lg border border-neutral-800 px-5 py-6 transition-all hover:border-neutral-600 hover:bg-neutral-900/50">
          <h2 className="mb-3 text-xl font-semibold font-mono text-white">
            Industrial AI{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none text-blue-500">
              -&gt;
            </span>
          </h2>
          <p className="m-0 text-sm text-neutral-400">
            Invariant models for high-dimensional industrial data.
            <br/>
            {/* UPDATED DESCRIPTION BELOW */}
            <span className="text-xs text-neutral-600 mt-2 block">
              Focus: Computer Vision, Welding, &amp; Time-Series
            </span>
          </p>
        </a>

        {/* Service 2: Tech / Software */}
        <a href="mailto:contact@invariant-labs.ai?subject=Inquiry: SymLogix Reasoning Engine"
           className="group rounded-lg border border-neutral-800 px-5 py-6 transition-all hover:border-neutral-600 hover:bg-neutral-900/50">
          <h2 className="mb-3 text-xl font-semibold font-mono text-white">
            SymLogix™{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none text-purple-500">
              -&gt;
            </span>
          </h2>
          <p className="m-0 text-sm text-neutral-400">
            Verifiable reasoning engines bridging LLMs and Symbolic Math.
            <br/><span className="text-xs text-neutral-600 mt-2 block">Focus: RAG, Verification, Agents</span>
          </p>
        </a>

        {/* Service 3: Education */}
        <a href="mailto:contact@invariant-labs.ai?subject=Inquiry: Corporate Training"
           className="group rounded-lg border border-neutral-800 px-5 py-6 transition-all hover:border-neutral-600 hover:bg-neutral-900/50">
          <h2 className="mb-3 text-xl font-semibold font-mono text-white">
            Education{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none text-green-500">
              -&gt;
            </span>
          </h2>
          <p className="m-0 text-sm text-neutral-400">
            Advanced training for engineering teams.
            <br/><span className="text-xs text-neutral-600 mt-2 block">Focus: Deep Learning Theory &amp; Signal Processing</span>
          </p>
        </a>
      </div>
      
      {/* --- Footer --- */}
      <footer className="fixed bottom-4 text-neutral-700 font-mono text-[10px] uppercase tracking-widest">
        © {new Date().getFullYear()} Invariant Labs. All Systems Nominal.
      </footer>
    </main>
  );
}
