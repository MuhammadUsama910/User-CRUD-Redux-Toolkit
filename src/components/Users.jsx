import { useEffect } from "react"
import { fetchUsers } from "../features/users/userSlice"
import { useDispatch, useSelector } from "react-redux"

const Users = () => {

  const dispatch = useDispatch();

  //useEffect Hook
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const usersData = useSelector((state) => state.users)
  console.log("usersData: ", usersData);

  return (
    <>
    <h1> Display Users Data </h1>

    <div className="overflow-x-auto">
      <table className="overflow-y-scroll w-3/4 m-auto mt-12 table border-2 border-gray-500 border-collapse">
        
        {/* head */}
        <thead className="border border-gray-500">
          <tr>
            <th className="p-4 text-start"> Id </th>
            <th className="p-4 text-start"> Name </th>
            <th className="p-4 text-start"> Email </th>
            <th className="p-4 text-start"> Profession </th>
            <th className="p-4 text-start"> Gender </th>
            <th className="p-4 text-start"> Address </th>
          </tr>
        </thead>

        <tbody className="border border-gray-500">
          {
            usersData.map((user) => (
            <tr 
              key={user.id}
              className="text-start border border-gray-500 border-collapse">
              
              <td className="p-4"> {user.id} </td>
              <td className="p-4"> {user.name} </td>
              <td className="p-4"> {user.email} </td>
              <td className="p-4"> {user.profession} </td>
              <td className="p-4"> {user.gender} </td>
              {/* <td className="p-2"> {user.address} </td> */}
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