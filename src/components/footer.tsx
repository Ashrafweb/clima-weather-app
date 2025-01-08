import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <div className='w-full bg-slate-900 dark:bg-slate-950 flex flex-col flex-col-2 gap-2  justify-around items-center py-4 sm:py-8  '>
      <div>
        <h1 className='font-extrabold font-semibold p-2 text-slate-400 flex-1'>
          A weather app made by AshrafWeb
        </h1>
      </div>
      <div className='flex flex-row justify-evenly gap-4 text-slate-400'>
        <Link
          to='/about'
          className='font-normal text-slate-400 hover:text-slate-200 delay-200 ease-in py-2 '
        >
          About
        </Link>
        <Link
          to='/privacy'
          className='font-normal text-slate-400 py-2  hover:text-slate-200 delay-200 ease-in'
        >
          Privacy
        </Link>
        <Link
          to='/contact'
          className='font-normal text-slate-400 py-2 hover:text-slate-200 delay-200 ease-in '
        >
          Contact
        </Link>
        <Link
          to='/terms-conditions'
          className='font-normal text-slate-400 py-2  hover:text-slate-200 delay-200 ease-in'
        >
          Terms & Conditions
        </Link>
      </div>
    </div>
  );
};

export default Footer;
