import {
  PartyPopper, Briefcase, CalendarDays, UtensilsCrossed,
  GraduationCap, Church, Home, BadgePercent,
  Music, Trophy, Snowflake, Wine,
} from 'lucide-react';

const useCases = [
  { label: 'Party Flyers', icon: PartyPopper, color: '#EF4444' },
  { label: 'Business Flyers', icon: Briefcase, color: '#3B82F6' },
  { label: 'Event Flyers', icon: CalendarDays, color: '#8B5CF6' },
  { label: 'Restaurant Flyers', icon: UtensilsCrossed, color: '#059669' },
  { label: 'School Flyers', icon: GraduationCap, color: '#F59E0B' },
  { label: 'Church Flyers', icon: Church, color: '#EC4899' },
  { label: 'Real Estate Flyers', icon: Home, color: '#0EA5E9' },
  { label: 'Sale & Promotion', icon: BadgePercent, color: '#F97316' },
  { label: 'Concert & Music', icon: Music, color: '#7C3AED' },
  { label: 'Sports Flyers', icon: Trophy, color: '#10B981' },
  { label: 'Holiday Flyers', icon: Snowflake, color: '#06B6D4' },
  { label: 'Bar & Nightlife', icon: Wine, color: '#DC2626' },
];

export default function UseCasesSection() {
  return (
    <section className="section" id="use-cases">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Flyers for Every Occasion</h2>
          <p className="section-subtitle">
            Whatever you're promoting, we've got you covered
          </p>
        </div>

        <div className="use-cases-grid">
          {useCases.map(({ label, icon: Icon, color }) => (
            <a
              key={label}
              href="#"
              className="category-tile"
              style={{ background: color }}
            >
              <Icon /> {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
