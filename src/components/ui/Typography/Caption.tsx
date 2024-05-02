type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Caption(props: Props) {
  const { children, className } = props;

  const getClassName = () => {
    return className
      ? `text-lg font-semibold opacity-75 ${className}`
      : "text-lg font-semibold opacity-75";
  };

  return <div className={getClassName()}>{children}</div>;
}
