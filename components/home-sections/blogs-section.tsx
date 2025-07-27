"use client";

// src/components/home-secions/BlogsSection.tsx
import React, { useState } from "react";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";

interface BlogItem {
  id: number;
  date: string;
  title: string;
  desc: string;
}

type TabType = "blogs" | "caseStudies";

const BlogsSection: React.FC = () => {
  const t = useTranslations("BlogSection");
  const [activeTab, setActiveTab] = useState<TabType>("blogs");
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const blogData: BlogItem[] = [
    {
      id: 1,
      date: t("data.1.date"),
      title: t("data.1.title"),
      desc: t("data.1.desc"),
    },
    {
      id: 2,
      date: t("data.2.date"),
      title: t("data.2.title"),
      desc: t("data.2.desc"),
    },
    {
      id: 3,
      date: t("data.3.date"),
      title: t("data.3.title"),
      desc: t("data.3.desc"),
    },
  ];

  const caseStudyData: BlogItem[] = [
    {
      id: 1,
      date: t("data.4.date"),
      title: t("data.4.title"),
      desc: t("data.4.desc"),
    },
    {
      id: 2,
      date: t("data.5.date"),
      title: t("data.5.title"),
      desc: t("data.5.desc"),
    },
    {
      id: 3,
      date: t("data.6.date"),
      title: t("data.6.title"),
      desc: t("data.6.desc"),
    },
  ];

  const currentData = activeTab === "blogs" ? blogData : caseStudyData;

  const toggleAccordion = (id: number): void => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="relative z-30">
      {/* Desktop Version */}
      <div className="hidden md:block p-[4rem] pt-[13rem] relative">
        <div className="grid grid-cols-12 bg-white rounded-xl shadow-lg">
          <div className="col-span-4 p-[3rem]">
            {/* Elegant Desktop Tab Navigation */}
            <div className="relative mb-8">
              {/* Tab Navigation */}
              <div className="flex justify-start mb-12">
                <div className="relative bg-white/70 backdrop-blur-xl rounded-full p-2 shadow-lg border border-white/50">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab("blogs")}
                      className={`relative cursor-pointer px-8 py-4 rounded-full font-medium transition-all duration-500 ${
                        activeTab === "blogs"
                          ? "text-white"
                          : "text-gray-600 hover:text-brand"
                      }`}
                    >
                      {activeTab === "blogs" && (
                        <div className="absolute inset-0 bg-brand rounded-full shadow-lg transform scale-105 transition-transform duration-500"></div>
                      )}
                      <span className="relative z-10"> {t("blog")}</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("caseStudies")}
                      className={`relative cursor-pointer px-8 py-4 rounded-full font-medium transition-all duration-500 ${
                        activeTab === "caseStudies"
                          ? "text-white"
                          : "text-gray-600 hover:text-brand"
                      }`}
                    >
                      {activeTab === "caseStudies" && (
                        <div className="absolute inset-0 bg-brand rounded-full shadow-lg transform scale-105 transition-transform duration-500"></div>
                      )}
                      <span className="relative z-10">{t("case")}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Subtle underline indicator */}
              {/* <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-30"></div> */}
            </div>

            <h4 className="text-[1.9rem] text-black font-normal line-clamp-2 mt-[1.4rem] mb-[1rem]">
              {activeTab === "blogs"
                ? "Featured Blog Heading Blog Heading Lorem Ipsum is simply dummy text"
                : "Featured Case Studies Showcasing Our Solutions"}
            </h4>
            <p className="text-[.91rem] text-black/80">
              {activeTab === "blogs"
                ? "Featured Blog Heading Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                : "Explore real-world applications of our products through these detailed case studies demonstrating innovation and problem-solving across industries."}
            </p>
            <button className="b1 text-white bg-brand cursor-pointer px-[3rem] py-[.51rem] rounded-lg my-[1.4rem] hover:opacity-60 transition-opacity">
              {activeTab === "blogs" ? t("button.explor") : t("button.view")}
            </button>
            <img
              src="/images/blog.png"
              alt="Blog featured image"
              className="rounded-lg w-full object-cover"
            />
          </div>
          <div className="col-span-8 p-[3rem]">
            {currentData.map((item: BlogItem) => (
              <div
                key={item.id}
                className="p-[2rem] border-b-[1px] border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-2">
                    <h4 className="text-[1rem] text-black/60 font-thin">
                      {item.date}
                    </h4>
                  </div>
                  <div className="col-span-8 px-[1rem]">
                    <h4 className="text-[1.3rem] font-medium line-clamp-2 text-black/60">
                      {item.title}
                    </h4>
                  </div>
                  <div className="col-span-2">
                    <button className="rounded-lg text-[.8rem] text-red-500 hover:text-red-600 transition-colors">
                      {t("leanr")}
                    </button>
                  </div>
                  <h4 className="col-span-12 text-black/60 text-[1rem] font-light text-start">
                    {item.desc}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
        {/* Mobile Header */}
        <div className="p-6 text-center">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-2xl p-1 shadow-sm border border-gray-200 w-full max-w-sm">
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => setActiveTab("blogs")}
                  className={`py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 ${
                    activeTab === "blogs"
                      ? "text-white bg-[var(--color-primary)] shadow-md"
                      : "text-gray-600"
                  }`}
                >
                  {t("blog")}
                </button>
                <button
                  onClick={() => setActiveTab("caseStudies")}
                  className={`py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 ${
                    activeTab === "caseStudies"
                      ? "text-white bg-[var(--color-primary)] shadow-md"
                      : "text-gray-600"
                  }`}
                >
                  {t("case")}
                </button>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-light text-gray-900 mb-4">
            {activeTab === "blogs"
              ? "Featured Blog Heading"
              : "Case Studies Showcase"}
          </h2>
        </div>

        {/* Mobile Content */}
        <div className="p-6">
          <div className="space-y-3">
            {currentData.map((item: BlogItem) => (
              <div
                key={item.id}
                className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg"
              >
                <button
                  className="w-full p-6 text-left hover:bg-gray-800 transition-colors duration-200"
                  onClick={() => toggleAccordion(item.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <h3 className="text-lg font-medium text-white mb-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white">
                        {openAccordion === item.id ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                    </div>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    openAccordion === item.id
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-4"></div>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {item.desc}
                    </p>
                    <button className="text-red-400 hover:text-red-300 font-medium text-sm transition-colors duration-200">
                      {t("leanr")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="text-center mt-8">
            <button className="bg-[var(--color-primary)] hover:opacity-90 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg">
              {activeTab === "blogs" ? t("button.explor") : t("button.view")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsSection;
