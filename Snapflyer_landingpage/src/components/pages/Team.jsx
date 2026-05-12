import React from 'react';

const teamMembers = [
  {
    name: 'Kavin P',
    role: 'Frontend Developer',
    initials: 'KP',
    gradient: 'linear-gradient(135deg, #6C3EE8, #9B6DFF)',
    image: '/team/KavinP.png',
  },
  {
    name: 'Mekala M',
    role: 'Backend Developer',
    initials: 'MM',
    gradient: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
    image: '/team/Mekala.jpeg',
  },
  {
    name: 'Freeza Stephen',
    role: 'Backend Developer',
    initials: 'FS',
    gradient: 'linear-gradient(135deg, #8B5CF6, #A78BFA)',
    image: '/team/Freeza stephen.png',
  },
  {
    name: 'Nandhini',
    role: 'Cloud & DevOps',
    initials: 'N',
    gradient: 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
    image: '/team/Nandhini.png',
  },
  {
    name: 'Sakthi Abirami',
    role: 'Digital Marketing Specialist & Quality Analyst',
    initials: 'SA',
    gradient: 'linear-gradient(135deg, #EC4899, #F472B6)',
    image: '/team/Abirami.jpeg',
  },
];

export default function Team() {
  return (
    <div className="team-page">
      {/* Hero Banner */}
      <section className="team-hero">
        <div className="container">
          <h1 className="team-hero-title">Our Team</h1>
          <p className="team-hero-subtitle">
            Meet the talented people building SnapFlyer
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section team-section">
        <div className="container">
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div className="team-card" key={member.name}>
                <div className="team-avatar" style={{ background: member.image ? 'transparent' : member.gradient }}>
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="team-avatar-img"
                    />
                  ) : (
                    <span className="team-initials">{member.initials}</span>
                  )}
                </div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
