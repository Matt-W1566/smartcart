"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  CurrencyDollarIcon,
  GiftIcon,
  SparklesIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  CameraIcon,
  MapPinIcon,
  HeartIcon,
  ChevronDoubleDownIcon,
  Bars3Icon,
  XMarkIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

const APP_NAME = "CartSmart";

interface TypingEffectProps {
  texts: string[];
  className?: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ texts, className }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const word = texts[wordIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(word.substring(0, displayedText.length + 1));
        setTypingSpeed(100);

        if (displayedText === word) {
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        setDisplayedText(word.substring(0, displayedText.length - 1));
        setTypingSpeed(75);

        if (displayedText === "") {
          setIsDeleting(false);
          setWordIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, typingSpeed, texts, wordIndex]);

  return <span className={className}>{displayedText}</span>;
};

const useIntersectionObserver = () => {
  useEffect(() => {
    interface IntersectionObserverEntryWithTarget
      extends IntersectionObserverEntry {
      target: Element;
    }

    const callback = (entries: IntersectionObserverEntryWithTarget[]): void => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, []);
};

const AnimatedCounter = ({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number | string;
  suffix?: string;
  prefix?: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value.toString());
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      setCount(Math.min(Math.floor(start), end));

      if (start >= end) clearInterval(timer);
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="font-bold">
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export default function HomePage() {
  useIntersectionObserver();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      name: "Smart Cart Builder",
      description:
        "Intuitively add items to your list. Specific brands or general products - we find the best deals.",
      icon: ShoppingBagIcon,
      color: "from-emerald-400 to-emerald-600",
    },
    {
      name: "Multi-Store Optimizer",
      description:
        "You decide the number of stops. We map out the most cost-effective routes.",
      icon: MapPinIcon,
      color: "from-teal-400 to-teal-600",
    },
    {
      name: "Real-Time Price Hunter",
      description:
        "Our system constantly scans major Canadian grocers for up-to-the-minute deals.",
      icon: MagnifyingGlassIcon,
      color: "from-green-400 to-green-600",
    },
    {
      name: "Recipe & Image Scan",
      description:
        "Snap a photo or paste a recipe link. We'll instantly populate your shopping list.",
      icon: CameraIcon,
      color: "from-lime-400 to-lime-600",
    },
    {
      name: "Savings & Impact Meter",
      description:
        "Track your savings and see how you contribute to UNSDG 2 by reducing food costs.",
      icon: CurrencyDollarIcon,
      color: "from-cyan-400 to-cyan-600",
    },
    {
      name: "Give Back Your Savings",
      description:
        "Optionally, donate a portion of your saved money to charities tackling food insecurity.",
      icon: GiftIcon,
      color: "from-green-400 to-green-600",
    },
  ];

  const howItWorksSteps = [
    {
      title: "1. List Your Groceries",
      description:
        "Type, scan a recipe, or upload an image of your shopping list.",
      icon: ShoppingBagIcon,
      color: "from-emerald-400 to-emerald-600",
    },
    {
      title: "2. Customize Your Search",
      description:
        "Set preferred locations, max store visits, and any dietary filters.",
      icon: ShieldCheckIcon,
      color: "from-teal-400 to-teal-600",
    },
    {
      title: "3. Uncover Max Savings",
      description:
        "Receive your optimized shopping plan, detailing stores, prices, and total savings.",
      icon: SparklesIcon,
      color: "from-green-400 to-green-600",
    },
  ];

  const heroDynamicWords = ["Smarter", "Cheaper", "Greener"];

  const statsData = [
    { value: "32", suffix: "%", label: "Average Savings" },
    { value: "125000", suffix: "+", label: "Active Users" },
    { value: "3.2", suffix: "M", label: "Total Saved" },
  ];
  return (
    <div>
      <Head>
        <title>{APP_NAME}</title>
        <meta
          name="description"
          content={`Revolutionize your grocery shopping with ${APP_NAME}. Find the absolute cheapest cart across Canadian stores and fight food inflation. Supports UNSDG 2.`}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Navbar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
          scrollPosition > 50
            ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center gap-2 group">
                <span className="text-2xl transform group-hover:rotate-[20deg] transition-all duration-500 ease-bounce">
                  🌿
                </span>
                <span
                  className={`text-2xl md:text-3xl font-extrabold transition-all duration-500 ${
                    scrollPosition > 50
                      ? "bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent"
                      : "text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 animate-gradient-shift"
                  }`}
                >
                  {APP_NAME}
                </span>
              </div>
            </Link>
            <div className="hidden md:flex items-center">
              <Link
                href="/search"
                className="relative overflow-hidden ml-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold py-2 px-5 rounded-full shadow-lg
                hover:shadow-emerald-500/30 transition-all duration-500 transform hover:scale-105 hover:translate-y-[-2px] group btn-shimmer p-4!"
              >
                <span className="flex items-center relative z-10">
                  Start Saving
                  <ArrowRightIcon className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(255_255_255_/_0.15)_1px,_transparent_0)] bg-[length:24px_24px]"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10 pt-24 pb-12">
          <div className="relative inline-block mb-8">
            <div className="relative inline-flex rounded-full bg-gradient-to-br from-emerald-400/20 to-green-400/10 p-4 backdrop-blur-sm mb-6 animate-float group transform hover:scale-105 transition-all duration-500">
              <ShoppingBagIcon className="w-16 h-16 md:w-20 md:h-20 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
              <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-xl animate-subtle-pulse">
                <SparklesIcon className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight tracking-tight animate-hero-text-pop text-white">
            Shop{" "}
            <span className="relative inline-block">
              <TypingEffect
                texts={heroDynamicWords}
                className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 animate-gradient-shift"
              />
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded opacity-70"></span>
            </span>
            . <span className="block sm:inline">Not Harder.</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto text-emerald-100/90 font-light leading-relaxed animate-hero-text-pop animation-delay-1000">
            {APP_NAME} scours Canadian grocery stores to find you the{" "}
            <strong className="font-semibold text-white relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-emerald-400/50">
              absolute lowest prices
            </strong>
            , helping you save big and eat healthy.
          </p>

          {/* Enhanced CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 opacity-0 animate-fade-in-up animation-delay-600">
            <Link
              href="/search"
              className="group relative bg-white text-emerald-900 font-bold py-4 px-8 rounded-xl text-lg 
                       shadow-2xl shadow-emerald-900/20 hover:shadow-emerald-500/30 
                       transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 
                       focus:outline-none focus:ring-4 focus:ring-emerald-500/30 
                       overflow-hidden btn-shimmer"
            >
              <span className="flex items-center relative z-10">
                Find My Cheapest Cart
                <ArrowRightIcon className="w-5 h-5 ml-3 transform group-hover:translate-x-2 transition-transform duration-500" />
              </span>
            </Link>

            <Link
              href="#how-it-works"
              className="group bg-emerald-800/30 backdrop-blur-sm text-white font-semibold py-4 px-8 
                       rounded-xl text-lg border border-emerald-700/50
                       hover:bg-emerald-800/50 hover:border-emerald-600/50 
                       transition-all duration-300 flex items-center"
            >
              How It Works
              <ChevronDoubleDownIcon className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Enhanced social proof */}
          <div
            className="inline-flex items-center justify-center space-x-4 bg-white/10 backdrop-blur-sm 
                        py-4 px-8 rounded-2xl text-sm text-emerald-100 animate-fade-in animation-delay-800
                        border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300"
          >
            <div className="flex -space-x-3">
              {["T", "S", "M", "+"].map((letter, index) => (
                <div
                  key={letter}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold
                            shadow-lg transform hover:scale-110 hover:-translate-y-1 transition-all duration-300
                            bg-gradient-to-br ${
                              index === 0
                                ? "from-emerald-400 to-emerald-600"
                                : index === 1
                                ? "from-emerald-500 to-emerald-700"
                                : index === 2
                                ? "from-emerald-600 to-emerald-800"
                                : "from-emerald-700 to-emerald-900"
                            }`}
                >
                  {letter}
                </div>
              ))}
            </div>
            <span className="ml-2">
              Joined by{" "}
              <strong className="text-white bg-emerald-500/20 px-2 py-0.5 rounded-md">
                125,000+
              </strong>{" "}
              savvy shoppers
            </span>
            <div className="flex items-center ml-2">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className="w-4 h-4 text-yellow-400 transform hover:scale-125 transition-transform duration-300"
                />
              ))}
              <span className="ml-2 font-semibold text-white">4.9</span>
            </div>
          </div>

          {/* Enhanced scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animation-delay-1000">
            <Link
              href="#problem"
              className="group flex flex-col items-center space-y-2 text-emerald-300/70 
                       hover:text-white transition-colors duration-300"
              aria-label="Scroll to learn more"
            >
              <span className="text-sm font-medium">Scroll to learn more</span>
              <ChevronDoubleDownIcon
                className="w-6 h-6 animate-bounce-slow group-hover:animate-none 
                                            group-hover:translate-y-1 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section
        id="stats"
        className="relative py-24 bg-gradient-to-b from-emerald-50 via-white to-white overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(16_185_129_/_0.05)_1px,_transparent_0)] bg-[length:32px_32px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {statsData.map((stat, index) => (
                <div key={index} className="relative group">
                  {/* Card background with gradient border */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                  <div
                    className="relative p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl border border-emerald-100/50 
                               transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll animate-fade-in-up"
                    style={{ animationDelay: `${0.1 + index * 0.2}s` }}
                  >
                    <div className="relative">
                      <div className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                        <AnimatedCounter
                          value={stat.value}
                          suffix={stat.suffix}
                        />
                      </div>
                      <p className="text-gray-600 font-medium text-lg">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
      </section>

      {/* Problem Statement & UNSDG Link Section */}
      <section id="problem" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-full mb-6 animate-on-scroll animate-fade-in-down">
              <HeartIcon className="w-8 h-8 text-emerald-600" />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-6 animate-on-scroll animate-fade-in-up">
              Tired of Pricey Groceries?
            </h2>

            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-12 animate-on-scroll animate-fade-in-up animation-delay-200">
              Canadian families face soaring food costs and a monopolized
              market. {APP_NAME} gives you the power back, finding true savings
              store by store. We're dedicated to making food more affordable,
              aligning with{" "}
              <strong className="text-emerald-700">
                UNSDG 2: End World Hunger
              </strong>
              .
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 animate-on-scroll animate-fade-in-up animation-delay-300">
              {[
                {
                  icon: CurrencyDollarIcon,
                  text: "Real Savings",
                  description: "Average 32% reduction in grocery bills",
                  color: "from-emerald-500 to-emerald-700",
                },
                {
                  icon: SparklesIcon,
                  text: "Smarter Choices",
                  description: "AI-powered price comparison across stores",
                  color: "from-teal-500 to-teal-700",
                },
                {
                  icon: GiftIcon,
                  text: "Community Impact",
                  description: "Support food security initiatives",
                  color: "from-green-500 to-green-700",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl border border-emerald-100 transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div
                    className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br ${item.color} p-3 shadow-lg`}
                  >
                    <item.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-emerald-900 mb-2">
                    {item.text}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500"></div>
      </section>

      {/* How It Works Section - with staggered animations */}
      <section
        id="how-it-works"
        className="py-24 bg-emerald-900 text-white overflow-hidden"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6 backdrop-blur-sm animate-on-scroll animate-fade-in-down">
              <CheckCircleIcon className="w-8 h-8 text-emerald-300" />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-on-scroll animate-fade-in-up">
              How {APP_NAME} Works Its Magic
            </h2>

            <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto animate-on-scroll animate-fade-in-up animation-delay-200">
              Grocery savings in three simple, powerful steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div
                key={step.title}
                className="text-center relative animate-on-scroll animate-fade-in-up"
                style={{ animationDelay: `${0.3 + index * 0.2}s` }}
              >
                <div className="relative mb-8">
                  {/* Connection line between steps */}
                  {index < howItWorksSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-emerald-700 z-0">
                      <div className="absolute right-0 -mt-1 w-2 h-2 bg-emerald-500 rounded-full"></div>
                    </div>
                  )}

                  <div
                    className={`bg-gradient-to-br ${step.color} text-white rounded-2xl p-6 w-24 h-24 mx-auto flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 z-10 relative`}
                  >
                    <step.icon className="w-12 h-12" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white">
                  {step.title}
                </h3>

                <p className="text-emerald-100 text-lg">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Action button */}
          <div className="text-center mt-16">
            <Link
              href="/search"
              className="inline-flex items-center bg-white text-emerald-900 font-bold py-3 px-8 rounded-xl hover:bg-emerald-100 transition-colors duration-300 shadow-lg animate-on-scroll animate-fade-in-up animation-delay-800"
            >
              Try It Now
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
