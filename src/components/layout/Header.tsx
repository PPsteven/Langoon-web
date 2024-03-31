import { Languages } from 'lucide-react';

import { ThemeChange } from './ThemeChange';

export const Header = () => {
    return (
        <div className="navbar sticky top-0 z-50 bg-base-100 text-base-content shadow-sm">
            <div className="navbar-start">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-xl">Langoon</a>
            </div>
            <div className="navbar-end">
                <ThemeChange/>
                <div className="dropdown dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost m-1">
                        <Languages/>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}