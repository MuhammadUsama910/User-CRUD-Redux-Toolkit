import * as Yup from "yup";

export const userSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please Enter Your Name"),
  email: Yup.string().email().required("Please Enter Your Email"),
  profession: Yup.string().min(6).max(25).required("Please Enter Your Profession"),
  gender: Yup.string().required("Please Enter Your Gender"),
  address: Yup.object({
    city: Yup.string().min(6).max(20).required("Please Enter Your City"),
    street: Yup.string().min(1).max(10).required("Please Enter Your Street"),
    house: Yup.string().min(1).max(10).required("Please Enter Your House #")
  })
})

// confirm_password: Yup.string().required().oneOf([Yup.ref("password"), null], "Password mjust match")