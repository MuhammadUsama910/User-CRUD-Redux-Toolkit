import { useEffect } from "react"
import { fetchUsers, removeUser } from "../features/users/userSlice"
import { useDispatch, useSelector } from "react-redux"

import { Link } from "react-router-dom"
import { CiEdit, CiTrash, CiUser } from "react-icons/ci";
import { BiColorFill } from "react-icons/bi";

const Users = () => {

  const dispatch = useDispatch();

  //useEffect Hook
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const usersData = useSelector((state) => state.users)
  console.log("usersData: ", usersData);

  const handleRemoveUser = (id) => {
    dispatch(removeUser(id));
  }

  return (
    <>
    <h1 className="mt-4 text-2xl text-center font-semibold"> Display Users Data </h1>

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
              <td className="p-2"> {user.address.city}, {user.address.street} {user.address.house} </td>
              
              <td className="flex p-2 gap-4 items-center justify-center">

                <Link to={`/create`}> <CiUser size={24} style={{color:"green"}}/> </Link>
                
                <Link to={`/update/${user.id}`}> <CiEdit size={24} style={{color:"blue"}}/> </Link>
                
                <button onClick={() => handleRemoveUser(user.id)}> <CiTrash size={24} style={{color:"red"}}/> </button>
              
              </td>
            
            </tr>
            ))
          }
        </tbody>

      </table>
    </div>
    </>
  )
}

export default Users