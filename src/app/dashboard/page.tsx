// app/dashboard/page.tsx

import { Cta10 } from "../_components/feature1";
import Hero from "../_components/hero";
import { Navbar1 } from "../_components/Navbar";
import ChatbotSimple from "./ChatbotSimple";
import ProfileGate from "./ProfileGate"; // optional

export default function DashboardPage() {
  const vehicleProfile = {}; // later: load from Firestore and pass here
  return (
    
    <main >
      <Navbar1/>
      
      <ProfileGate />
      <section className="mr-10 ml-10">
        <Hero></Hero>
        <Cta10/>
      </section>
      
    </main>
  );
}
