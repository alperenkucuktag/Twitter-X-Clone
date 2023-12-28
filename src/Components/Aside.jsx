import React from "react";

const Aside = () => {
  return (
    <div className='items-start justify-start hidden p-6 lg:flex'>
      <ul className='border p-8 rounded border-gray'>
        <li className='border-b-[1px] border-gray py-3'>#GüncelGelişmeler</li>
        <li className='border-b-[1px] border-gray py-3'>#sonDakika</li>
        <li className='border-b-[1px] border-gray py-3'>#Türkiye</li>
        <li className=' py-2'>#Tasarım</li>
      </ul>
    </div>
  );
};

export default Aside;
