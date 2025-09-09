import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Addarea()
 {
  const [area, setArea] = useState('');
  const [citylist, setCitylist] = useState([]);
   const [arealist, setArealist] = useState([]);
   const[selectedcity,setSelectedcity]=useState('');
   const[pincode,setPincode]=useState('');

  useEffect(()=>{
    displayallarea();
    displayallcity();
  },[])

  function addarea(e)  /* Add Area */
  {
    e.preventDefault();
    const obj={area,selectedcity,pincode};
       axios
          .post(`http://localhost:8080/addarea/${selectedcity}`,obj)
          .then((res)=>{
            toast.success(res.data);
            displayallarea();
            clearAll();
          })
          .catch((err)=>{
            toast.error(err.response.data);
          });
  }

function clearAll()
{
    setArea("");
    setSelectedcity("");
    setPincode("");
}

  function displayallcity()  /* Display all City details */
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

  function displayallarea()  /* Display All Area */
  {
      axios
          .get("http://localhost:8080/displayallarea")
          .then((res)=>{
            setArealist(res.data);
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">Add Area</h1>
            <form>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Select City:
                </label>
                <select className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white" value={selectedcity} onChange={(e)=>setSelectedcity(e.target.value)}>
                <option value="">--Choose Options--</option>
                {
                  citylist.map((item,index)=>(
                    <option key={index} value={item.cityid}>{item.cityid}-{item.city}</option>
                  ))
                }
                </select>

              <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                Enter Area Name:
              </label>
              <input
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                id="name"
                className="block w-full border border-blue-600 outline-emerald-800 px-3 py-2 text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
              />

               <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                Enter Pincode:
              </label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                id="name"
                className="block w-full border border-blue-600 outline-emerald-800 px-3 py-2 text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
              />

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-600 transition rounded-md text-white font-semibold text-sm sm:text-md shadow-md" onClick={addarea}
              >
                Add +
              </button>
            </form>
          </div>

          {/* Table Section (Right) */}
          <div className="flex-1 bg-white dark:bg-gray-800 shadow-md p-6 rounded-md border border-gray-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Area List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-4 py-2">Area ID</th>
                    <th className="px-4 py-2">City Name</th>
                    <th className="px-4 py-2">Area Name</th>
                    <th className="px-4 py-2">Pincode</th>
                  </tr>
                </thead>
                <tbody>
                  {arealist.length > 0 ? (
                    arealist.map((item, index) => (
                      <tr key={index} className="border-b border-gray-300 dark:border-gray-600">
                        <td className="px-4 py-2">{item.areaid}</td>
                          <td className="px-4 py-2">{item.city1?.city}</td>
                          <td className="px-4 py-2">{item.area}</td>
                          <td className="px-4 py-2">{item.pincode}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="px-4 py-2 text-center text-gray-400">
                        No area added yet.
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
