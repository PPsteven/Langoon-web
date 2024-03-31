import { Palette } from "lucide-react"
import { themes } from "@/lib/data/themes"

export const ThemeChange = () => {
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn bt-ghost btn-square m-1">
                <Palette/>
            </div>
            <div tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-200 text-base-content rounded-box w-56 top-px h-[28.6rem] max-h-[calc(100vh-10rem)] overflow-y-auto mt-16">
                <div className={`grid grid-cols-1 gap-3 p-3`}>
                    {themes.map((theme, index) => (
                      <button
                        className="outline-base-content text-start outline-offset-4"
                        data-set-theme={theme}
                        data-act-class="[&_svg]:visible">
                        <span
                          data-theme={theme}
                          className="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans">
                          <span className="grid grid-cols-5 grid-rows-3">
                            <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="invisible h-3 w-3 shrink-0">
                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                              </svg>
                              <span className="flex-grow text-sm">
                                {theme}
                              </span>
                              <span className="flex h-full shrink-0 flex-wrap gap-1">
                                <span className="bg-primary rounded-badge w-2" />
                                <span className="bg-secondary rounded-badge w-2" />
                                <span className="bg-accent rounded-badge w-2" />
                                <span className="bg-neutral rounded-badge w-2" />
                              </span>
                            </span>
                          </span>
                        </span>
                      </button>
                    ))}
                </div>
            </div>

        </div>
    )
}