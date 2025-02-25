import * as Yup from 'yup'

const validateDonorSchema=Yup.object({
      fullName:Yup.string().required("Fullname is required"),
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
            phoneNumber: Yup.string()
            .required("Phone Number is required")
            .min(10, "Phone Number must be of 10 digit")
            .matches(/^[6789]\d{9}$/, "Invalid phone number"), // Ensures only valid Indian mobile numbers
            emergencyContact:Yup.object({
              name:Yup.string().required("Name is required"),
              donorRelationship:Yup.string().required("Relationship with the donor is required"),
              email:Yup.string().required("Email is required").email("Invalid email Format"),
              phoneNumber:Yup.string().required("Phone Number is required")
            .min(10, "Phone Number must be of 10 digit")
            .max(10, "Phone Number must be of 10 digit")
            .matches(
              /^[6789]\d{9}$/, // Regex for 10-digit Indian mobile numbers
              "Invalid phone number" // Error message for invalid numbers
            ),
            }),
            organsAndTissues: Yup.object({
              selectedOrgans: Yup.array().of(Yup.string()),
              otherOrganTissue: Yup.string(),
            }).test(
              "at-least-one",
              "At least select one (either all organs and tissue or select specific Organs and Tissues)",
              (values) => {
                // If neither field is filled, return false for validation error
                const hasSelectedOrgans = Array.isArray(values.selectedOrgans) && values.selectedOrgans.length > 0;
                const hasOtherOrganTissue = typeof values.otherOrganTissue === "string" && values.otherOrganTissue.trim() !== "";
                
                return hasSelectedOrgans || hasOtherOrganTissue;
              }
            ),
            consent:Yup.boolean()
            .required('This field is required') // Ensure the boolean is provided
            .oneOf([true], 'You must agree to proceed'), // Ensure the boolean is true
            signature:Yup.string().required("donor signature is required"),
            date:Yup.string().required("date of submission is required"),
            witnessDetail:Yup.object({
              name:Yup.string().required("witness name is required"),
              donorRelationship:Yup.string().required("The witness's relationship with the donor is required"),
              signature:Yup.string().required("witness signature is required")
            }),
            donationAmount:Yup.string().required("Do you want to donate for free or want donation amount please specify"),
            photo:Yup.mixed().required("passport size photo is required"),
            citizenship:Yup.mixed().required("citizenship is required"),
            confirmation:Yup.boolean().required("this field is required")
            .oneOf([true], 'You must agree terms and condition to proceed')
    })

export default validateDonorSchema;