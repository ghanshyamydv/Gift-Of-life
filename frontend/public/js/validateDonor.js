import * as Yup from 'yup'

const validationDonorSchema=Yup.object({
      fullname:Yup.string().required("Fullname is required"),
      dateOfBirth:Yup.string().required("Date of birth is required"),
      gender:Yup.string().required("Gender is required"),
      address:Yup.object({
        street:Yup.string().required("Street is required"),
        city:Yup.string().required("City is required"),
        state:Yup.string().required("State is required"),
        zipCode:Yup.string().required("Zip Code is required"),
        country:Yup.string().required("Country is required"),
      }),
      email:Yup.string().required("Email is required").email("Invalid email Format"),
      phoneNumber:Yup.number().required("Phone Number is required")
      .min(10, "Phone Number must be of 10 digit")
      .matches(
        /^[6789]\d{9}$/, // Regex for 10-digit Indian mobile numbers
        "Invalid phone number" // Error message for invalid numbers
      ),
      emergencyContact:Yup.object({
        name:Yup.string().required("name is required"),
        donorRelationship:Yup.string().required("Relationship with donor is required"),
        email:Yup.string().required("Email is required").email("Invalid email Format"),
        phoneNumber:Yup.number().required("Phone Number is required")
      .min(10, "Phone Number must be of 10 digit")
      .matches(
        /^[6789]\d{9}$/, // Regex for 10-digit Indian mobile numbers
        "Invalid phone number" // Error message for invalid numbers
      ),
      }),
      organsAndTissues: Yup.array()
      .min(1, 'At least one item is required') // Ensure the array is not empty
      .required('organs and tissue is required'), // Ensure the array itself is required
      consent:Yup.boolean()
      .required('This field is required') // Ensure the boolean is provided
      .oneOf([true], 'You must agree to proceed'), // Ensure the boolean is true
    })