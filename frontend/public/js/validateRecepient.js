import * as Yup from 'yup'

const validationRecipientSchema=Yup.object({
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
        recipientRelationship:Yup.string().required("Relationship with the recipient is required"),
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
        "At least select one (either selectedOrgans or otherOrganTissue)",
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
      signature:Yup.string().required("recipient signature is required"),
      date:Yup.string().required("date of submission is required"),
      witnessDetail:Yup.object({
        name:Yup.string().required("witness name is required"),
        recipientRelationship:Yup.string().required("The witness's relationship with the recipient is required"),
        signature:Yup.string().required("witness signature is required")
      }),
      paidOption:Yup.string().required("paid option is required")
      .oneOf(["yes","no"], 'You must select any one option from both'),
      photo:Yup.mixed().required("passport size photo is required"),
      citizenship:Yup.mixed().required("citizenship is required"),
      hospitalDocs:Yup.mixed().required("hospital document is required"),
      confirmation:Yup.boolean().required("this field is required")
        .oneOf([true], 'You must agree terms and condition to proceed')
    })

export default validationRecipientSchema;