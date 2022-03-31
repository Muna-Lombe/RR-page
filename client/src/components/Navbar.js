import React from 'react'
import {Logo} from './'


const Navbar = () => {
   
  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light">
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
            <div className="collapse navbar-collapse flex nav flex-grow items-center" id="navbarSupportedContent1">
            <div className="w-12 h-7">
                <Logo /> 
            </div>
            {/* <!-- Left links --> */}
            <ul className="navbar-nav flex pl-0 list-style-none mr-auto">
                    <li className="nav-item p-2">
                    <a className="nav-link text-white" href="# ">Dashboard</a>
                    </li>
                    <li className="nav-item p-2">
                    <a
                        className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                        href="# "
                        >
                    </a>
                    </li>
                    <li className="nav-item p-2">
                    <a
                        className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                        href="# "
                    >
                    </a>
                    </li>
            </ul>
                {/* <!-- Left links --> */}
                </div>
                
                {/* <!-- Collapsible wrapper --> */}

                {/* <!-- Right elements --> */}
                <div className="flex items-center relative">
                {/* <!-- Icon --> */}
            
                <div className="dropdown relative">
                    <a
                    className="text-white opacity-60 hover:opacity-80 focus:opacity-80 mr-4 dropdown-toggle hidden-arrow flex items-center"
                    href="#  "
                    id="dropdownMenuButton1"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    >
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="bell"
                        className="w-4"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path
                        fill="currentColor"
                        d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"
                        ></path>
                    </svg>
                    <span
                        className="text-white bg-red-700 absolute rounded-full text-xs -mt-2.5 ml-2 py-0 px-1.5"
                        >1</span
                    >
                    </a>
                    <ul
                    className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0"
                    aria-labelledby="dropdownMenuButton1"
                    >
                    <li>
                        <a
                        className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                        href="# "
                        >Action</a
                        >
                    </li>
                    <li>
                        <a
                        className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                        href="# "
                        >Another action</a
                        >
                    </li>
                    <li>
                        <a
                        className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                        href="# "
                        >Something else here</a
                        >
                    </li>
                    </ul>
                </div>
                <div className="dropdown relative">
                    <a
                    className="dropdown-toggle flex items-center hidden-arrow"
                    href="# "
                    id="dropdownMenuButton2"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    >
                    <img
                        src="https://mdbootstrap.com/img/new/avatars/2.jpg"
                        className="rounded-full"
                        style={{height: '25px', width: '25px'}}
                        alt=""
                        loading="lazy"
                    />
                    </a>
                    <ul
                    className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none left-auto right-0"
                    aria-labelledby="dropdownMenuButton2"
                    >
                    <li>
                        <a
                        className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                        href="# "
                        >Action</a
                        >
                    </li>
                    <li>
                        <a
                        className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                        href="# "
                        >Another action</a
                        >
                    </li>
                    <li>
                        <a
                        className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                        href="# "
                        >Something else here</a
                        >
                    </li>
                    </ul>
                </div>
                </div>
                
            </div>
        </nav>
        )
};

export default Navbar;