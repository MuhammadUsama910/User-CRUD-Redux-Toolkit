import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers, updateUsers } from "../features/users/userSlice"
import { useParams, useNavigate } from "react-router-dom"
import { userSchema } from "../shcema"

export const UpdateUser = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.find((user) => user.id === id));

    const formik = useFormik({

      initialValues: {
        name: user?.name || "",
        email: user?.email || "",
        profession: user?.profession || "",
        gender: user?.gender || "",
        address: {
          city: user?.address.city || "",
          street: user?.address.street || "",
          house: user?.address.house || ""
        }
      },

      validationSchema: userSchema,

      onSubmit:async (values) => { 
        
        await dispatch(updateUsers(
          {
            id,
            ...values
          }
        ))
        .then((response) => {
          if(response.type === 'users/update/fulfilled'){
            dispatch(fetchUsers())
            navigate("/");
          }
        })
        .catach((error) => console.log('Error while updating users!: ', error))
      }
    })
    
  
  return (
    <>
    {/* <div className="text-2xl text-black text-center mt-2"> Update User </div>

    <form
      onSubmit={formik.handleSubmit}
      className="w-1/3 m-auto mt-4 mb-4 p-2 flex flex-col items-center justify-center gap-1
        border border-gray-500 rounded">

      <div className="w-full flex flex-col items-center gap-1 text-lg">
        <label className="w-2/3 flex justify-start"> Name: </label>
        <input
          className="w-2/3 p-0.5 border border-black rounded focus:outline-none"
          type="text" 
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange} 
        />
      </div>
      
      <div className="w-full flex flex-col items-center gap-1 text-lg">
        <label className="w-2/3 flex justify-start"> Email: </label>
        <input 
          className="w-2/3 p-0.5 border border-black rounded focus:outline-none"
          type="email" 
          name="email" 
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </div>
      
      <div className="w-full flex flex-col items-center gap-1 text-lg">
        <label className="w-2/3 flex justify-start">Profession: </label>
        <input 
          className="w-2/3 p-0.5 border border-black rounded focus:outline-none"
          type="text" 
          name="profession" 
          value={formik.values.profession}
          onChange={formik.handleChange}
        />
      </div>
      
      <div className="w-full flex flex-col items-center gap-1 text-lg">
        <label className="w-2/3 flex justify-start"> Gender: </label>
        <input
          className="w-2/3 p-0.5 border border-black rounded focus:outline-none" 
          type="text" 
          name="gender" 
          value={formik.values.gender}
          onChange={formik.handleChange}
        />
      </div>
      
      <div className="w-full flex flex-col items-center gap-1 text-lg">
        <label className="w-2/3 flex justify-start"> City: </label>
        <input 
          className="w-2/3 p-0.5 border border-black rounded focus:outline-none"
          type="text" 
          name="address.city" 
          value={formik.values.address.city}
          onChange={formik.handleChange}
        />
      </div>
      
      <div className="w-full flex flex-col items-center gap-1 text-lg">
        <label className="w-2/3 flex justify-start"> Street: </label>
        <input 
          className="w-2/3 p-0.5 border border-black rounded focus:outline-none"
          type="text" 
          name="address.street" 
          value={formik.values.address.street}
          onChange={formik.handleChange}
        />
      </div>
      
      <div className="w-full flex flex-col items-center gap-1 text-lg">
        <label className="w-2/3 flex justify-start"> House: </label>
        <input
          className="w-2/3 p-0.5 border border-black rounded focus:outline-none"
          type="text" 
          name="address.house" 
          value={formik.values.address.house}
          onChange={formik.handleChange}
        />
      </div>
      
      <button 
        type="submit"
        className="w-1/4 mt-4 mb-2 p-1.5 bg-blue-500 text-white text-lg rounded"> 
        Submit 
      </button>

    </form> */}

<form 
      onSubmit={formik.handleSubmit}
      className="sm:w-1/3 m-auto mt-4 mb-4 p-2 flex flex-col gap-1 items-center justify-center bg-white shadow-lg">

      <div className="text-xl font-bold text-blue-500"> Update User </div>

      <div className="w-10/12 mt-2 flex flex-col gap-1 p-1.5 border border-gray-500 rounded">
        <label className="w-2/3 text-sm font-semibold flex justify-start"> Name: </label>
        <input
          className="w-full p-0.5 text-sm rounded focus:outline-none"
          type="text" 
          name="name"
          placeholder="Enter Name .."
          value={formik.values.name}
          onChange={formik.handleChange} 
        />
        {
          formik.errors.name && formik.touched.name ?
          <p className="text-xs text-start text-red-500"> {formik.errors.name} </p>
          :
          null
        }
      </div>
      
      <div className="w-10/12 flex flex-col gap-1 p-1.5 border border-gray-500 rounded">
        <label className="w-2/3 flex justify-start"> Email: </label>
        <input 
          className="w-full p-0.5 text-sm rounded focus:outline-none"
          type="email" 
          name="email"
          placeholder="Enter Email.."
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {
          formik.errors.email && formik.touched.email ?
          <p className="text-xs text-start text-red-500"> {formik.errors.email} </p>
          :
          null
        }
      </div>
      
      <div className="w-10/12 flex flex-col gap-1 p-1.5 border border-gray-500 rounded">
        <label className="w-2/3 flex justify-start"> Profession: </label>
        <input 
          className="w-full p-0.5 text-sm rounded focus:outline-none"
          type="text" 
          name="profession"
          placeholder="Enter Profession.."
          value={formik.values.profession}
          onChange={formik.handleChange}
        />
        {
          formik.errors.profession && formik.touched.profession ?
          <p className="text-xs text-start text-red-500"> {formik.errors.profession} </p>
          :
          null
        }
      </div>
      
      <div className="w-10/12 flex flex-col p-1.5 border border-gray-500 rounded">
        <div className="flex">
          <label className="max-sm:w-[50%] sm:[50%]"> Select Gender: </label>
          <select
            className="max-sm:w-[50%] sm:w-[25%] ml-4 p-0.5 text-sm font-semibold rounded focus:outline-none"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
          >
            <option value=""/>
            <option value="Male" label="Male" />
            <option value="Female" label="Female" />
          </select>
        </div>
        {
          formik.errors.gender && formik.touched.gender ?
          <p className="text-xs text-start text-red-500"> {formik.errors.gender} </p>
          :
          null
        }
      </div>
      
      <div className="w-10/12 flex flex-col gap-1 p-1.5 border border-gray-500 rounded">
        <label className="w-2/3 flex justify-start"> City: </label>
        <input 
          className="w-full p-0.5 text-sm rounded focus:outline-none"
          type="text" 
          name="address.city"
          placeholder="Enter City.."
          value={formik.values.address.city}
          onChange={formik.handleChange}
        />
        {
          formik.errors.address?.city && formik.touched.address?.city ? 
          <p className="text-xs text-start text-red-500"> {formik.errors.address.city} </p>
          :
          null
        }
      </div>
      
      <div className="w-10/12 flex flex-col gap-1 p-1.5 border border-gray-500 rounded">
        <label className="w-2/3 flex justify-start"> Street: </label>
        <input 
          className="w-full p-0.5 text-sm rounded focus:outline-none"
          type="text" 
          name="address.street"
          placeholder="Enter Street.."
          value={formik.values.address.street}
          onChange={formik.handleChange}
        />
        {
          formik.errors.address?.street && formik.touched.address?.street ?
          <p className="text-xs text-start text-red-500"> {formik.errors.address.street} </p>
          :
          null
        }
      </div>
      
      <div className="w-10/12 flex flex-col gap-1 p-1.5 border border-gray-500 rounded">
        <label className="w-2/3 flex justify-start"> House: </label>
        <input
          className="w-full p-0.5 text-sm rounded focus:outline-none"
          type="text" 
          name="address.house"
          placeholder="Enter HOuse #.."
          value={formik.values.address.house}
          onChange={formik.handleChange}
        />
        {
          formik.errors.address?.house && formik.touched.address?.house ?
          <p className="text-xs text-start text-red-500"> {formik.errors.address.house} </p>
          :
          null
        }
      </div>
      
      <button 
        type="submit"
        className="max-sm:2/3 sm:w-1/3 mt-4 mb-2 p-1.5 bg-blue-500 text-white text-lg rounded"> 
        Submit 
      </button>
    
    </form>
  </>
  )
}

export default UpdateUser;