import { useState } from "react";

export default function useForm(initialValues, onSubmit) {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value })
        );
    };

    const submitHandler = (e) => {
        e.preventDefault();
        onSubmit(values, resetForm);
    };

    const resetForm = () => {
        setValues(initialValues);
    };

    return {
        values,
        changeHandler,
        submitHandler,
        resetForm,
    };
}
