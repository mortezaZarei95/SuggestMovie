import React from "react";

import { IInputProps } from "types/types";
import classes from "./SearchBox.module.scss";
import { ReactComponent as SearchIcon } from "assets/icons/search-gray.svg";

interface Iprops extends IInputProps {
  onChange: () => void;
}
const SearchBox = React.forwardRef<HTMLInputElement, Iprops>((props, ref) => {
  return (
    <div className={classes.SearchWrapper}>
      <input ref={ref} type="text" {...props} />
      <SearchIcon onClick={props.onChange} />
    </div>
  );
});

export default SearchBox;
