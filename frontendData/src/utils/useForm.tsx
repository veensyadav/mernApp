import { useState } from 'react';

function useForm(initialState = {}, field?: { required: boolean; inputs: string[] }) {
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [values, setValues] = useState<any>(initialState);

    const change = (event: any) => {
        const newValues = { ...values, [event.target.name]: event.target.value };
        const { errors } = validate(newValues, field);

        setErrors(errors);
        setValues(newValues);
        setTouched({ ...touched, [event.target.name]: true });
    };

    const reset = () => {
        const resetvalues = {};
        Object.keys(values).forEach((x) => (resetvalues[x] = ''));
        setValues(resetvalues); // Reset values
        setTouched({}); // Reset touched values
    };

    return { values, setValues, change, touched, errors, reset };
}

function validate(values: any, field: { required: boolean; inputs: string[] }) {
    const Keys = Object.keys(values);
    const errors = {};

    Keys.filter((key) => {
        if (field.required === true) {
            return field.inputs.find((input) => input === key)
                ? String(values[key]).trim().length <= 0
                : false;
        }
        return false;
    }).forEach((err) => {
        errors[err] =
            err.replace(/([A-Z])/g, ' $1').replace(/^./, (x) => x.toUpperCase()) +
            ' is required';
    });

    // Return errors if required found
    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    // Check for custom validation
    // ... feilds that require extra validation
    if (values.hasOwnProperty('firstName') && values['firstName'].length) {
        if (!/^[A-Za-z]+$/.test(values.firstName)) {
            errors['firstName'] = 'First name should have only characters';
        }
    }

    if (values.hasOwnProperty('lastName') && values['lastName'].length) {
        if (!/^[A-Za-z]+$/.test(values.lastName)) {
            errors['lastName'] = 'Last name should have only characters';
        }
    }

    if (values.hasOwnProperty('email') && values['email'].length) {
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        if (!regex.test(values.email)) {
            errors['email'] = 'Email is not valid';
        }
    }

    if (values.hasOwnProperty('clientName') && values['clientName'].length) {
        if (!/^[A-Za-z]+$/.test(values.clientName)) {
            errors['clientName'] = 'Client name should have only characters';
        }
    }

    if (values.hasOwnProperty('phone') && values['phone'].length) {
        if (!/^\d{10}$/.test(values.phone)) {
            errors['phone'] = 'Phone number should have 10 digits';
        }
    }

    if (values.hasOwnProperty('password') && values['password'].length) {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        if (values.password.length < 8) {
            errors['password'] = 'Password should be 8 or more characters';
        } else if (!regex.test(values.password)) {
            errors['password'] = 'Use 8 or more characters with a mix of letters, numbers & symbols';
        }
    }

    if (values.hasOwnProperty('confirmPassword') && values['confirmPassword'].length) {
        if (values.password !== values.confirmPassword) {
            errors['confirmPassword'] = "Passwords didn't match";
        }
    }

    if (values.hasOwnProperty('website') && values['website'].length) {
        const regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        if (!regex.test(values.website)) {
            errors['website'] = 'URL is not valid';
        }
    }

    return { errors };
}

export default useForm;
