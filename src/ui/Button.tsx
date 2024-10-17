import { ComponentProps, PropsWithChildren } from "react";

type ButtonProps = ComponentProps<"button"> &
  PropsWithChildren & {
    size: "sm" | "lg";
  };

const paddings = {
  sm: "px-[4.25rem] py-[0.938rem]",
  lg: "px-[6.688rem] py-[0.875rem]",
};

function Button({ size, children, ...buttonProps }: ButtonProps) {
  return (
    <button
      className={`text-white bg-vividRed hover:text-deepNavy hover:bg-white transition-colors duration-300 rounded-md text-sm ${paddings[size]}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export default Button;
