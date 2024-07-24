import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { createUsers } from "../features/users/userSlice";
import { useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { userSchema } from "../shcema";

const CreateUser = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({

    initialValues: {
      name: '',
      email: '',
      profession: '',
      gender: '',
      address: {
        city: '',
        street: '',
        house: ''
      }
    },

    validationSchema: userSchema,

    onSubmit: (values) => {
      const newUser = { 
        id: nanoid(),
        ...values 
      };

      dispatch(createUsers(newUser));
      navigate('/');
    }
  });

  console.log("Errors in Formik: ", formik.errors);

  return (

    <>
    <form 
      onSubmit={formik.handleSubmit}
      className="sm:w-1/3 m-auto mt-4 mb-4 p-2 flex flex-col gap-1 items-center justify-center bg-white shadow-lg">

      <div className="text-xl font-bold text-blue-500"> Create User </div>

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
  );
}

export default CreateUser;
