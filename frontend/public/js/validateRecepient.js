import * as Yup from 'yup'

const validationRecepientSchema=Yup.object({
      username:Yup.string().required("Username is required"),
      email:Yup.string().required("Email is required").email("Invalid email Format"),
      password: Yup.string()
          .required("Password is required")
          .min(8, "Password must be at least 8 characters")
          .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one symbol"
          )
          .matches(/[0-9]/, "Password must contain at least one number")
          .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
          .matches(/[a-z]/, " Password must contain at least one lowercase letter"),
      confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
      category:Yup.string().required("Category is required")
    })