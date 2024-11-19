import { forwardRef, InputHTMLAttributes } from "react";

type TInputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  id: string;
  label: string;
};

// Use forwardRef to forward the ref to the input element
const Input = forwardRef<HTMLInputElement, TInputProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <>
        {label && (
          <label className="sr-only" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={`text-crispWhite bg-transparent border-b-2 outline-none border-b-slateBlue focus:border-b-crispWhite ${className}`}
          {...props}
          aria-labelledby={id}
        />
      </>
    );
  }
);

Input.displayName = "Input"; // Add displayName for better debugging

export default Input;
