import './Button.scss';

type ButtonOwn<T extends React.ElementType> = {
  children?: React.ReactNode;
  as?: T;
  className?: string;
};

type ButtonProps<T extends React.ElementType> = ButtonOwn<T> &
  Omit<React.ComponentProps<T>, keyof ButtonOwn<T>>;

const Button = <E extends React.ElementType = 'button'>({
  as,
  children,
  className,
  disabled,
  ...props
}: ButtonProps<E>) => {
  const ButtonComponent = as || 'button';
  return (
    <ButtonComponent className={`btn ${className}`} {...props}>
      {children}
    </ButtonComponent>
  );
};
export default Button;
