import * as yup from 'yup';
import mongoose from 'mongoose';
const storyValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title cannot exceed 100 characters'),

  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description cannot exceed 1000 characters'),

  image: yup.object().shape({
    fileName: yup.string().required('File name is required'),
    url: yup
      .string()
      .required('Image URL is required')
      .url('Image URL must be a valid URL'),
  }),

  category: yup
    .string()
    .required('Category is required')
    .oneOf(['donor', 'recipient'], 'Category must be either "donor" or "recipient"'),

  userId: yup
    .string()
    .required('User ID is required')
    .test('is-objectid', 'User ID must be a valid ObjectId', (value) => {
      return mongoose.Types.ObjectId.isValid(value);
    }),
});

export default storyValidationSchema;