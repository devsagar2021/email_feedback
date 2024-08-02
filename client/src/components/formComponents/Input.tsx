import React, { FC } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

interface InputProps {
  label?: string;
  name: string;
  placeholder?: string;
  className?: string;
  type?: string;
  rules?: RegisterOptions | undefined;
}

const Input: FC<InputProps> = ({ label, name, placeholder, className, rules, type = 'text', ...restProps }) => {
  const { register, formState: { errors } } = useFormContext();

  console.log(errors[name]);
  return (
    <div className={`input-field ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className='validate'
        {...register(name, rules) }
        {...restProps}
      />
      {errors[name] && <span className='helper-text red-text'>{(errors[name]?.message as string) || 'Required'}</span>}
    </div>
  );
}

export default Input;
