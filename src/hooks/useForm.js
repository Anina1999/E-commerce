import { useState } from "react";

export default function useForm(initialValues, onSubmit) {
    const [values, setValues] = useState(initialValues);

    function changeHandler(e) {
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value })
        );
    }

    function submitHandler(e) {
        e.preventDefault();
        onSubmit(values);
    }

    function resetForm() {
        setValues(initialValues);
    }

    return {
        values,
        changeHandler,
        submitHandler,
        resetForm,
    };
}
