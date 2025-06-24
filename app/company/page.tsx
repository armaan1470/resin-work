export default function CompanyPage() {
  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "CEO & Founder",
      description:
        "Leading expert in resin technology with over 15 years of experience in materials science.",
    },
    {
      name: "Michael Chen",
      role: "Head of R&D",
      description:
        "Innovation specialist focused on developing cutting-edge resin solutions for various industries.",
    },
    {
      name: "Emily Rodriguez",
      role: "Quality Control Manager",
      description:
        "Ensuring all products meet the highest industry standards and customer expectations.",
    },
  ];

  const values = [
    {
      title: "Innovation",
      description:
        "Continuously pushing the boundaries of resin technology to create better solutions.",
      icon: "💡",
    },
    {
      title: "Quality",
      description:
        "Uncompromising commitment to quality in every product we manufacture.",
      icon: "⭐",
    },
    {
      title: "Sustainability",
      description:
        "Developing eco-friendly materials and processes for a better future.",
      icon: "🌱",
    },
  ];

  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="bg-secondary dark:bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">
              About <span className="text-brand">Resin Work</span>
            </h1>
            <p className="text-xl text-text-muted mb-8 max-w-3xl mx-auto">
              Leading provider of high-quality resin solutions with over a
              decade of experience in materials science and innovation. We serve
              industries worldwide with reliable, cutting-edge products.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">
                Our Mission
              </h2>
              <p className="text-text-muted mb-6">
                To provide innovative, high-quality resin solutions that empower
                professionals and creators to achieve exceptional results in
                their work. We believe in the power of advanced materials to
                transform industries and enable new possibilities.
              </p>
              <p className="text-text-muted">
                Our commitment to research and development ensures that we stay
                at the forefront of resin technology, delivering products that
                meet the evolving needs of our customers across dental,
                jewellery, functional, and 3D printing applications.
              </p>
            </div>
            <div className="bg-accent rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-text mb-4">
                Why Choose Us?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-text-muted">
                  <svg
                    className="w-5 h-5 text-success mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Over 10 years of industry experience
                </li>
                <li className="flex items-center text-text-muted">
                  <svg
                    className="w-5 h-5 text-success mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  ISO 9001 certified quality management
                </li>
                <li className="flex items-center text-text-muted">
                  <svg
                    className="w-5 h-5 text-success mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Dedicated technical support team
                </li>
                <li className="flex items-center text-text-muted">
                  <svg
                    className="w-5 h-5 text-success mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Global shipping and logistics
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              Our Values
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              The principles that guide everything we do and every product we
              create.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-text mb-2">
                  {value.title}
                </h3>
                <p className="text-text-muted">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              Our Leadership Team
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Meet the experts behind our innovative resin solutions and
              exceptional customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-secondary dark:bg-secondary rounded-lg p-8 shadow-lg border border-border text-center"
              >
                <div className="w-20 h-20 bg-brand rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-text-light"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-text mb-2">
                  {member.name}
                </h3>
                <p className="text-brand font-medium mb-4">{member.role}</p>
                <p className="text-text-muted">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Get in Touch
          </h2>
          <p className="text-text-muted mb-8 max-w-2xl mx-auto">
            Ready to explore our resin solutions? Contact our team for expert
            guidance and personalized recommendations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold text-text mb-2">Email</h3>
              <p className="text-text-muted">info@resinwork.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-text mb-2">Phone</h3>
              <p className="text-text-muted">+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="font-semibold text-text mb-2">Address</h3>
              <p className="text-text-muted">
                123 Resin Street
                <br />
                City, State 12345
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
