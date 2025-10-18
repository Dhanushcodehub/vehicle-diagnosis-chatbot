// Hero section aligned to columns with proper margins
import Image from "next/image";
import vehicleImg from "./img.jpeg";

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
                Your AI-Powered
            </span>
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight color-black">
              Vehicle Breakdown <br></br> Assistant
            </h1>
            <p className="mt-4 text-lg text-neutral-700">
              
                    
                24/7 AI-driven support for vehicle breakdowns and emergencies.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#components"
                className="rounded bg-black text-white px-5 py-2.5 hover:bg-black/90"
              >
               🚨  Emergency Help
              </a>
              <a
                href="#github"
                className="rounded border border-black/20 px-5 py-2.5 hover:bg-black/5"
              >
                Start Diagnosis
              </a>
            </div>
          </div>

          {/* Right: media/card spans 5 of 12 columns on md+ */}
            <div className="md:col-span-5">
            {/* Outer card can keep padding, but not the immediate image wrapper */}
            <div className="rounded-lg ">
              {/* Image wrapper: relative + sized, no padding */}
              <div className="relative aspect-video overflow-hidden rounded">
                <Image
                  src={vehicleImg}
                  alt="Vehicle breakdown illustration"
                  fill
                  className="object-cover"   // fills fully
                  priority
                  sizes="(min-width: 1024px) 560px, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
