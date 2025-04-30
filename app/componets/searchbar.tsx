import React from "react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <>
      <input
        id="search"
        list="game-types"
        name="type"
        value={value}
        onChange={onChange}
        placeholder="Select or type game type"
        className="input input-bordered w-full"
        required
      />
      <datalist id="game-types">
        <option value="5 vs 5" />
        <option value="4 vs 4" />
        <option value="3 vs 3" />
        <option value="21" />
        <option value="Other" />
      </datalist>
    </>
  );
};

export default SearchBar;
