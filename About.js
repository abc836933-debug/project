import Navbarss from "./Navbarss";

export default function About() {
  return (
    <>
      <Navbarss />

      {/* About Section */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 min-h-screen py-10 px-6">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            About Our Project
          </h1>
          <p className="text-gray-700 leading-relaxed">
            The <span className="font-semibold">Hospital Facility & Report Management System</span> 
            is designed to improve healthcare by managing hospital facilities and 
            collecting valuable patient feedback. This system helps hospitals to 
            track, analyze, and enhance their services efficiently.
          </p>
        </div>

        {/* Gallery Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
            📸  Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition">
              <img
                src="https://lopamudrahospitals.com/wp-content/uploads/2023/04/Special-And-VIP-Rooms.jpg"
                alt="Hospital"
                className="w-full h-60 object-cover hover:scale-105 transition-transform"
              />
             
            </div> 
            <div className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition">
              <img
                src="https://res.cloudinary.com/jerrick/image/upload/v1686994386/648d7dd2d6b8e0001d2a0175.jpg"
                alt="Doctor"
                className="w-full h-60 object-cover hover:scale-105 transition-transform"
              />
            
            </div>
            <div className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition">
              <img
                src="https://www.unicef.org/innovation/sites/unicef.org.innovation/files/styles/media_banner/public/UN0461922.jpg.webp?itok=zEUkLT2n"
                alt="Healthcare"
                className="w-full h-60 object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition">
              <img
                src="https://assets.linde.com/-/media/celum-connect/2024/08/06/12/18/adobestock_321170291_191409.jpg?impolicy=focal-point&cw=735&ch=460&fx=1024&fy=768&r=c327a8203f"
                alt="Patient"
                className="w-full h-60 object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition">
              <img
                src="https://media.gettyimages.com/id/2165822512/video/medical-ventilator-with-a-monitor-to-track-the-patients-vital-signs-in-the-operating-room.jpg?s=640x640&k=20&c=W9JMt-mOlKXr4yfvsc9NX0C-T5rXGQqAzWrDZyMVwB8="
                alt="Technology"
                className="w-full h-60 object-cover hover:scale-105 transition-transform"
              />
            </div>
            <div className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition">
              <img
                src="https://www.ranahospitalbsr.in/img/depertment/canteen.jpg"
                alt="Research"
                className="w-full h-60 object-cover hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
