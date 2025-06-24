export default function DentalPage() {
  const products = [
    {
      name: "Dental Crown Resin",
      description:
        "High-strength resin for permanent dental crowns with excellent durability and biocompatibility.",
      features: [
        "Biocompatible",
        "High strength",
        "Natural appearance",
        "Long-lasting",
      ],
    },
    {
      name: "Bridge Material",
      description:
        "Premium resin material for dental bridges with superior bonding properties.",
      features: [
        "Superior bonding",
        "Color matching",
        "Easy application",
        "Fast curing",
      ],
    },
    {
      name: "Restoration Resin",
      description:
        "Versatile resin for various dental restorations with excellent finish and polish.",
      features: [
        "Versatile use",
        "Excellent finish",
        "Easy polishing",
        "Stain resistant",
      ],
    },
    {
      name: "Temporary Material",
      description:
        "Quick-setting temporary resin for provisional restorations.",
      features: ["Fast setting", "Easy removal", "Good fit", "Cost effective"],
    },
  ];

  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="bg-secondary dark:bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">
              Dental <span className="text-brand">Resin Solutions</span>
            </h1>
            <p className="text-xl text-text-muted mb-8 max-w-3xl mx-auto">
              Professional-grade dental resin materials for crowns, bridges, and
              restorations. Our products meet the highest industry standards for
              biocompatibility and durability.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              Our Dental Products
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Comprehensive range of dental resin materials designed for
              professional applications and exceptional patient outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-secondary dark:bg-secondary rounded-lg p-8 shadow-lg border border-border"
              >
                <h3 className="text-2xl font-semibold text-text mb-4">
                  {product.name}
                </h3>
                <p className="text-text-muted mb-6">{product.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-text">Key Features:</h4>
                  <ul className="space-y-1">
                    {product.features.map((feature, featureIndex) => (
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

      {/* Benefits Section */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              Why Choose Our Dental Resins?
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Superior quality and performance for professional dental
              applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">
                Biocompatible
              </h3>
              <p className="text-text-muted">
                All materials meet FDA standards and are safe for oral use.
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">
                Fast Curing
              </h3>
              <p className="text-text-muted">
                Advanced curing technology for quick turnaround times.
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
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">
                Natural Look
              </h3>
              <p className="text-text-muted">
                Excellent color matching and natural appearance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
