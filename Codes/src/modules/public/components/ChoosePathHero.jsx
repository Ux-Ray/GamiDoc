import { SectionHeader } from "../../../components/ui/SectionHeader";

export function ChoosePathHero({ title, subtitle }) {
  return (
    <section className="choose-path-hero">
      <SectionHeader title={title} subtitle={[subtitle]} />
    </section>
  );
}
