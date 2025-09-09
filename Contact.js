import Navbarss from "../Components/Navbarss";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <>
      <Navbarss />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">
            📞 Contact Us
          </h1>
          <p className="text-gray-700 text-lg mb-12">
            We'd love to hear from you! Reach out to us through any of the following methods.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Phone Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-indigo-100 rounded-full mb-4">
                <Phone className="text-indigo-600 w-8 h-8" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Call Us</h2>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-indigo-100 rounded-full mb-4">
                <Mail className="text-indigo-600 w-8 h-8" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Email Us</h2>
              <p className="text-gray-600">support@yourdomain.com</p>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-indigo-100 rounded-full mb-4">
                <MapPin className="text-indigo-600 w-8 h-8" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Visit Us</h2>
              <p className="text-gray-600">123, Tech Street, Bangalore, Karnataka, India</p>
            </div>
          </div>

          {/* Optional Map */}
          <div className="mt-16 rounded-xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-96"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8658446950956!2d77.59456627509446!3d12.971598190853334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670cae68b57%3A0x22c7a0d623d0d8f!2sBangalore%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sin!4v1693989030923!5m2!1sen!2sin"
              loading="lazy"
              title="Bangalore Map"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
