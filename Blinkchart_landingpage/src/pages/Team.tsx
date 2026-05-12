import "./team.css";
import hari from "../assets/hari.png";
import akshaya from "../assets/akshaya.png";
import avr from "../assets/avr.png";
import freeza from "../assets/freeza.png";
import nandhini from "../assets/nandhini.png";
import abi from "../assets/abi.png";
import Gunavathi from "../assets/Gunavathi.png";
import lingesh from "../assets/lingesh.jpg";

import hariWebP from "../assets/hari.webp";
import akshayaWebP from "../assets/akshaya.webp";
import avrWebP from "../assets/avr.webp";
import freezaWebP from "../assets/freeza.webp";
import nandhiniWebP from "../assets/nandhini.webp";
import abiWebP from "../assets/abi.webp";
import GunavathiWebP from "../assets/Gunavathi.webp";
import lingeshWebP from "../assets/lingesh.webp";

const teamMembers = [
  {
    name: "Angeline Stephen",
    role: "Full Stack Developer",
    image: freeza,
    imageWebP: freezaWebP,
    description:
      "Developed the core backend logic and system architecture, ensuring secure data handling and scalable performance."
  },
  {
    name: "Lingeshwaran",
    role: "Frontend Developer",
    image: lingesh,
    imageWebP: lingeshWebP, // If you have a WebP version in dist/assets, update this path as well
    description:
      "Designed and developed the user interface of BlinkChart, focusing on seamless and intuitive user experience."
  },
  {
    name: "Hariharasudhan Sudhagar",
    role: "Frontend Developer",
    image: hari,
    imageWebP: hariWebP,
    description:
      "Designed and developed the complete user interface of BlinkChart, focusing on delivering a seamless, fast, and intuitive user experience."
  },
  {
    name: "Akshaya AVR",
    role: "Backend Developer",
    image: avr,
    imageWebP: avrWebP,
    description:
      "Worked on backend implementation, optimizing performance and ensuring reliable system communication."
  },
  {
    name: "Nandhini Neelakandan",
    role: "Cloud Engineer",
    image: nandhini,
    imageWebP: nandhiniWebP,
    objectPosition: "center 50%",
    description:
      "Managed cloud infrastructure, deployment, scalability, and production reliability."
  },
  {
    name: "Akshaya Gopi",
    role: "Quality Analyst",
    image: akshaya,
    imageWebP: akshayaWebP,
    description:
      "Performed testing, identified bugs, and ensured a stable, reliable, and high-quality product experience."
  },
  {
    name: "Gunavathi",
    role: "Quality Analyst",
    image: Gunavathi,
    imageWebP: GunavathiWebP,
    description:
      "Quality Assurance Tester ensuring product reliability and performance."
  },
  {
    name: "Sakthi Abirami",
    role: "Digital Marketing Executive",
    image: abi,
    imageWebP: abiWebP,
    description:
      "Handled branding, marketing strategy, and audience outreach to promote BlinkChart."
  }
];

const Team = () => {
  return (
    <div className="team-page">

      <div className="team-header">
        <h1>
          Meet Our <span className="team-header-highlight">Team</span>
        </h1>
        <p>
          The passionate professionals behind BlinkChart who built this platform.
        </p>
      </div>

      <div className="team-container">

        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>

            <div className="team-image-placeholder">

              {member.image ? (
                <picture>
                  {member.imageWebP && (
                    <source srcSet={member.imageWebP} type="image/webp" />
                  )}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="team-image"
                    width={480}
                    loading="lazy"
                    decoding="async"
                    style={member.objectPosition ? { objectPosition: member.objectPosition } : undefined}
                  />
                </picture>

              ) : (
                <>
                  <span style={{ display: "inline-block", height: "100px", width: "100px" }}></span>
                  <span style={{ display: "block", marginTop: "8px", color: "#bbb", fontSize: "14px" }}>Add Image</span>
                </>
              )}
            </div>

            <h3 style={!member.image ? { marginTop: "32px" } : undefined}>{member.name}</h3>
            <div className="team-role">{member.role}</div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Team;
