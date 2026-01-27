import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Garment<span className="text-blue-500">Ops</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed">
            GarmentOps is a smart garments order & production tracker system
            designed to simplify factory operations, manage orders, and ensure
            timely delivery with real-time tracking.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Useful Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/all-products" className="hover:text-blue-400 transition">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-blue-400 cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-blue-400 cursor-pointer">
              Terms & Conditions
            </li>
            <li className="hover:text-blue-400 cursor-pointer">
              Help Center
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact
          </h3>
          <p className="text-sm">Email: support@garmentops.com</p>
          <p className="text-sm mt-2">Phone: +880 1234-567890</p>
          <p className="text-sm mt-2">
            Address: Dhaka, Bangladesh
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 py-4 text-center text-sm">
        © {new Date().getFullYear()} GarmentOps. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
