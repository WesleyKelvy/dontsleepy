import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

const buttonVariants = cva(
  "w-full justify-center rounded-full items-center ",
  {
    variants: {
      variant: {
        default: "bg-purple-600",
        destructive: "",
        outline: "border border-purple-600 bg-transparent",
        secondary: "bg-gray-200 text-black",
        link: "text-blue-500 underline",
        ghost: "",
      },
      size: {
        default: "py-4",
        sm: "py-3 px-3",
        lg: "py-5 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends TouchableOpacityProps,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  isLoading?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  title?: string;
  className?: string;
}

export default function Button({
  variant,
  size,
  className,
  isLoading = false,
  disabled = false,
  title,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        // <LoadingIndicator size="small" color="white" />
        <Text className="text-white font-medium text-base">Carregando</Text>
      ) : (
        <Text
          className={`${
            variant == "outline" ? "text-purple-600" : "text-white"
          } font-medium text-base`}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
