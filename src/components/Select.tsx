import { FieldError } from "react-hook-form";
function Select({
  options,
  label,
  selectLabel,
  error,
  ...rest
}: {
  options: string[];
  label: string;
  selectLabel: string;
  error: FieldError | undefined;
  rest: any
}) {
  console.log(rest)
  return (
    <>
      <label htmlFor="currency" className="form-label">
        {label}
      </label>
      <select
        {...rest}
        id="country"
        className={`select2  form-select ${error ? "border-danger" : ""}`}
      >
        <option value="">{selectLabel}</option>
        {options.map((opt: string) => {
          return (
            <option key={opt} style={{ textTransform: "capitalize" }} value={opt}>
              {opt}
            </option>
          );
        })}
      </select>
    </>
  );
}
export default Select;
