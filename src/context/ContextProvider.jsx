import React, { useState } from "react";
import dataContext from "./datacontext";
const ContextProvider = (props) => {
    const [books, setBooks] = useState([]);
    const [searchKey, setSearchKey] = useState("");
  return (
    <div>
      <dataContext.Provider
        value={{
          books,
          setBooks,
          searchKey, setSearchKey
          
        }}
      >
        {props.children}
      </dataContext.Provider>
    </div>
  );
};

export default ContextProvider;
