import clsx from "clsx";

export enum ButtonType {
  Primary = "primary",
  Secondary = "secondary",
  Tertiary = "tertiary",
}
interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  shortcuts?: string | null;
  type?: ButtonType;
}
export default function Button({
  children,
  shortcuts = null,
  type = ButtonType.Primary,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        type === ButtonType.Primary
          ? "border-transparent bg-outer-space-700 text-white hover:bg-outer-space-600 focus:ring-gray-500"
          : "",
        type === ButtonType.Secondary
          ? "border-tasman-400 bg-white text-outer-space-700 hover:bg-gray-100 focus:ring-gray-300"
          : "",
        "justify-left group relative flex w-full rounded-xl border py-2.5 px-5 font-text text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      )}
      {...props}
    >
      {children}
      {shortcuts ? (
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm">
          <div
            className={clsx(
              type === ButtonType.Primary ? "bg-white bg-opacity-20" : "",
              type === ButtonType.Secondary ? "bg-outer-space-700" : "",
              "w-12 rounded-md px-1.5 py-1 text-white",
            )}
          >
            {shortcuts}
          </div>
        </span>
      ) : null}
    </button>
  );
}
