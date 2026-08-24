import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import EventDetails from "@/components/EventDetails";
import Accommodations from "@/components/Accommodations";
import Registry from "@/components/Registry";
import RsvpForm from "@/components/RsvpForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <div className="container" style={{ paddingTop: 64 }}>
        <EventDetails />
        <Accommodations />
        <Registry />
        <RsvpForm />
      </div>
      <Footer />
    </main>
  );
}
