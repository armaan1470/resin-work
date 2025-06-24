export default function JewelleryPage() {
  const materials = [
    {
      name: "Clear Casting Resin",
      description:
        "Crystal clear resin perfect for creating transparent jewellery pieces with excellent clarity.",
      features: [
        "Crystal clear",
        "UV resistant",
        "Bubble free",
        "Easy to polish",
      ],
    },
    {
      name: "Colored Resin",
      description:
        "Vibrant colored resins for creating unique and eye-catching jewellery designs.",
      features: ["Vibrant colors", "Color stable", "Mixable", "Long lasting"],
    },
    {
      name: "Metallic Resin",
      description:
        "Resin with metallic particles for creating stunning metallic effects in jewellery.",
      features: [
        "Metallic finish",
        "Shimmer effect",
        "Professional look",
        "Durable",
      ],
    },
    {
      name: "Glow-in-the-Dark Resin",
      description:
        "Special resin that glows in the dark for creating unique night-time jewellery.",
      features: [
        "Glow effect",
        "Long glow time",
        "Safe materials",
        "Creative possibilities",
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
              Jewellery <span className="text-brand">Resin Materials</span>
            </h1>
            <p className="text-xl text-text-muted mb-8 max-w-3xl mx-auto">
              Beautiful and durable resin materials for creating stunning
              jewellery pieces. From clear casting to vibrant colors, we have
              everything you need for your creative projects.
            </p>
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              Our Jewellery Materials
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              High-quality resin materials designed specifically for jewellery
              making and creative applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {materials.map((material, index) => (
              <div
                key={index}
                className="bg-secondary dark:bg-secondary rounded-lg p-8 shadow-lg border border-border"
              >
                <h3 className="text-2xl font-semibold text-text mb-4">
                  {material.name}
                </h3>
                <p className="text-text-muted mb-6">{material.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-text">Key Features:</h4>
                  <ul className="space-y-1">
                    {material.features.map((feature, featureIndex) => (
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

      {/* Applications Section */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              Jewellery Applications
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Versatile materials for various jewellery making techniques and
              styles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">Pendants</h3>
              <p className="text-text-muted">
                Create beautiful pendants with our clear and colored resins.
              </p>
            </div>

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
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">Earrings</h3>
              <p className="text-text-muted">
                Lightweight and durable materials perfect for earring designs.
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">Rings</h3>
              <p className="text-text-muted">
                Create stunning ring designs with our durable resin materials.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
