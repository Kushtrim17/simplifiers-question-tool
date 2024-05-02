type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Medium(props: Props) {
  const { children, className } = props;

  const getClassName = () => {
    return className
      ? `scroll-m-20 text-xl font-semibold tracking-tight ${className}`
      : "scroll-m-20 text-xl font-semibold tracking-tight";
  };

  return <h4 className={getClassName()}>{children}</h4>;
}
