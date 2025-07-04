"use client";

// src/components/home-secions/BlogsSection.jsx
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const BlogsSection = () => {
  const [activeTab, setActiveTab] = useState("blogs");

  const blogData = [
    {
      id: 1,
      date: "02 dec 2024",
      title: "What does the next decade of 3D printing look like?",
      desc: "Additive manufacturing, commonly known as 3D printing, has already revolutionized industries ranging from aerospace to healthcare.",
    },
    {
      id: 2,
      date: "02 dec 2024",
      title: "Dental",
      desc: "Let's dive into how resin manufacturing is reshaping the dental landscape and why it's becoming an indispensable tool for modern dental practices.",
    },
    {
      id: 3,
      date: "02 dec 2024",
      title: "Jewellery",
      desc: "Choosing the Right Resin for Jewellery Wax Models: A Comprehensive Guide",
    },
  ];

  const caseStudyData = [
    {
      id: 1,
      date: "15 jan 2024",
      title: "3D Printing in Aerospace: A Case Study",
      desc: "How our resin solutions helped reduce aircraft component weight by 30% while maintaining structural integrity.",
    },
    {
      id: 2,
      date: "22 mar 2024",
      title: "Dental Implant Success Story",
      desc: "Case study on how our dental resins improved precision and reduced production time by 40% for a major dental lab.",
    },
    {
      id: 3,
      date: "05 may 2024",
      title: "Custom Jewelry Manufacturing",
      desc: "How a luxury jewelry brand scaled production using our high-resolution casting resins.",
    },
  ];

  const currentData = activeTab === "blogs" ? blogData : caseStudyData;

  return (
    <div className="relative z-30">
      <div className="hidden md:block p-[4rem] pt-[13rem] relative ">
        <div className="grid grid-cols-12 bg-white rounded-xl s1">
          <div className="col-span-4 p-[3rem]">
            <div className="flex items-center justify-start gap-4">
              <button
                className={`  ${
                  activeTab === "blogs"
                    ? "text-[var(--color-primary)] text-[1rem] font-medium"
                    : "text-gray-500 text-[.8rem]"
                }`}
                onClick={() => setActiveTab("blogs")}
              >
                Our Blogs
              </button>
              <button
                className={`${
                  activeTab === "caseStudies"
                    ? "text-[var(--color-primary)] text-[1rem] font-medium"
                    : "text-gray-500 text-[.8rem]"
                }`}
                onClick={() => setActiveTab("caseStudies")}
              >
                Case Studies
              </button>
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
            <button className="b1 text-white px-[3rem] py-[.51rem] rounded-lg my-[1.4rem]">
              {activeTab === "blogs"
                ? "Explore More Blogs"
                : "View All Case Studies"}
            </button>
            <img src="/images/blog.png" alt="" className="rounded-lg" />
          </div>
          <div className="col-span-8 p-[3rem]">
            {currentData.map((item) => (
              <div
                key={item.id}
                className="p-[2rem] border-b-[1px] border-gray-400 last:border-b-0"
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
                    <button className="rounded-lg text-[.8rem] text-red-500">
                      Learn More
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
      <div className="md:hidden bg-white">
        <div className="flex items-center justify-center gap-4 pt-[3rem] pb-[1rem]">
          <button
            className={`text-[20px] font-bold ${
              activeTab === "blogs" ? "text-gray-600" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("blogs")}
          >
            Our Blogs
          </button>
          <button
            className={`text-[20px] font-bold ${
              activeTab === "caseStudies" ? "text-gray-600" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("caseStudies")}
          >
            Case Studies
          </button>
        </div>
        <h2 className="text-[35px] text-gray-600 font-bold text-center">
          {activeTab === "blogs" ? "Featured Blog" : "Case Studies"} <br />
          {activeTab === "blogs" ? "Heading" : "Showcase"}
        </h2>
        <div className="p-[2rem]">
          {currentData.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-2 bg-[#4F4F4F] p-[1rem] rounded-lg py-[1.42rem] my-[.41rem]"
            >
              <h2 className="col-span-10 text-white font-bold">{item.title}</h2>
              <div className="col-span-2 flex items-center justify-end text-white">
                <ChevronDown />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <button className="b1 mx-auto text-white px-[3rem] py-[.51rem] rounded-lg my-[1.4rem] font-bold">
            {activeTab === "blogs"
              ? "Explore More Blogs"
              : "View All Case Studies"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogsSection;
