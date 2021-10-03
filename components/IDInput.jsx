import { forwardRef } from 'react';

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
          text-align: center;
          margin-bottom: 20px;
          color: gray;
        }
        .id-input:focus {
          color: black;
        }
      `}</style>
    </>
  );
});

export default IDInput;
