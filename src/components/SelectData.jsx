const SelectData = ({ categories, handleSelect }) => {
  return (
    <select
      className="form-select"
      aria-label="Default select example"
      onChange={handleSelect}
    >
      <option defaultValue="">Select category</option>
      {categories.map((category) => (
        <option value={category.name} key={category.name}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default SelectData;
