import * as yup from "yup";

export const userValidationSchema = yup.object().shape({
  userName: yup.string().required("user name is required"),
  email: yup.string().email().required("email is required"),
  password: yup.string().required("password is required"),
  role: yup.string().oneOf(["user", "admin", "driver"]).default("user"),
  profile: yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    age: yup.number().positive(),
  }),
});

// Cab validation schema using Yup
export const cabValidationSchema = yup.object().shape({
  type: yup.string().required("Type is required"),
  numberPlate: yup.string().required("number plate is required"),
  driver: yup.string().required("driver is required"),
  userId: yup.string().required("user is required"),
  location: yup.object().shape({
    type: yup.string(),
    coordinates: yup.array().of(yup.number()),
  }),
  distanceInKm: yup.number().positive("Distance must be positive number").required("Distance is required"),
  totalCharge: yup.number().default(0),
  pickupFrom: yup.string().required("Pickup location is required"),
  dropTo: yup.string().required("Drop location is required"),
  paymentOption: yup.string().oneOf(["cash", "online"], "Invalid payment option"),
});

// CabType validation schema using Yup
export const cabTypeValidationSchema = yup.object().shape({
  name: yup.string().required("cab type is required"),
  description: yup.string(),
  vehicle: yup.string(),
  pricePerKm: yup.number().positive("Price per kilometer must be a positive number").required("price pre km is required"),
});


