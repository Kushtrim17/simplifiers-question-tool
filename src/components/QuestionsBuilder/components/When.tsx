type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  isTrue: boolean;
};

export function When(props: Props) {
  const { children, fallback, isTrue } = props;

  if (isTrue) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return null;
}
