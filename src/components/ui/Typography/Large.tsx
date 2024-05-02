type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Large(props: Props) {
  const { children, className } = props;

  const getClassName = () => {
    return className ? `text-4xl font-bold ${className}` : "text-4xl font-bold";
  };

  return <h1 className={getClassName()}>{children}</h1>;
}
