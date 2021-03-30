import React from "react";
import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { Field } from "react-final-form";
import srGoiaba from "../../assets/kids/sr-goiaba.png";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
}

const FileField = ({ name, ...props }: Props) => {
    const [avatar, setAvatar] = useState<string>(srGoiaba);
    return (
        <Field<FileList> name={name}>
            {({ input: { value, onChange, ...input } }) => (
                <>
                    <img src={avatar} alt="" />
                    <label
                        htmlFor="file-upload"
                        style={{ zIndex: 9999 }}
                        className="d-flex align-items-center justify-content-center text-center btn btn-light text-primary my-btn"
                    >
                        Mudar Avatar
                    </label>
                    <input
                        {...input}
                        type="file"
                        onChange={({ target }) => {
                            const url = URL.createObjectURL(target.files![0]);
                            setAvatar(url);
                        }} // instead of the default target.value
                        onLoad={({ target }) => {
                            console.log("loaded");
                            console.log(target);
                        }}
                        {...props}
                    />
                </>
            )}
        </Field>
    );
};

export default FileField;
