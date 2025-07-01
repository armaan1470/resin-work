import { ChevronDown } from "lucide-react";
import React from "react";

const BlogsSection = () => {
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

  return (
    <div>
      <div className="hidden md:block p-[4rem] pt-[13rem] relative z-20">
        <div className="grid grid-cols-12 bg-white text-black rounded-xl s1">
          <div className="col-span-4 p-[3rem]">
            <div className="flex items-center justify-start gap-2">
              <h4 className="text-[1rem] font-medium text-[var(--color-primary)]">
                Our Bogs
              </h4>
              <h4 className="font-light  text-[.8rem]">Case Studies</h4>
            </div>
            <h4 className="text-[1.9rem] font-normal line-clamp-2 mt-[1.4rem] mb-[1rem]">
              Featured Blog Heading Blog Heading Lorem Ipsum is simply dummy
              text
            </h4>
            <p className="text-[.91rem]">
              Featured Blog Heading Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s.
            </p>
            <button className="b1 text-white px-[3rem] py-[.51rem] rounded-lg my-[1.4rem]">
              Explore More
            </button>
            <img src="/images/blog.png" alt="" className="rounded-lg" />
          </div>
          <div className="col-span-8 p-[3rem]">
            {blogData.map((item, index) => (
              <div
                key={index}
                className="p-[2rem] border-b-[1px] border-gray-400 last:border-b-0"
              >
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-2">
                    <h4 className=" text-[1rem] font-thin">{item.date}</h4>
                  </div>
                  <div className="col-span-8 px-[1rem]">
                    <h4 className=" text-[1.3rem] font-medium line-clamp-2">
                      {item.title}
                    </h4>
                  </div>
                  <div className="col-span-2">
                    <button className=" rounded-lg text-[.8rem] text-red-500">
                      Learn More
                    </button>
                  </div>
                  <h4 className="col-span-12 text-[1rem]  font-light text-start">
                    {item.desc}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <div className="flex items-center justify-center gap-2 pt-[3rem] pb-[1rem]">
          <h2 className="text-[20px] text-gray-600 font-bold">Our Blogs</h2>
          <h2 className="text-[20px] text-gray-400 font-bold">Case Studies</h2>
        </div>
        <h2 className="text-[35px] text-gray-600 font-bold text-center">
          Featured Blog <br />
          Heading
        </h2>
        <div className="p-[2rem]">
          <div className="grid grid-cols-12 gap-2 bg-[#4F4F4F] p-[1rem] rounded-lg py-[1.42rem] my-[.41rem]">
            <h2 className="col-span-10 text-white font-bold">
              What does the next decade of 3D printing look like?
            </h2>
            <div className="col-span-2 flex items-center justify-end text-white">
              {" "}
              <ChevronDown />{" "}
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2 bg-[#4F4F4F] p-[1rem] rounded-lg py-[1.42rem] my-[.41rem]">
            <h2 className="col-span-10 text-white font-bold">Dental</h2>
            <div className="col-span-2 flex items-center justify-end text-white">
              {" "}
              <ChevronDown />{" "}
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2 bg-[#4F4F4F] p-[1rem] rounded-lg py-[1.42rem] my-[.41rem]">
            <h2 className="col-span-10 text-white font-bold">Jewellery</h2>
            <div className="col-span-2 flex items-center justify-end text-white">
              {" "}
              <ChevronDown />{" "}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button className="b1 mx-auto text-white px-[3rem] py-[.51rem] rounded-lg my-[1.4rem] font-bold">
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogsSection;
