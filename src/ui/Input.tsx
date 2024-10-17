type TInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  id: string;
  label: string;
};

const Input = ({ className, label, id, ...props }: TInputProps) => {
  return (
    <>
      {label && (
        <label className="sr-only" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={`pb-4 pl-4 bg-transparent border-b-2 outline-none border-b-slateBlue focus:border-b-crispWhite ${className}`}
        {...props}
        aria-labelledby={id}
      />
    </>
  );
};

export default Input;
