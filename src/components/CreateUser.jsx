import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addUser } from "../features/users/userSlice";
import { useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";

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

    onSubmit: (values) => {

      const newUser = { 
        id: nanoid(),
        ...values 
      };

      dispatch(addUser(newUser));

      navigate('/');
    }
  });

  return (

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
      
      <button type="submit">Submit</button>
    
    </form>
  );
}

export default CreateUser;
