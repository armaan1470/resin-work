export default function FunctionalityPage() {
  const applications = [
    {
      name: "Industrial Casting",
      description:
        "High-strength resin for industrial casting applications with excellent dimensional stability.",
      features: [
        "High strength",
        "Dimensional stability",
        "Heat resistant",
        "Chemical resistant",
      ],
    },
    {
      name: "Prototyping",
      description:
        "Fast-curing resin perfect for rapid prototyping and product development.",
      features: [
        "Fast curing",
        "High detail",
        "Smooth finish",
        "Easy post-processing",
      ],
    },
    {
      name: "Mold Making",
      description:
        "Specialized resin for creating durable molds for various manufacturing processes.",
      features: ["Durable molds", "High accuracy", "Long life", "Easy release"],
    },
    {
      name: "Structural Components",
      description:
        "Engineering-grade resin for structural applications requiring high performance.",
      features: [
        "High performance",
        "Load bearing",
        "Weather resistant",
        "Long lasting",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="bg-secondary dark:bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">
              Functional <span className="text-brand">Applications</span>
            </h1>
            <p className="text-xl text-text-muted mb-8 max-w-3xl mx-auto">
              Industrial-grade resin solutions for functional and structural
              applications. Our materials are designed to meet the demanding
              requirements of professional use.
            </p>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              Functional Applications
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              High-performance resin materials designed for industrial and
              functional applications where strength, durability, and precision
              are essential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {applications.map((application, index) => (
              <div
                key={index}
                className="bg-secondary dark:bg-secondary rounded-lg p-8 shadow-lg border border-border"
              >
                <h3 className="text-2xl font-semibold text-text mb-4">
                  {application.name}
                </h3>
                <p className="text-text-muted mb-6">
                  {application.description}
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-text">Key Features:</h4>
                  <ul className="space-y-1">
                    {application.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-text-muted"
                      >
                        <svg
                          className="w-4 h-4 text-success mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              Industries We Serve
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Our functional resins are used across various industries for their
              reliability and performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-info rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-text-light"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">
                Manufacturing
              </h3>
              <p className="text-text-muted">
                Industrial manufacturing processes requiring high-strength
                materials.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-warning rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-text-light"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">
                Engineering
              </h3>
              <p className="text-text-muted">
                Engineering applications requiring precision and durability.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-text-light"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">
                Automotive
              </h3>
              <p className="text-text-muted">
                Automotive industry applications for parts and components.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
