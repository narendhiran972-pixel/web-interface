import React from 'react';
import Header from './Header';
import Profile from './Profile';
import About from './About';
import Skills from './Skills';
import Goal from './Goal';
import Contact from './Contact';
import Footer from './Footer';

// App Component - the root component that holds all data and passes them as props
function App() {

  // ──────────────────────────────────────────────
  //   All personal data defined here in one place
  //   and distributed to child components via props
  // ──────────────────────────────────────────────

  const headerData = {
    title: "NARENDHIRAN",
    subtitle: "B.E. Computer Science & Engineering Student"
  };

  const profileData = {
    name: "NARENDHIRAN",
    age: 18,
    degree: "B.E. Computer Science & Engineering",
    university: "Prince Dr. K. Vasudevan Engineering College",
    location: "Tamil Nadu, India",
    year: "2nd Year"
  };

  const intro = `I am a passionate Computer Science student with a strong interest in web development and software engineering. I enjoy building clean, responsive, and user-friendly applications while continuously learning new technologies. I love exploring open-source projects, reading tech blogs, and staying updated with the latest trends in technology. I also enjoy solving algorithmic challenges and improving my problem-solving skills through competitive programming.`;

  const skills = [
    "HTML & CSS",
    "JavaScript",
    "React.js",
    "Node.js",
    "Python",
    "Java",
    "MySQL",
    "MongoDB",
    "Git & GitHub",
    "REST APIs"
  ];

  const objective = `To secure an internship or entry-level software development role where I 
  can apply my programming knowledge, collaborate with experienced engineers, 
  and grow as a full-stack developer while contributing meaningfully to 
  impactful real-world projects.`;

  const contactData = {
    phone: "+91 9952602670",
    email: "narendhiran972@gmail.com",
    github: "narendhiran972-pixel"
  };

  const footerMessage = "Thank you for visiting my personal introduction page — let's build something great together!";

  return (
    <div>
      {/* Header — same as before */}
      <Header
        title={headerData.title}
        subtitle={headerData.subtitle}
      />

      <main className="main-content">

        {/* TOP ROW: Profile (left) | About + Skills (right) */}
        <div className="top-row">

          {/* Profile Component — left column */}
          <Profile
            name={profileData.name}
            age={profileData.age}
            degree={profileData.degree}
            university={profileData.university}
            location={profileData.location}
            year={profileData.year}
          />

          {/* Right column: About + Skills stacked */}
          <div className="top-right">
            {/* About Component receives intro text as a prop */}
            <About intro={intro} />

            {/* Skills Component receives skills array as a prop */}
            <Skills skills={skills} />
          </div>

        </div>

        {/* BOTTOM ROW: Goal (left) | Contact (right) */}
        <div className="bottom-row">
          {/* Goal Component receives objective text as a prop */}
          <Goal objective={objective} />

          {/* Contact Component receives phone, email, github as props */}
          <Contact
            phone={contactData.phone}
            email={contactData.email}
            github={contactData.github}
          />
        </div>

      </main>

      {/* Footer — same as before */}
      <Footer message={footerMessage} />
    </div>
  );
}

export default App;
