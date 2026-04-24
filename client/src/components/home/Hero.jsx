import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hero = () => {

  const {user} = useSelector(state => state.auth)
  const [menuOpen, setMenuOpen] = React.useState(false);

  const logos = [
    "https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/framer.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg",
  ];

  return (
    <>
      <div className="min-h-screen pb-20">
        {/* Navbar */}
        <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
          <a href="/">
            <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
          </a>

          <div className="hidden md:flex items-center gap-8 transition duration-500 text-slate-800">
            <a href="#" className="hover:text-green-600 transition">Home</a>
            <a href="#features" className="hover:text-green-600 transition">Features</a>
            <a href="#testimonials" className="hover:text-green-600 transition">Testimonials</a>
            <a href="#cta" className="hover:text-green-600 transition">Contact</a>
          </div>

          <div className="flex gap-2">
            <Link
              to="/app?state=register"
              className="hidden md:block px-6 py-2 bg-green-500 hover:bg-green-700 active:scale-95 transition-all rounded-full text-white"
              hidden = {user}
            >
              Get started
            </Link>

            <Link
              to="/app?state=login"
              className="hidden md:block px-6 py-2 border active:scale-95 hover:bg-slate-50 transition-all rounded-full text-slate-700 hover:text-slate-900"
            hidden = {user}>
              Login
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden active:scale-90 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="lucide lucide-menu"
            >
              <path d="M4 5h16M4 12h16M4 19h16" />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 z-[100] bg-black/40 text-black backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <a href="#" className="text-white">Home</a>
          <a href="#features" className="text-white">Features</a>
          <a href="#testimonials" className="text-white">Testimonials</a>
          <a href="#contact" className="text-white">Contact</a>

          <button
            onClick={() => setMenuOpen(false)}
            className="active:ring-3 active:ring-white aspect-square size-10 p-1 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center justify-center transition"
          >
            X
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black">
          <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 bg-green-300 blur-[100px] opacity-30"></div>

          {/* Avatars + Rating */}
          <div className="flex items-center mt-24">
            <div className="flex -space-x-3 pr-3">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" className="size-8 rounded-full border-2 border-white object-cover" />
              <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" className="size-8 rounded-full border-2 border-white object-cover" />
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" className="size-8 rounded-full border-2 border-white object-cover" />
            </div>

            <div>
              <div className="flex">
                {Array(5).fill(0).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    className="fill-green-600"
                  >
                    <path d="M12 .587l3.668 7.568L24 9.748l-6 5.848 1.42 8.304L12 19.896l-7.42 3.964L6 15.596 0 9.748l8.332-1.593z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-700">Used by 10,000+ users</p>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-6">
            Land your Dream Job with{" "}
            <span className="bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">
              AI-Powered
            </span>{" "}
            Resume
          </h1>

          <p className="max-w-md text-center text-base my-7">
            Create, edit and download professional resumes with AI assistance.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <Link
              to="/app"
              className="bg-green-500 hover:bg-green-600 text-white rounded-full px-9 h-12 flex items-center"
            >
              Get started →
            </Link>

            <button className="flex items-center gap-2 border border-slate-400 hover:bg-green-50 rounded-full px-7 h-12 text-slate-700 transition">
              🎥 Try Demo
            </button>
          </div>

          <p className="py-6 text-slate-600 mt-14">Trusted by leading brands</p>

          <div className="flex flex-wrap justify-between gap-6 max-w-3xl w-full mx-auto py-4">
            {logos.map((logo, index) => (
              <img key={index} src={logo} alt="logo" className="h-6 w-auto" />
            ))}
          </div>
        </div>
      </div>

      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>
    </>
  );
};

export default Hero;
