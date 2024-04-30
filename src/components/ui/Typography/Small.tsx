type Props = {
  children: React.ReactNode;
};
export function Small(props: Props) {
  const { children } = props;
  return <small className="text-sm font-medium leading-none">{children}</small>;
}
