import { useEffect, useState } from "react"
import { fetchUsers, deleteUsers } from "../features/users/userSlice"
import { useDispatch, useSelector } from "react-redux"

import { Link } from "react-router-dom"
import { CiEdit, CiTrash, CiUser } from "react-icons/ci";
import { BiSolidUserDetail } from "react-icons/bi";


const Users = () => {

  const [userId, setUserId] = useState(null);

  const dispatch = useDispatch();

  //useEffect Hook
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch]) 

  const usersData = useSelector((state) => state.users)
  console.log("usersData in Users frontend Component: ", usersData);

  const handleUserId = (id) => {
    setUserId(id);
  }

  const handleDeleteUser = async () => {
    
    await dispatch(deleteUsers(userId))
      .then(() => 
        dispatch(fetchUsers())
      )
      .catch((error) => console.log("error:", error));

      setUserId(null);
  }

  return (
    <>
    <div className="w-1/2 m-auto mt-4 flex items-center justify-evenly">
      <Link to={`/create`} className="w-1/4">
        <button className="w-full flex items-center justify-center gap-2 text-black bg-blue-300 p-2 rounded">
          <CiUser size="20%" style={{color:"black"}}/>
          Create User
        </button>
      </Link>
      
      <h1 className="text-2xl font-semibold"> Display Users Data </h1>
    </div>

    <div className="overflow-x-auto">
      <table className="overflow-y-scroll w-3/4 m-auto mt-6 table border-2 border-gray-500 border-collapse">
        
        {/* head */}
        <thead className="border border-gray-500">
          <tr>
            <th className="p-2 text-start"> Id </th>
            <th className="p-2 text-start"> Name </th>
            <th className="p-2 text-start"> Email </th>
            <th className="p-2 text-start"> Profession </th>
            <th className="p-2 text-start"> Gender </th>
            <th className="p-2 text-start"> Address </th>
            <th className="p-2 text-start"> Operations </th>
          </tr>
        </thead>

        <tbody className="border border-gray-500">
          {
            usersData.map((user) => (
            <tr 
              key={user.id}
              className="text-start border border-gray-500 border-collapse hover:cursor-pointer hover:bg-blue-300">
              
              <td className="p-2"> {user.id} </td>
              <td className="p-2"> {user.name} </td>
              <td className="p-2"> {user.email} </td>
              <td className="p-2"> {user.profession} </td>
              <td className="p-2"> {user.gender} </td>
              <td className="p-2"> {user.address.city}, {user.address.street}, {user.address.house} </td>
              
              <td className="flex p-2 gap-4 items-center justify-center">

                <Link to={`/userDetail/${user.id}`}> <BiSolidUserDetail size={24} style={{color:"2C2E3A"}}/> </Link>

                {/* <Link to={`/create`}> <CiUser size={24} style={{color:"green"}}/> </Link> */}
                <Link to={`/update/${user.id}`}> <CiEdit size={24} style={{color:"blue"}}/> </Link>

                <button 
                  onClick={() => handleUserId(user.id)}> 
                    <CiTrash size={24} style={{color:"red"}}/> 
                </button>
              
              </td>
            
            </tr>
            ))
          }
        </tbody>

      </table>
    </div>

    {/* <!-- Modal --> */}

    {userId !== null && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-11/12 md:w-1/3 max-w-md mx-auto">
          
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center"> Are you sure you want to delete? </h2>
          
          <div className="flex justify-center space-x-4">
            <button
              id="cancelBtn"
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-300"
              onClick={() => handleUserId(null)}
            >
              Cancel
            </button>
            <button
              id="deleteBtn"
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300"
              onClick={handleDeleteUser}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )}

    </>
  )
}

export default Users