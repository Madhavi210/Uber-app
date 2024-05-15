import * as yup from 'yup';


export const userValidationSchema = yup.object().shape({
        userName : yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
        role: yup.string().oneOf(['user', 'admin','driver']).default('user'),
        profile: yup.object().shape({
            firstName: yup.string(),
            lastName: yup.string(),
            age: yup.number().positive(),
        })
    });

    // Cab validation schema using Yup
export const  cabValidationSchema = yup.object().shape({
        type: yup.string().required(),
        numberPlate: yup.string().required(),
        driver: yup.string().required(),
        location: yup.object().shape({
        type: yup.string(),
        coordinates: yup.array().of(yup.number()),
        }),
        pricePerKm: yup.number().positive().required(),
    });

    // CabType validation schema using Yup
export const cabTypeValidationSchema = yup.object().shape({
        name: yup.string().required(),
        description: yup.string(),
        vehicle: yup.string(),
    });

