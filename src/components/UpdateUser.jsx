import { useEffect } from "react"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../features/users/userSlice"
import { useParams, useNavigate } from "react-router-dom"

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

      onSubmit: (values) => { 
        
        dispatch(updateUser({
          id,
          ...values
        }));

        navigate("/");
      }
    })
    
  
  return (
    <>
    <form onSubmit={formik.handleSubmit}>

      <div>
        <label>Name</label>
        <input type="text" name="name" onChange={formik.handleChange} value={formik.values.name} />
      </div>
      
      <div>
        <label>Email</label>
        <input type="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
      </div>
      
      <div>
        <label>Profession</label>
        <input type="text" name="profession" onChange={formik.handleChange} value={formik.values.profession} />
      </div>
      
      <div>
        <label>Gender</label>
        <input type="text" name="gender" onChange={formik.handleChange} value={formik.values.gender} />
      </div>
      
      <div>
        <label>City</label>
        <input type="text" name="address.city" onChange={formik.handleChange} value={formik.values.address.city} />
      </div>
      
      <div>
        <label>Street</label>
        <input type="text" name="address.street" onChange={formik.handleChange} value={formik.values.address.street} />
      </div>
      
      <div>
        <label>House</label>
        <input type="text" name="address.house" onChange={formik.handleChange} value={formik.values.address.house} />
      </div>
      
      <button type="submit"> Submit </button>

    </form>
    </>
  )
}

export default UpdateUser;