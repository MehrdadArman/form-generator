import React, { forwardRef } from "react";
import {
  Button as MuiButton,
  type ButtonProps as MuiButtonProps,
  styled,
} from "@mui/material";

// Define custom variant types
type CustomVariant = "primary" | "secondary" | "danger" | "success" | "outline";

// Extend MUI ButtonProps while excluding variant to avoid conflicts
interface CustomButtonProps extends Omit<MuiButtonProps, "variant"> {
  variant?: CustomVariant;
  children: React.ReactNode;
}

// Styled component with best practices
const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== "customVariant",
})<{ customVariant: CustomVariant }>(({ theme, customVariant }) => {
  // Base styles
  const baseStyles = {
    textTransform: "none" as const,
    borderRadius: theme.spacing(1),
    fontWeight: 500,
    transition: theme.transitions.create(["all"], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),
    "&:hover": {
      transform: "translateY(-1px)",
      boxShadow: theme.shadows[4],
    },
    "&:active": {
      transform: "translateY(0px)",
      boxShadow: theme.shadows[2],
    },
    "&:focus-visible": {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: 2,
    },
  };

  // Variant-specific styles
  const variantStyles = {
    primary: {
      background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
      "&:hover": {
        ...baseStyles["&:hover"],
        background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
      },
    },
    secondary: {
      background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.secondary.light} 90%)`,
      "&:hover": {
        ...baseStyles["&:hover"],
        background: `linear-gradient(45deg, ${theme.palette.secondary.dark} 30%, ${theme.palette.secondary.main} 90%)`,
      },
    },
    danger: {
      background: `linear-gradient(45deg, ${theme.palette.error.main} 30%, ${theme.palette.error.light} 90%)`,
      "&:hover": {
        ...baseStyles["&:hover"],
        background: `linear-gradient(45deg, ${theme.palette.error.dark} 30%, ${theme.palette.error.main} 90%)`,
      },
    },
    success: {
      background: `linear-gradient(45deg, ${theme.palette.success.main} 30%, ${theme.palette.success.light} 90%)`,
      "&:hover": {
        ...baseStyles["&:hover"],
        background: `linear-gradient(45deg, ${theme.palette.success.dark} 30%, ${theme.palette.success.main} 90%)`,
      },
    },
    outline: {
      border: `2px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.contrastText,
      backgroundColor: "transparent",
      "&:hover": {
        ...baseStyles["&:hover"],
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        border: `2px solid ${theme.palette.primary.main}`,
      },
    },
  };

  return {
    ...baseStyles,
    ...variantStyles[customVariant],
  };
});

// Memoized variant configuration
const VARIANT_CONFIG: Record<
  CustomVariant,
  Pick<MuiButtonProps, "variant" | "color">
> = {
  primary: { variant: "contained", color: "primary" },
  secondary: { variant: "contained", color: "secondary" },
  danger: { variant: "contained", color: "error" },
  success: { variant: "contained", color: "success" },
  outline: { variant: "outlined", color: "primary" },
} as const;

const Button = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ variant = "primary", children, sx, ...props }, ref) => {
    const variantProps = VARIANT_CONFIG[variant] || VARIANT_CONFIG.primary;

    return (
      <StyledButton
        ref={ref}
        customVariant={variant}
        {...variantProps}
        {...props}
        sx={sx}
      >
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = "Button";

export default Button;
