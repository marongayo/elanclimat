import { Eyebrow } from "@/components/about-components/Eyebrow";
import { SectionHeading } from "@/components/about-components/SectionHeading";
import { ServiceCard } from "@/components/about-components/ServiceCard";
import { C, IMG } from "@/app/about/_tokens";

const SERVICES = [
  {
    num: "01",
    title: "HVAC Systems",
    description:
      "Split units, VRF systems, ducted central air, and precision cooling for data centres. We design, install, and maintain systems sized exactly to your load.",
    image: IMG.serviceHvac,
    href: "/services#hvac",
  },
  {
    num: "02",
    title: "Solar Installation",
    description:
      "Grid-tied, off-grid, and hybrid solar PV systems for homes, offices, and industrial facilities. Every design includes a detailed energy audit and ROI projection.",
    image: IMG.serviceSolar,
    href: "/services#solar",
  },
  {
    num: "03",
    title: "Electrical Works",
    description:
      "Low voltage, medium voltage, earthing, lightning protection, and building automation. EPRA-compliant and insurance-ready installations.",
    image: IMG.serviceElectrical,
    href: "/services#electrical",
  },
  {
    num: "04",
    title: "Refrigeration",
    description:
      "Cold rooms, blast freezers, display cabinets, and chiller plants for food retail, pharmaceuticals, and hospitality. Designed for temperature precision.",
    image: IMG.serviceRefrigeration,
    href: "/services#cold-room",
  },
  {
    num: "05",
    title: "Elevator & Lift Systems",
    description:
      "Passenger lifts, service elevators, and dumbwaiters for residential and commercial buildings. Fully compliant with Kenyan building regulations.",
    image: IMG.serviceElevator,
    href: "/services#elevator",
  },
  {
    num: "06",
    title: "Maintenance Contracts",
    description:
      "Scheduled preventive maintenance, 24-hour emergency response, and annual service agreements that keep every system running at design efficiency.",
    image: IMG.storyLeft,
    href: "/services#maintenance",
  },
];

export function ServicesSection() {
  return (
    <section
      id="our-services"
      style={{ padding: "96px 0", scrollMarginTop: 80 }}
    >
      <div className="about-inner">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            marginBottom: 56,
            textAlign: "center",
          }}
        >
          <Eyebrow text="Unmatched Craftsmanship" />
          <SectionHeading>
            Engineering for the Needs of Every Building
          </SectionHeading>
          <div style={{ width: 32, height: 1, background: C.ruleLight }} />
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.82rem",
              color: C.muted,
              lineHeight: 1.8,
              maxWidth: 480,
              margin: 0,
              fontWeight: 300,
            }}
          >
            Five integrated service lines. One accountable team. Designed to
            keep Kenyan homes and businesses running at peak performance,
            year-round.
          </p>
        </div>

        <div
          className="services-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {SERVICES.map((s) => (
            <ServiceCard key={s.num} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
