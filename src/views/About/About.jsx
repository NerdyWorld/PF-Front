import React, { useState, useEffect } from "react";
import styles from "./About.module.css";
import Modal from "./Modal"; // Importa tu modal personalizado aquí

const teamMembers = [
  {
    name: "Barbara Lucia Senra",
    github: "https://github.com/usuario2",
    linkedin: "https://linkedin.com/in/usuario2",
    image: "ruta-a-la-imagen2.jpg",
  },
  {
    name: "Iñaki Armendariz",
    github: "https://github.com/usuario1",
    linkedin: "https://linkedin.com/in/usuario1",
    image: "ruta-a-la-imagen1.jpg",
  },
  {
    name: "Ignacio Gramajo Feijoo",
    github: "https://github.com/usuario2",
    linkedin: "https://linkedin.com/in/usuario2",
    image: "ruta-a-la-imagen2.jpg",
  },
  {
    name: "Joaquin Anccana Cueva",
    github: "https://github.com/usuario2",
    linkedin: "https://linkedin.com/in/usuario2",
    image: "ruta-a-la-imagen2.jpg",
  },
  {
    name: "Dario Sosa",
    github: "https://github.com/usuario2",
    linkedin: "https://linkedin.com/in/usuario2",
    image: "ruta-a-la-imagen2.jpg",
  },
  {
    name: "Diego Hurtado",
    github: "https://github.com/usuario2",
    linkedin: "https://linkedin.com/in/usuario2",
    image: "ruta-a-la-imagen2.jpg",
  },
];
const AboutUs = () => {
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <h1 className={styles.fixedHeader}>History of Rivélle</h1>
      <p className={`${styles.fixedParagraph}`}>
        We are Rivélle, a clothing brand that was born with the passion to offer
        the best in high-quality fashion. Our mission is to provide our clients
        clothes from top brands, such as Gucci, Louis Vuitton, Fendi, Dolce &&
        Gabbana, and many more, with a focus on quality and style.
      </p>
      <div className={styles.mainImg}>
        <img src="/images/landing.png" alt="abc" />
      </div>

      <button
        className={styles.teamButton}
        onClick={() => setIsTeamModalOpen(true)}
      >
        View Our Team
      </button>

      {isTeamModalOpen && (
        <Modal onClose={() => setIsTeamModalOpen(false)}>
          <h2>Our Team</h2>
          <div className={styles.team}>
            {teamMembers.map((member, index) => (
              <div className={styles.members}>
                <div key={index} className={styles.member}>
                  <div className={styles.imageContainer}>
                    {" "}
                    <img
                      src={member.image}
                      alt={`${member.name}'s`}
                      className={styles.profileImage}
                    />{" "}
                  </div>{" "}
                  <h3>{member.name}</h3>{" "}
                  <div className={styles.socialLinks}>
                    {" "}
                    <i
                      className="fa-brands fa-github"
                      onClick={() => {
                        window.open(member.github, "_blank");
                      }}
                    ></i>{" "}
                    <i
                      className="fa-brands fa-linkedin"
                      onClick={() => {
                        window.open(member.linkedin, "_blank");
                      }}
                    ></i>{" "}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AboutUs;
