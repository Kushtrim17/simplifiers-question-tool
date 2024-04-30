type Props = {
  children: React.ReactNode;
};

export function Caption(props: Props) {
  const { children } = props;

  return <div className="text-lg font-semibold opacity-75">{children}</div>;
}
