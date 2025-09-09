import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Addcity()
 {
  const [diseasename, setDiseasename] = useState('');
  const [description, setDescription] = useState('');
  const [diseaselist, setDiseaselist] = useState([]);



  useEffect(()=>{
    displayalldiseases();
  },[])

  function adddiseases(e)  /* Add Disease Details */
  {
    e.preventDefault();
    const obj={diseasename,description};
       axios
          .post("http://localhost:8080/adddiseases",obj)
          .then((res)=>{
            toast.success(res.data);
            displayalldiseases();
            clearAll();
          })
          .catch((err)=>{
            toast.error(err.response.data);
          });
  }

function clearAll()
{
    setDiseasename("");
    setDescription("");
}


  function displayalldiseases()  /* Display All Diseases */
  {
      axios
          .get("http://localhost:8080/displayalldiseases")
          .then((res)=>{
            setDiseaselist(res.data);
          })
          .catch((err)=>{
            toast.error(err.response.data);
          });
  }

  return (
    <div className="my-5 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Two-column layout */}
        <div className="lg:flex-row gap-6">

          {/* Form Section (Left) */}
          <div className="flex-1 bg-white dark:bg-gray-800 shadow-md p-6 rounded-md border border-emerald-500">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">Add Diseases</h1>
            <form> 
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                Enter Disease Name:
              </label>
              <input
                type="text"
                value={diseasename}
                onChange={(e) => setDiseasename(e.target.value)}
                id="name"
                className="block w-full border border-blue-600 outline-emerald-800 px-3 py-2 text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
              />

              <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                Enter Description:
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="name"
                row={4}
                className="block w-full border border-blue-600 outline-emerald-800 px-3 py-2 text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
              />


              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-600 transition rounded-md text-white font-semibold text-sm sm:text-md shadow-md" onClick={adddiseases}
              >
                Add +
              </button>
            </form>
          </div><br></br>

          {/* Table Section (Right) */}
          <div className="flex-1 bg-white dark:bg-gray-800 shadow-md p-6 rounded-md border border-gray-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Diseases List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-4 py-2">Disease ID</th>
                    <th className="px-4 py-2">Disease Name</th>
                    <th className="px-4 py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {diseaselist.length > 0 ? (
                    diseaselist.map((item, index) => (
                      <tr key={index} className="border-b border-gray-300 dark:border-gray-600">
                        <td className="px-4 py-2">{item.disesaseid}</td>
                          <td className="px-4 py-2">{item.diseasename}</td>
                          <td className="px-4 py-2">{item.description}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="px-4 py-2 text-center text-gray-400">
                        No Diseases added yet.
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
