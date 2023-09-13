import { ButtonHTMLAttributes } from "react";
import colors from "../../lib/colors";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "medium" | "large";
}

const Button = ({ variant = "primary", size = "medium", ...props }: Props) => {
  return <button {...props} />;
};

const TYPE_VARIANTS = {
  primary: {
    color: colors.grey50,
    backgroundColor: colors.lightgreen400,
    "&:hover": {
      backgroundColor: colors.lightgreen500,
    },
  },
  secondary: {
    color: colors.grey700,
    backgroundColor: colors.grey100,
    "&:hover": {
      backgroundColor: colors.grey300,
    },
  },
};

const SIZE_VARIANTS = {
  medium: {
    fontSize: "15px",
    padding: "11px 16px",
  },
  large: {
    fontSize: "17px",
    padding: "11px 22px",
  },
};

export default Button;
