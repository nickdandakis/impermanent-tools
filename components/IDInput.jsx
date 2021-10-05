import { forwardRef } from "react";

const IDInput = forwardRef(({ value, onChange }, ref) => {
  return (
    <>
      <input
        ref={ref}
        placeholder="#"
        className="id-input"
        type="text"
        maxLength="5"
        value={value}
        onChange={onChange}
      />
      <style jsx>{`
        .id-input {
          font-size: 48px;
          width: 100%;
          color: gray;
          text-align: inherit;
        }
        .id-input:focus {
          color: black;
        }
      `}</style>
    </>
  );
});

IDInput.displayName = "IDInput";

export default IDInput;
