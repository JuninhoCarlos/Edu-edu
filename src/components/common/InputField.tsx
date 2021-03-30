import React from "react";
import type { InputHTMLAttributes } from "react";
import { Field } from "react-final-form";
import required from "./validators";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    type: string;
    validate?: typeof required;
    icon?: string;
}

const InputField = ({ name, validate, icon, label, type, ...props }: Props) => (
    <Field name={name} validate={validate}>
        {({ input, meta }) => (
            <>
                <input {...input} type={type} {...props} />
                <label htmlFor="Nome" className="label">
                    {label}
                </label>

                {icon ? (
                    <img className="icon left-align" src={icon} alt="" />
                ) : (
                    ""
                )}

                {meta.error && meta.touched && (
                    <div className="invalid-feedback d-block">{meta.error}</div>
                )}
            </>
        )}
    </Field>
);

export default InputField;
