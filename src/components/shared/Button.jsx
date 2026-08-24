const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  let baseClasses = '';
  
  if (variant === 'primary') {
    baseClasses = 'btn-gold';
  } else if (variant === 'outline') {
    baseClasses = 'btn-outline';
  } else if (variant === 'outline-gold') {
    baseClasses = 'btn-outline-gold';
  }

  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
