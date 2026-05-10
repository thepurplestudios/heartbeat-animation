import HeartPixi from "./components/HeartPixi";

function App() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* base */}
      <div className="absolute inset-0 bg-black" />

      {/* subtle center aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,45,85,0.10),transparent_38%)]" />

      {/* focused heart glow */}
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-3xl" />

      {/* cinematic vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_32%,rgba(0,0,0,0.96))]" />

      {/* top fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#22000d]/30 via-transparent to-black/40" />

      <HeartPixi />
    </main>
  );
}

export default App;
