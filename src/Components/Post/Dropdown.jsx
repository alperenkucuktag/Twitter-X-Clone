import { useRef } from "react";

const Dropdown = ({ handleEdit, handleDelete }) => {
  const inputRef = useRef();
  return (
    <>
      <div className='paste-button text-center'>
        <button ref={inputRef} className='button text-center items-center'>
          {" "}
          &nbsp; ⋮
        </button>
        <div className='dropdown-content'>
          <button onClick={handleDelete} id='top' href='#'>
            Delete
          </button>
          <button onClick={handleEdit} id='middle' href='#'>
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
