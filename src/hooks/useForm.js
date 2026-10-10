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
        setValues(initialValues);
    }

    return {
        values,
        changeHandler,
        submitHandler,
    };
}
