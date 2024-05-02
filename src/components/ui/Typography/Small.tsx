type Props = {
  children: React.ReactNode;
  className?: string;
};
export function Small(props: Props) {
  const { children, className } = props;

  const getClassName = () => {
    return className
      ? `text-sm font-medium leading-none ${className}`
      : "text-sm font-medium leading-none";
  };

  return <small className={getClassName()}>{children}</small>;
}
