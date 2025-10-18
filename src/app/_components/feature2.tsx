// app/_components/Features.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Item = { icon: string; title: string; text: string };

const items: Item[] = [
  {
    icon: "🤖",
    title: "AI-Powered Diagnosis",
    text:
      "Smart analysis of symptoms, OBD codes, images, and audio to identify issues instantly",
  },
  {
    icon: "⚡",
    title: "Instant Solutions",
    text:
      "Get step-by-step troubleshooting guidance and safety recommendations",
  },
  {
    icon: "📍",
    title: "Nearby Services",
    text:
      "Find mechanics, towing services, and roadside assistance near you",
  },
  {
    icon: "📊",
    title: "Service History",
    text:
      "Track breakdowns and maintenance for predictive insights",
  },
  {
    icon: "🎯",
    title: "Multi-Input Support",
    text:
      "Text, voice, images, audio, and OBD code analysis",
  },
  {
    icon: "🚗",
    title: "Book Ride",
    text:
      "Schedule rides to service centers directly from the app",
  },
];

export default function Features() {
  return (
    <section className="bg-white text-black">
      <div className="container mx-auto px-4 py-12">
        <Badge variant="outline" className="mb-6">
          Your Website Builder
        </Badge>

        {/* 1 / 2 / 3 column responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <Card
              key={it.title}
              className="rounded-2xl border border-neutral-200 shadow-sm hover:shadow transition"
            >
              {/* Center emoji + title */}
              <CardHeader className="flex flex-col items-center justify-center text-center space-y-3">
                <div className="text-5xl leading-none select-none">{it.icon}</div>
                <CardTitle className="text-xl">{it.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-center text-neutral-700">{it.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
