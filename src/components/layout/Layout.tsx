import React from "react"
import Subtitles from "@/pages/Subtitles/Subtitles"

const App: React.FC = () => {
  return (
    <div className="drawer ">
      <input id="left-drawer" type="checkbox" className="drawer-toggle" /> 
      <Subtitles />

      {/* TODO... */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          {/* Sidebar content here */}
          <li><a>Sidebar Item 1</a></li>
          <li><a>Sidebar Item 2</a></li>
        </ul>
      </div>
</div>
  )
}

export default App;