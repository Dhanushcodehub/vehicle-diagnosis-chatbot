// Hero section aligned to columns with proper margins
export default function Hero() {
  return (
    <section className="bg-white text-black">
      {/* Centered, max-width container with side padding */}
      <div className="container mx-auto px-4 py-12">
        {/* 12-column grid, stacks on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8">
          {/* Left: text content spans 7 of 12 columns on md+ */}
          <div className="md:col-span-7">
            <span className="inline-block text-sm mb-4 px-3 py-1 rounded-full bg-black text-white">
              Your Website Builder
            </span>
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
              Blocks Built With Shadcn & Tailwind
            </h1>
            <p className="mt-4 text-lg text-neutral-700">
              Finely crafted components built with React, Tailwind, and Shadcn UI.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#components"
                className="rounded bg-black text-white px-5 py-2.5 hover:bg-black/90"
              >
                
              </a>
              <a
                href="#github"
                className="rounded border border-black/20 px-5 py-2.5 hover:bg-black/5"
              >
                View on GitHub
              </a>
            </div>
          </div>

          {/* Right: media/card spans 5 of 12 columns on md+ */}
          <div className="md:col-span-5">
            <div className="rounded-lg border border-black/10 bg-neutral-100 p-8 md:p-10">
              {/* Replace with your image or illustration */}
              <div className="aspect-video grid place-items-center bg-white rounded">
                <div className="h-24 w-24 bg-black" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
