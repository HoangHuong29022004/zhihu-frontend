interface IInputLabelProps {
  label: string;
  isRequired?: boolean;
}
const InputLabelBase = ({ label, isRequired = true }: IInputLabelProps) => {
  return (
    <p className="mb-0.5 text-text-secondary flex items-center">
      {label}
      {isRequired && <span className="text-error ml-2 text-base mt-1">*</span>}
    </p>
  );
};

export default InputLabelBase;
