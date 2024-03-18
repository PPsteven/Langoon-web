import { SearchContext } from "@/store";
import classNames from "classnames";
import { ReactNode, useContext } from "react";

export type DictProps = {
  children: ReactNode  
}

export const Dict = ({children}: DictProps) => {
  const {search, setSearch} = useContext(SearchContext)!;

  return (
    <div className={classNames("drawer drawer-end",
     search && search.length > 0 ? "drawer-open": "")}>
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        {children}
        {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <h1>{search}</h1>
          <li><a>Sidebar Item 1</a></li>
          <li><a>Sidebar Item 2</a></li>
        </ul>
      </div>
    </div>
  );
};
