"use client";

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
  AdjustmentsHorizontalIcon,
  CameraIcon,
  LinkIcon,
  MapPinIcon,
  ChevronDoubleDownIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import TypingEffect from "./components/TypingEffect";

const APP_NAME = "CartSmart";

export default function HomePage() {
  const features = [
    {
      name: "Smart Cart Builder",
      description:
        "Intuitively add items to your list. Specific brands or general products – we find the best deals.",
      icon: ShoppingBagIcon,
    },
    {
      name: "Multi-Store Optimizer",
      description:
        "You decide the number of stops. We map out the most cost-effective routes.",
      icon: MapPinIcon,
    },
    {
      name: "Real-Time Price Hunter",
      description:
        "Our system constantly scans major Canadian grocers for up-to-the-minute deals.",
      icon: MagnifyingGlassIcon,
    },
    {
      name: "Recipe & Image Scan",
      description:
        "Snap a photo or paste a recipe link. We'll instantly populate your shopping list.",
      icon: CameraIcon,
    },
    {
      name: "Savings & Impact Meter",
      description:
        "Track your savings and see how you contribute to UNSDG 2 by reducing food costs.",
      icon: CurrencyDollarIcon,
    },
    {
      name: "Give Back Your Savings",
      description:
        "Optionally, donate a portion of your saved money to charities tackling food insecurity.",
      icon: GiftIcon,
    },
  ];

  const howItWorksSteps = [
    {
      title: "1. List Your Groceries",
      description:
        "Type, scan a recipe, or upload an image of your shopping list.",
      icon: AdjustmentsHorizontalIcon,
    },
    {
      title: "2. Customize Your Search",
      description:
        "Set preferred locations, max store visits, and any dietary filters.",
      icon: ShieldCheckIcon,
    },
    {
      title: "3. Uncover Max Savings",
      description:
        "Receive your optimized shopping plan, detailing stores, prices, and total savings.",
      icon: SparklesIcon,
    },
  ];

  const heroDynamicWords = ["Smarter", "Cheaper", "Greener"];

  return (
    <>
      <Head>
        <title>
          {APP_NAME} | Harvest Savings, Not Bills | Canadian Grocery App
        </title>
        <meta
          name="description"
          content={`Revolutionize your grocery shopping with ${APP_NAME}. Find the absolute cheapest cart across Canadian stores and fight food inflation. Supports UNSDG 2.`}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          // crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Navbar - Enhanced with subtle transparency and shadow on scroll */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center group">
                {/* Replace with an actual SVG logo if you have one */}
                <span className="text-3xl font-extrabold text-brand-green-darkest group-hover:text-brand-green-dark transition-colors">
                  {APP_NAME}
                </span>
                <span className="text-2xl ml-1.5 transform group-hover:rotate-[20deg] transition-transform duration-300">
                  🌿
                </span>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-2">
              <Link
                href="#features"
                className="text-brand-gray-dark hover:text-brand-green-dark px-3 py-2 rounded-md text-sm font-semibold transition-colors"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-brand-gray-dark hover:text-brand-green-dark px-3 py-2 rounded-md text-sm font-semibold transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="/search"
                className="ml-4 bg-brand-green-dark hover:bg-brand-green-darker text-white font-semibold py-2.5 px-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 btn-shimmer"
              >
                Start Saving Now
              </Link>
            </div>
            {/* Mobile menu button (optional, for future expansion) */}
            <div className="md:hidden">
              <Link
                href="/search"
                className="bg-brand-green-dark hover:bg-brand-green-darker text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 btn-shimmer text-sm"
              >
                Start Saving
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Enhanced with better gradient and animations */}
      <header className="relative overflow-hidden bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-brand-green-deep via-brand-green-darker to-brand-green-dark text-white min-h-[85vh] md:min-h-[90vh] flex items-center justify-center pt-20 pb-16">
        {/* Animated background shapes */}
        <div className="absolute inset-0">
          <div className="absolute w-96 h-96 -top-48 -left-48 bg-brand-green-light/20 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-brand-green-light/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-green-light/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="relative inline-block mb-4">
            <ShoppingBagIcon className="w-20 h-20 md:w-24 md:h-24 mx-auto text-brand-green-light animate-float" />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center transform rotate-12 animate-bounce-slow">
              <span className="text-brand-green-dark text-xl">💰</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight tracking-tight opacity-0 animate-hero-text-pop">
            Shop{" "}
            <TypingEffect
              texts={heroDynamicWords}
              className="text-brand-green-light"
            />
            . <span className="block sm:inline">Not Harder.</span>
          </h1>
          <p
            className="text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto text-green-100 font-light opacity-0 animate-hero-text-pop"
            style={{ animationDelay: "0.5s" }}
          >
            {APP_NAME} scours Canadian grocery stores to find you the absolute{" "}
            <strong className="font-semibold text-white">lowest prices</strong>,
            helping you save big and eat well.
          </p>
          <Link
            href="/search"
            className="bg-white text-brand-green-darkest font-bold py-4 px-10 rounded-xl text-lg shadow-2xl hover:bg-green-50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-green-light focus:ring-opacity-50 inline-flex items-center group opacity-0 animate-fade-in-up btn-shimmer"
            style={{ animationDelay: "0.8s" }}
          >
            Find My Cheapest Cart
            <ArrowRightIcon className="w-6 h-6 ml-3 transform group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>

          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "1.2s" }}
          >
            <Link href="#problem" aria-label="Scroll to learn more">
              <ChevronDoubleDownIcon className="w-8 h-8 text-white/70 hover:text-white animate-bounce" />
            </Link>
          </div>
        </div>
      </header>

      {/* Problem Statement & UNSDG Link Section */}
      <section id="problem" className="py-20 md:py-28 bg-brand-gray-lightest">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <HeartIcon className="w-12 h-12 text-brand-green mx-auto mb-4 animate-on-scroll is-visible animate-fade-in-down" />{" "}
            {/* Pre-set is-visible for first content section */}
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-green-darkest mb-6 animate-on-scroll is-visible animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Tired of Pricey Groceries?
            </h2>
            <p
              className="text-lg md:text-xl text-brand-gray-dark max-w-2xl mx-auto mb-8 animate-on-scroll is-visible animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Canadian families face soaring food costs and a monopolized
              market. {APP_NAME} gives you the power back, finding true savings
              store by store. We're dedicated to making food more affordable,
              aligning with{" "}
              <strong className="text-brand-green-darker">
                UNSDG 2: End World Hunger
              </strong>
              .
            </p>
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-on-scroll is-visible animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              {[
                { icon: CurrencyDollarIcon, text: "Real Savings" },
                { icon: SparklesIcon, text: "Smarter Choices" },
                { icon: GiftIcon, text: "Community Impact" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-brand-green/20 border border-transparent hover:border-brand-green-light transition-all duration-300 transform hover:-translate-y-1"
                >
                  <item.icon className="w-10 h-10 text-brand-green mx-auto mb-3" />
                  <p className="font-semibold text-lg text-brand-green-darker">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - with staggered animations */}
      <section
        id="how-it-works"
        className="py-20 md:py-28 bg-white overflow-hidden"
      >
        {" "}
        {/* overflow-hidden for animations */}
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-green-darkest mb-5 animate-on-scroll animate-fade-in-down">
              How {APP_NAME} Works Its Magic
            </h2>
            <p
              className="text-lg md:text-xl text-brand-gray-dark max-w-2xl mx-auto animate-on-scroll animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Grocery savings in three simple, powerful steps.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {howItWorksSteps.map((step, index) => (
              <div
                key={step.title}
                className={`text-center p-8 bg-brand-green-lightest rounded-2xl shadow-xl hover:shadow-brand-green/30 transition-all duration-300 transform hover:-translate-y-2 group animate-on-scroll animate-fade-in-up`}
                style={{ animationDelay: `${0.2 + index * 0.2}s` }} // Staggered delay
              >
                <div className="bg-gradient-to-br from-brand-green to-brand-green-dark text-white rounded-full p-5 w-20 h-20 mx-auto mb-8 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-semibold text-brand-green-darkest mb-3">
                  {step.title}
                </h3>
                <p className="text-brand-gray-dark text-md">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced cards with hover effects */}
      <section
        id="features"
        className="py-20 md:py-28 bg-brand-gray-lightest overflow-hidden"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-green-darkest mb-5 animate-on-scroll animate-fade-in-down">
              Unlock Powerful Savings Tools
            </h2>
            <p
              className="text-lg md:text-xl text-brand-gray-dark max-w-2xl mx-auto animate-on-scroll animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              {APP_NAME} is more than just a price checker – it's your grocery
              co-pilot.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.name}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group animate-on-scroll animate-fade-in transform hover:-translate-y-2 hover:bg-gradient-to-br hover:from-white hover:to-brand-green-lightest"
                style={{
                  animationDelay: `${
                    0.1 + (index % 3) * 0.15 + Math.floor(index / 3) * 0.1
                  }s`,
                }}
              >
                <div className="flex items-center mb-5">
                  <div className="p-3 bg-brand-green-light/20 rounded-full mr-4 group-hover:bg-brand-green transition-colors duration-300">
                    <feature.icon className="w-7 h-7 text-brand-green-darkest group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-green-darkest group-hover:text-brand-green-darker transition-colors">
                    {feature.name}
                  </h3>
                </div>
                <p className="text-brand-gray-dark text-md flex-grow group-hover:text-brand-gray-darker transition-colors">
                  {feature.description}
                </p>
                <div className="h-1 w-0 group-hover:w-full bg-brand-green-light mt-4 transition-all duration-300 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action Section - Make it punchy */}
      <section className="relative py-24 md:py-32 bg-gradient-to-tr from-brand-green-dark to-brand-green-deepest text-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full animate-subtle-pulse animation-delay-300"></div>
        <div
          className="absolute -bottom-24 -right-10 w-80 h-80 bg-white/5 rounded-full animate-subtle-pulse animation-delay-600"
          style={{ animationDuration: "4s" }}
        ></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <SparklesIcon className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 text-brand-green-light animate-on-scroll animate-fade-in-down" />
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 animate-on-scroll animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Ready to Revolutionize Your Shopping?
          </h2>
          <p
            className="text-lg md:text-xl lg:text-2xl mb-12 max-w-2xl mx-auto text-green-100 font-light animate-on-scroll animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Join thousands of savvy Canadians using {APP_NAME} to slash grocery
            bills. It's 100% free to start saving!
          </p>
          <Link
            href="/search"
            className="bg-white text-brand-green-darkest font-bold py-4 px-12 rounded-xl text-xl shadow-2xl hover:bg-green-50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-green-light focus:ring-opacity-50 inline-flex items-center group animate-on-scroll animate-fade-in-up btn-shimmer"
            style={{ animationDelay: "0.3s" }}
          >
            Start My Savings Journey
            <ArrowRightIcon className="w-6 h-6 ml-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-green-deepest text-green-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <Link href="/" className="flex-shrink-0 inline-block mb-6">
            <div className="flex items-center group justify-center">
              <span className="text-2xl font-bold text-white group-hover:text-brand-green-light transition-colors">
                {APP_NAME}
              </span>
              <span className="text-xl ml-1.5 transform group-hover:rotate-[20deg] transition-transform duration-300">
                🌿
              </span>
            </div>
          </Link>
          <p className="mb-3 text-green-200">
            Saving you money, supporting healthier eating, and contributing to{" "}
            <a
              href="https://sdgs.un.org/goals/goal2"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline hover:text-white"
            >
              UNSDG Goal 2: Zero Hunger
            </a>
            .
          </p>
          <p className="text-sm text-green-300 mb-6">
            © {new Date().getFullYear()} {APP_NAME}. Made with ❤️ in Canada.
          </p>
          <div className="space-x-6">
            <Link
              href="/privacy"
              className="hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="hover:text-white text-sm transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
