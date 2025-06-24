import Link from "next/link";

export default function Home() {
  const services = [
    {
      title: "Dental Solutions",
      description:
        "Professional dental resin materials for crowns, bridges, and restorations.",
      href: "/dental",
      color: "bg-success",
    },
    {
      title: "Jewellery",
      description:
        "High-quality resin materials for creating beautiful and durable jewellery pieces.",
      href: "/jewellery",
      color: "bg-warning",
    },
    {
      title: "Functional Applications",
      description:
        "Industrial-grade resin solutions for functional and structural applications.",
      href: "/functionality",
      color: "bg-info",
    },
    {
      title: "Filaments",
      description:
        "Premium 3D printing filaments for professional and hobbyist use.",
      href: "/filaments",
      color: "bg-danger",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-secondary dark:bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-text mb-6">
              Professional
              <span className="text-brand block">Resin Solutions</span>
            </h1>
            <p className="text-xl text-text-muted mb-8 max-w-3xl mx-auto">
              Leading provider of high-quality resin materials for dental,
              jewellery, and functional applications. We specialize in
              innovative resin technology and premium filaments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/company"
                className="bg-brand hover:bg-brand-dark text-text-light px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Learn More
              </Link>
              <Link
                href="/dental"
                className="border border-border text-text hover:bg-accent px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              Our Services
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Discover our comprehensive range of resin solutions designed for
              professional applications and creative projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="group bg-secondary dark:bg-secondary rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border"
              >
                <div
                  className={`w-12 h-12 ${service.color} rounded-lg mb-4 flex items-center justify-center`}
                >
                  <svg
                    className="w-6 h-6 text-text-light"
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
                <h3 className="text-xl font-semibold text-text mb-2 group-hover:text-brand transition-colors">
                  {service.title}
                </h3>
                <p className="text-text-muted">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
              Why Choose Resin Work?
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              We provide the highest quality resin materials with exceptional
              customer service and technical support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand rounded-full mx-auto mb-4 flex items-center justify-center">
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
                Quality Assured
              </h3>
              <p className="text-text-muted">
                All our products meet the highest industry standards and undergo
                rigorous quality control processes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand rounded-full mx-auto mb-4 flex items-center justify-center">
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
                Fast Delivery
              </h3>
              <p className="text-text-muted">
                Quick and reliable shipping to get your materials to you when
                you need them.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand rounded-full mx-auto mb-4 flex items-center justify-center">
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
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">
                Expert Support
              </h3>
              <p className="text-text-muted">
                Our technical team is always available to help with product
                selection and application guidance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
