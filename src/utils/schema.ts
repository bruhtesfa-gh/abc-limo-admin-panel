import * as yup from "yup";
const imgFileSchema = yup
  .mixed()
  .required()
  .test({
    message: "you need to provide file",
    test: (file: any) => {
      return file[0] ? true : false;
    },
  });
export const blogPostSchema = yup
  .object({
    blogTitle: yup.string().required(),
    blogContent: yup.string().required(),
    blogImg: imgFileSchema,
  })
  .required();
export const blogUpdateSchema = yup
  .object({
    blogTitle: yup.string().required(),
    blogContent: yup.string().required(),
    blogImg: yup.mixed(),
  })
  .required();

export const vehiclePostSchema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required(),
    type: yup.string().oneOf(["SUV", "BUS", "VAN", "SEDAN"]).required(),
    pricePerDay: yup.number().required(),
    passengerSize: yup.number().required(),
    img: imgFileSchema,
  })
  .required();

export const vehicleUpdateSchema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required(),
    type: yup.string().oneOf(["SUV", "BUS", "VAN", "SEDAN"]).required(),
    pricePerDay: yup.number().required(),
    passengerSize: yup.number().required(),
    blogImg: yup.mixed(),
  })
  .required();

// export const changePasswordSchema = yup.object({
//   oldPassword: yup.string().required(),
//   newPassword: yup.string().required(),
//   newPassword: yup
//     .string()
//     .required()
//     .oneOf([yup.ref("newPassword")]),
// }).required;

export const changePasswordSchema = yup
  .object({
    oldPassword: yup.string().required(),
    newPassword: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("newPassword")]),
  })
  .required();
export const userUpdateProfileSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required().email(),
    img: yup.mixed(),
  })
  .required();
