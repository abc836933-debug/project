import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Addcity()
 {
  const [city, setCity] = useState('');
  const [citylist, setCitylist] = useState([]);



  useEffect(()=>{
    displayallcity();
  },[])

  function addcity(e)  /* Add State */
  {
    e.preventDefault();
    const obj={city};
       axios
          .post("http://localhost:8080/addcity",obj)
          .then((res)=>{
            toast.success(res.data);
            displayallcity();
            clearAll();
          })
          .catch((err)=>{
            toast.error(err.response.data);
          });
  }

function clearAll()
{
    setCity("");
}


  function displayallcity()  /* Display All City */
  {
      axios
          .get("http://localhost:8080/displayallcity")
          .then((res)=>{
            setCitylist(res.data);
          })
          .catch((err)=>{
            toast.error(err.response.data);
          });
  }

  return (
    <div className="my-5 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Form Section (Left) */}
          <div className="flex-1 bg-white dark:bg-gray-800 shadow-md p-6 rounded-md border border-emerald-500">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">Add City</h1>
            <form> 
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                Enter City Name:
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                id="name"
                className="block w-full border border-blue-600 outline-emerald-800 px-3 py-2 text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-600 transition rounded-md text-white font-semibold text-sm sm:text-md shadow-md" onClick={addcity}
              >
                Add +
              </button>
            </form>
          </div>

          {/* Table Section (Right) */}
          <div className="flex-1 bg-white dark:bg-gray-800 shadow-md p-6 rounded-md border border-gray-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">City List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-4 py-2">City ID</th>
                    <th className="px-4 py-2">City Name</th>
                  </tr>
                </thead>
                <tbody>
                  {citylist.length > 0 ? (
                    citylist.map((item, index) => (
                      <tr key={index} className="border-b border-gray-300 dark:border-gray-600">
                        <td className="px-4 py-2">{item.cityid}</td>
                          <td className="px-4 py-2">{item.city}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="px-4 py-2 text-center text-gray-400">
                        No states added yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
