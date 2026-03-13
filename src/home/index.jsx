import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "sans-serif" }}>

      {/* HERO */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "5rem 2rem 4rem", textAlign: "center" }}>

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          background: "#f5f5f3", border: "0.5px solid #e0e0da",
          borderRadius: 20, padding: "5px 14px", fontSize: 13,
          color: "#6b6b66", marginBottom: "2rem"
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#639922", display: "inline-block" }} />
          AI-powered resume builder
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: "3.5rem", fontWeight: 600, lineHeight: 1.15, color: "#111", margin: 0 }}>
          Build your resume<br />
          with <span style={{ color: "#534AB7" }}>AI power</span>
        </h1>

        {/* Subheading */}
        <p style={{
          marginTop: "1.25rem", fontSize: "1.15rem", color: "#666",
          maxWidth: 520, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7
        }}>
          Create ATS-friendly resumes in minutes using intelligent AI suggestions,
          modern templates, and real-time editing. Land more interviews, faster.
        </p>

        {/* CTA */}
        <div style={{ marginTop: "2.25rem" }}>
          <Link to="/dashboard">
            <button style={{
              background: "#534AB7", color: "#EEEDFE", border: "none",
              padding: "13px 32px", borderRadius: 9, fontSize: 15,
              fontWeight: 500, cursor: "pointer", letterSpacing: "0.01em"
            }}>
              Get started for free →
            </button>
          </Link>
          <p style={{ marginTop: "0.75rem", fontSize: 12, color: "#aaa" }}>No credit card required</p>
        </div>

        {/* Resume Preview */}
        <div style={{
          margin: "3rem auto 0", maxWidth: 760,
          background: "#f5f5f3", borderRadius: 14,
          border: "0.5px solid #e0e0da", padding: "1.5rem"
        }}>
          <div style={{
            background: "#fff", borderRadius: 10,
            border: "0.5px solid #e0e0da", padding: "2rem", textAlign: "left"
          }}>

            {/* Resume Header */}
            <div style={{
              display: "flex", alignItems: "flex-start", justifyContent: "space-between",
              borderBottom: "0.5px solid #e0e0da", paddingBottom: "1.25rem", marginBottom: "1.25rem",
              flexWrap: "wrap", gap: 10
            }}>
              <div>
                <div style={{ fontSize: "1.5rem", fontWeight: 600, color: "#111" }}>Jordan Lee</div>
                <div style={{ fontSize: 13, color: "#534AB7", marginTop: 3 }}>Senior Product Designer</div>
              </div>
              <div style={{ fontSize: 12, color: "#999", textAlign: "right", lineHeight: 1.8 }}>
                jordan@email.com · (415) 555-0192<br />
                linkedin.com/in/jordanlee · San Francisco, CA
              </div>
            </div>

            {/* Experience */}
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb", marginBottom: 10 }}>
              Experience
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>Lead Product Designer</div>
                <div style={{ fontSize: 11, color: "#aaa" }}>Jan 2021 – Present</div>
              </div>
              <div style={{ fontSize: 12, color: "#777", marginTop: 2 }}>Acme Corp · San Francisco, CA</div>
              <div style={{ fontSize: 12, color: "#555", marginTop: 6, paddingLeft: 14, lineHeight: 1.6 }}>· Led end-to-end redesign of the core dashboard, increasing user retention by 34%</div>
              <div style={{ fontSize: 12, color: "#555", marginTop: 3, paddingLeft: 14, lineHeight: 1.6 }}>· Managed a team of 4 designers across 3 product tracks and 2 platforms</div>
              <div style={{ fontSize: 12, color: "#555", marginTop: 3, paddingLeft: 14, lineHeight: 1.6 }}>· Established the company's first design system, reducing handoff time by 50%</div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                background: "#EEEDFE", color: "#534AB7",
                fontSize: 10, padding: "2px 8px", borderRadius: 10, marginTop: 6
              }}>
                ✦ AI-enhanced
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>Product Designer</div>
                <div style={{ fontSize: 11, color: "#aaa" }}>Mar 2018 – Dec 2020</div>
              </div>
              <div style={{ fontSize: 12, color: "#777", marginTop: 2 }}>Startup Inc · Remote</div>
              <div style={{ fontSize: 12, color: "#555", marginTop: 6, paddingLeft: 14, lineHeight: 1.6 }}>· Shipped 12 features across mobile and web platforms in 2 years</div>
              <div style={{ fontSize: 12, color: "#555", marginTop: 3, paddingLeft: 14, lineHeight: 1.6 }}>· Improved onboarding flow, reducing drop-off rate by 22%</div>
            </div>

            {/* Skills */}
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb", marginBottom: 10, marginTop: 16 }}>
              Skills
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {["Figma", "User research", "Prototyping", "Design systems", "A/B testing", "Wireframing", "Usability testing"].map(skill => (
                <span key={skill} style={{
                  background: "#f5f5f3", border: "0.5px solid #e0e0da",
                  fontSize: 12, color: "#555", padding: "4px 12px", borderRadius: 20
                }}>
                  {skill}
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16, maxWidth: 1000, margin: "0 auto 5rem",
        padding: "0 2rem"
      }}>

        {[
          {
            bg: "#EEEDFE",
            icon: <path d="M9 2l1.5 3.5L14 7l-2.8 2.5.7 3.5L9 11.2l-2.9 1.8.7-3.5L4 7l3.5-.5z" fill="#534AB7" />,
            title: "AI content assistant",
            desc: "Generate professional bullet points and improve wording instantly. Just describe your role and let AI do the heavy lifting."
          },
          {
            bg: "#EAF3DE",
            icon: <>
              <rect x="3" y="2" width="12" height="14" rx="2" stroke="#3B6D11" strokeWidth="1.5" />
              <line x1="6" y1="6" x2="12" y2="6" stroke="#3B6D11" strokeWidth="1.2" />
              <line x1="6" y1="9" x2="12" y2="9" stroke="#3B6D11" strokeWidth="1.2" />
              <line x1="6" y1="12" x2="10" y2="12" stroke="#3B6D11" strokeWidth="1.2" />
            </>,
            title: "ATS optimized",
            desc: "Smart keyword suggestions ensure your resume gets past applicant tracking systems and into the hands of real recruiters."
          },
          {
            bg: "#E1F5EE",
            icon: <>
              <rect x="2" y="3" width="6" height="12" rx="1.5" stroke="#0F6E56" strokeWidth="1.5" />
              <rect x="10" y="6" width="6" height="9" rx="1.5" stroke="#0F6E56" strokeWidth="1.5" />
            </>,
            title: "Modern template",
            desc: "A clean, recruiter-approved layout designed to make your experience stand out. Professional, minimal, and ready to send."
          }
        ].map(({ bg, icon, title, desc }) => (
          <div key={title} style={{ background: "#fff", border: "0.5px solid #e0e0da", borderRadius: 14, padding: "1.75rem" }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none">{icon}</svg>
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#111", marginBottom: 6 }}>{title}</div>
            <div style={{ fontSize: 13, color: "#777", lineHeight: 1.7 }}>{desc}</div>
          </div>
        ))}

      </div>

      {/* BOTTOM CTA BANNER */}
      <div style={{
        background: "#534AB7",
        maxWidth: 960, margin: "0 auto 4rem",
        borderRadius: 16, padding: "3.5rem 2rem", textAlign: "center"
      }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 600, color: "#EEEDFE", margin: 0 }}>
          Ready to land your next job?
        </h2>
        <p style={{ color: "#AFA9EC", marginTop: "0.75rem", fontSize: "1rem", lineHeight: 1.6 }}>
          Join thousands of job seekers already using AI to build standout resumes.
        </p>
        <Link to="/dashboard">
          <button style={{
            marginTop: "1.5rem", background: "#fff", color: "#534AB7",
            border: "none", padding: "12px 28px", borderRadius: 9,
            fontSize: 15, fontWeight: 500, cursor: "pointer"
          }}>
            Build my resume →
          </button>
        </Link>
      </div>

    </div>
  );
};

export default Home;
