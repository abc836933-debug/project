import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Addhospitals() {
  const [arealist, setArealist] = useState([]);
  const [selectedarea, setSelectedarea] = useState("");
  const [hospitallist, setHospitallist] = useState([]);
  const [name, setName] = useState("");
  const [emailid, setEmailid] = useState("");
  const [password, setPassword] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    displayallarea();
    displayallhospitals();
  }, []);

  function addhospitals(e) {
    e.preventDefault();
    const obj = { selectedarea, name, emailid, password, phoneno, photo };
    axios
      .post(`http://localhost:8080/addhospitals/${selectedarea}`, obj)
      .then((res) => {
        toast.success(res.data);
        clearAll();
        displayallhospitals();
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }

  function clearAll() {
    setSelectedarea("");
    setEmailid("");
    setName("");
    setPassword("");
    setPhoneno("");
    setPhoto("");
  }

  function displayallarea() {
    axios
      .get("http://localhost:8080/displayallarea")
      .then((res) => {
        setArealist(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }

  function displayallhospitals() {
    axios
      .get("http://localhost:8080/displayallhospitals")
      .then((res) => {
        setHospitallist(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }

  const Image = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhoto(reader.result);
    };
  };

  return (
    <div className="my-5 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Form Section */}
        <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-md border border-emerald-500 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Add Hospitals
          </h1>
          <form>
            <label className="block text-gray-700 font-medium mb-2">
              Select Area:
            </label>
            <select
              className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white"
              value={selectedarea}
              onChange={(e) => setSelectedarea(e.target.value)}
            >
              <option value="">--Choose Options--</option>
              {arealist.map((item, index) => (
                <option key={index} value={item.areaid}>
                  {item.areaid}-{item.area}
                </option>
              ))}
            </select>

            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mt-4 mb-1">
              Enter Hospital Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full border border-blue-600 px-3 py-2 text-sm rounded-md mb-4"
            />

            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
              Enter Emailid:
            </label>
            <input
              type="text"
              value={emailid}
              onChange={(e) => setEmailid(e.target.value)}
              className="block w-full border border-blue-600 px-3 py-2 text-sm rounded-md mb-4"
            />

            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
              Enter Phoneno:
            </label>
            <input
              type="text"
              value={phoneno}
              onChange={(e) => setPhoneno(e.target.value)}
              className="block w-full border border-blue-600 px-3 py-2 text-sm rounded-md mb-4"
            />

            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
              Enter Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full border border-blue-600 px-3 py-2 text-sm rounded-md mb-4"
            />

            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
              Upload Photo:
            </label>
            <input
              type="file"
              accept="image/*"
              className="block w-full border border-blue-600 px-3 py-2 text-sm rounded-md mb-4"
              onChange={Image}
            />

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-md text-white font-semibold text-sm sm:text-md shadow-md"
              onClick={addhospitals}
            >
              Add +
            </button>
          </form>
        </div>

        {/* Hospitals List Section (Below Form) */}
        <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-md border border-gray-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Hospitals List
          </h2>

          {hospitallist.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {hospitallist.map((item, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 shadow-lg rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-600 hover:shadow-xl transition duration-300"
                >
                  {/* Hospital Image */}
                  <img
                    src={item.photo}
                    alt="Hospital"
                    className="w-full h-40 object-cover"
                  />

                  {/* Hospital Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-bold">Hospital ID:</span>{" "}
                      {item.hospitalid}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-bold">City:</span>{" "}
                      {item.area1?.city1?.city}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-bold">Area:</span>{" "}
                      {item.area1?.area}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-bold">Email:</span> {item.emailid}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-bold">Phone:</span> {item.phoneno}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400">
              No Hospitals added yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
