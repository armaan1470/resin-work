"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import {
  BsInstagram,
  BsTwitterX,
  BsLinkedin,
  BsFacebook,
} from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

// Form validation schema
const contactFormSchema = z.object({
  phoneNumber: z.string().min(1, "Phone number is required"),
  company: z.string().min(1, "Company is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

const subscribeFormSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;
type SubscribeFormData = z.infer<typeof subscribeFormSchema>;

interface SocialLink {
  icon: React.ReactNode;
  link: string;
  label: string;
}

const Footer: React.FC = () => {
  // Contact form
  const contactForm = useForm<ContactFormData>({
    // resolver: zodResolver(contactFormSchema),
    defaultValues: {
      phoneNumber: "",
      company: "",
      name: "",
      email: "",
      message: "",
    },
  });

  // Subscribe form for desktop
  const subscribeForm = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeFormSchema),
    defaultValues: {
      email: "",
    },
  });

  // Subscribe form for mobile
  const mobileSubscribeForm = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const social: SocialLink[] = [
    // {
    //   icon: <Facebook className="w-6 h-6" />,
    //   link: "https://www.facebook.com/",
    //   label: "Facebook",
    // },
    // {
    //   icon: <Instagram className="w-6 h-6" />,
    //   link: "https://www.instagram.com/",
    //   label: "Instagram",
    // },
    // {
    //   icon: <Twitter className="w-6 h-6" />,
    //   link: "https://twitter.com/",
    //   label: "Twitter",
    // },
    {
      icon: <BsLinkedin />,
      link: "https://www.linkedin.com/",
      label: "LinkedIn",
    },
  ];

  const onContactSubmit = async (data: ContactFormData) => {
    console.log("Contact form submitted:", data);

    // Create form data object for EmailJS
    const formData = {
      phone: data.phoneNumber,
      company: data.company,
      name: data.name,
      email: data.email,
      message: data.message,
    };

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        "service_iy1s31g", // Replace with your EmailJS Service ID
        "template_nhk69on", // Replace with your EmailJS Template ID
        formData,
        "cW06URmefv_pthwVt" // Replace with your EmailJS Public Key
      );

      console.log("Email sent:", result.text);

      if (result.text == "OK") {
        toast(
          "Your message has been sent successfully. We will get back to you soon."
        );
      } else {
        toast(
          "There was an error sending your message. Please try again later."
        );
      }

      // Reset form
      contactForm.reset();
    } catch (error) {
      console.error("Error:", error);
      toast("There was an error sending your message. Please try again later.");
    }
  };

  const onSubscribeSubmit = (data: SubscribeFormData) => {
    console.log("Subscribe form submitted:", data);
    // Handle subscribe form submission
  };

  const onMobileSubscribeSubmit = (data: SubscribeFormData) => {
    console.log("Mobile subscribe form submitted:", data);
    // Handle mobile subscribe form submission
  };

  return (
    <div className="bg-black text-white text-[14px] relative">
      {/* Subscribe Section */}
      <div className="bg-[var(--color-primary)] px-[1.5rem] md:px-[4rem] py-[2rem] md:py-[3rem] grid grid-cols-1 md:grid-cols-2 gap-[2rem]">
        <div className="hidden md:block">
          <div className="flex justify-center flex-col mb-4 md:mb-0">
            <h2 className="text-[28px] md:text-[35px] font-light mb-4">
              Subscribe for latest updates
            </h2>
            <Form {...subscribeForm}>
              <form
                onSubmit={subscribeForm.handleSubmit(onSubscribeSubmit)}
                className="w-full md:w-[80%]"
              >
                <FormField
                  control={subscribeForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your Email Address"
                          className="h-14 py-[0.8rem] px-4 placeholder:opacity-50 rounded border text-[16px] md:text-[20px] border-[#C4C4C4] bg-transparent text-white placeholder-white focus:ring-0 focus:border-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>

        <div className="md:hidden overflow-hidden">
          <h2 className="text-[60px] opacity-20 font-black">CONNECT!</h2>
        </div>

        <div>
          <p className="text-[#FFFFFF]/60 text-[18px] md:text-[22px] mb-4">
            Please fill out the form and we will get back to you.
          </p>

          <Form {...contactForm}>
            <form
              onSubmit={contactForm.handleSubmit(onContactSubmit)}
              className="flex flex-col gap-8"
            >
              {/* Row 1: Phone Number & Company */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:flex-1">
                  <FormField
                    control={contactForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Phone Number *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-11 py-2 px-3 rounded border border-[#C4C4C4] placeholder:opacity-60 bg-transparent text-white placeholder-white focus:ring-0 focus:border-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full md:flex-1">
                  <FormField
                    control={contactForm.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Company *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-11 py-2 px-3 rounded border border-[#C4C4C4] placeholder:opacity-60 bg-transparent text-white placeholder-white focus:ring-0 focus:border-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Row 2: Name & Email */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:flex-1">
                  <FormField
                    control={contactForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Your Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="h-11 py-2 px-3 rounded border border-[#C4C4C4] placeholder:opacity-60 bg-transparent text-white placeholder-white focus:ring-0 focus:border-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full md:flex-1">
                  <FormField
                    control={contactForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Your Email *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="h-11 py-2 px-3 text-white rounded border border-[#C4C4C4] placeholder:opacity-60 bg-transparent placeholder-white focus:ring-0 focus:border-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Row 3: Message & Submit Button (always in one row) */}
              <div className="flex gap-6 items-center">
                <div className="flex-1">
                  <FormField
                    control={contactForm.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Your Message *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={3}
                            className="py-2 px-3 rounded border border-[#C4C4C4] placeholder:opacity-60 bg-transparent text-white placeholder-white focus:ring-0 focus:border-white resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6">
                  <Button
                    type="submit"
                    variant="outline"
                    className="size-12 text-[#C4C4C4] rounded-full hover:bg-transparent hover:text-white"
                  >
                    <ArrowRight className="size-8" />
                  </Button>
                </div>
              </div>
            </form>
          </Form>

          <p className="hidden md:block text-white text-[12px] mt-2">
            * Fields are mandatory
          </p>
        </div>
      </div>

      {/* Mobile Subscribe Section */}
      <div className="w-full md:hidden bg-[#FFF3F0] py-[2rem] flex flex-col justify-center items-center">
        <h2 className="text-[1.5rem] text-[#FF4713] text-center font-bold">
          Subscribe for latest updates
        </h2>

        <Form {...mobileSubscribeForm}>
          <form
            onSubmit={mobileSubscribeForm.handleSubmit(onMobileSubscribeSubmit)}
            className="w-full flex flex-col items-center"
          >
            <FormField
              control={mobileSubscribeForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-[60%] m-[2rem]">
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your Email Address"
                      className="py-2 px-3 rounded border border-[#C4C4C4] placeholder:text-black placeholder:opacity-60 bg-transparent text-black focus:ring-0 focus:border-[#FF4713]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="px-[3rem] bg-[#FF4713] text-[#ffffff] rounded-md py-[0.5rem] md:py-[1rem] my-[0.5rem] md:my-[1rem] hover:bg-[#FF4713]/90"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>

      {/* Desktop Footer Links Section */}
      <div className="hidden md:block">
        <div className="px-[1.5rem] md:px-[6rem] py-[2rem] md:py-[4rem] grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4">
          {/* Logo and Address */}
          <div className="flex flex-col justify-between col-span-3 order-1">
            <div className="flex justify-start">
              <Image
                src="/logo2.svg"
                alt="Logo"
                width={200}
                height={60}
                className="mb-4 w-[80%] md:ms-[-5%]"
              />
            </div>
            <div className="text-white text-[12px] leading-[1.6]">
              <strong className="text-[var(--color-primary)]">INDIA</strong>
              <br />3 AK Chemie Pvt.Ltd.
              <br />5 / B5 / 1, TSIIC Automotive Park,
              <br />
              Kallakal - 502336 Telangana, India.
              {/* <br />
              <br /> */}
              {/* <strong className="text-[var(--color-primary)]">GERMANY</strong>
              <br />
              Graichen Produktions - und Vertriebs GmbH
              <br />
              Darmstädter Str.127, Bensheim 64625, Germany.
              <br />
              Tel.: +49 6251 770788 - 0 */}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-2 order-3 md:order-2">
            <h3 className="text-[16px] text-[var(--color-primary)] font-medium mb-3">
              QUICK LINKS
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/jewellery"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Jewellery
                </Link>
              </li>
              <li>
                <Link
                  href="/dental"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Dental
                </Link>
              </li>
              <li>
                <Link
                  href="/functionality"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Functionality
                </Link>
              </li>
              <li>
                <Link
                  href="/filaments"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Filaments
                </Link>
              </li>
              <li>
                <Link
                  href="/company"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Company
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-2 order-4 md:order-3">
            <h3 className="text-[16px] text-[var(--color-primary)] font-medium mb-3">
              SUPPORT
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/order-status"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Order Status
                </Link>
              </li>
              <li>
                <Link
                  href="/tds-msds"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  TDS / MSDS
                </Link>
              </li>
              <li>
                <Link
                  href="/media-centre"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Media Centre
                </Link>
              </li>
              <li>
                <Link
                  href="/case-studies"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  FAQ's
                </Link>
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div className="col-span-2 order-5 md:order-4 mt-6 md:mt-0">
            <h3 className="text-[16px] text-[var(--color-primary)] font-medium mb-3">
              ABOUT US
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/who-we-are"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Who We Are
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/news-events"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  News & Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-span-3 order-2 md:order-5">
            <h3 className="text-[16px] text-[var(--color-primary)] font-medium mb-3">
              CONTACT US
            </h3>
            <p>
              1800 - 102 - 0525
              <br />
              Mon - Sun - 10 AM - 7 PM
            </p>
            <p className="mt-4">Resellers</p>
          </div>

          {/* Bottom Links and Social */}
          <div className="col-span-12 order-7 flex flex-wrap justify-between items-center mt-10 pt-4">
            <ul className="flex flex-wrap gap-6">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-conditions"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Sitemap
                </Link>
              </li>
            </ul>
            <hr className="h-[.5px] text-[#FFFFFF]/30 w-[50%]" />
            <div className="flex gap-6 text-[24px]">
              {social.map((item, index) => (
                <Link
                  href={item.link}
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF2F00] transition-colors"
                  aria-label={item.label}
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="md:hidden px-5 py-6">
        <div className="flex justify-between gap-4 py-4">
          <Image src="/logo2.svg" alt="Logo" width={120} height={40} />
          <div className="flex gap-6 text-[24px]">
            {social.map((item, index) => (
              <Link
                href={item.link}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF2F00] transition-colors"
                aria-label={item.label}
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[16px] text-[var(--color-primary)] font-medium my-3">
            QUICK LINKS
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <ul>
              <li>
                <Link
                  href="/"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/dental"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Dental
                </Link>
              </li>
              <li>
                <Link
                  href="/functionality"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Functionality
                </Link>
              </li>
              <li>
                <Link
                  href="/filaments"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Filaments
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link
                  href="/diy"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  DIY
                </Link>
              </li>
              <li>
                <Link
                  href="/offer-zone"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Offer Zone
                </Link>
              </li>
              <li>
                <Link
                  href="/featured"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Featured
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-[16px] text-[var(--color-primary)] font-medium my-3">
            SUPPORT
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <ul>
              <li>
                <Link
                  href="/order-status"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Order Status
                </Link>
              </li>
              <li>
                <Link
                  href="/tds-msds"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  TDS / MSDS
                </Link>
              </li>
              <li>
                <Link
                  href="/media-centre"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Media Centre
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link
                  href="/case-studies"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  FAQ's
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-[16px] text-[var(--color-primary)] font-medium my-3">
            COMPANY
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <ul>
              <li>
                <Link
                  href="/who-we-are"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Who We Are
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Solutions
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link
                  href="/news-events"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  News & Events
                </Link>
              </li>
              <li>
                <Link
                  href="/career"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Career
                </Link>
              </li>
              <li>
                <Link
                  href="/resellers"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  Resellers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-[1rem]">
          <h2 className="text-[16px] text-[var(--color-primary)] font-medium my-3">
            CONTACT
          </h2>
          <h3>
            1800 - 102 - 0525{" "}
            <span className="text-[12px]">(Mon - Sun - 10 AM - 7 PM)</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 mb-[1rem]">
          <div>
            <h3 className="text-[16px] text-[var(--color-primary)] font-medium mb-1">
              Information
            </h3>
            <h6>info@resinwork.com</h6>
          </div>
          <div>
            <h3 className="text-[16px] text-[var(--color-primary)] font-medium mb-1">
              Sales
            </h3>
            <h6>sales@resinwork.com</h6>
          </div>
        </div>

        <div>
          <div className="text-white text-[12px] leading-[1.6]">
            <strong className="text-[var(--color-primary)]">INDIA</strong>
            <br />3 AK Chemie Pvt.Ltd.
            <br />5 / B5 / 1, TSIIC Automotive Park,
            <br />
            Kallakal - 502336 Telangana, India.
            {/* <br />
            <br />
            <strong className="text-[var(--color-primary)]">GERMANY</strong>
            <br />
            Graichen Produktions - und Vertriebs GmbH
            <br />
            Darmstädter Str.127, Bensheim 64625, Germany. */}
          </div>
        </div>

        <div className="p-3 pt-10">
          <ul className="flex justify-between">
            <li>
              <Link
                href="/privacy-policy"
                className="hover:text-[var(--color-primary)] transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms-conditions"
                className="hover:text-[var(--color-primary)] transition-colors"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/cookie-policy"
                className="hover:text-[var(--color-primary)] transition-colors"
              >
                cookie policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
