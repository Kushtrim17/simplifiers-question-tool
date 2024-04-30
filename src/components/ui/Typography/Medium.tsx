type Props = {
  children: React.ReactNode;
};

export function Medium(props: Props) {
  const { children } = props;

  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
}
