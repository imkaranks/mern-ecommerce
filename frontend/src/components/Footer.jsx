import React from 'react';

function Footer() {
  return (
    <footer className='py-12 bg-neutral-800 text-sm text-neutral-300'>
      <div className='w-11/12 max-w-7xl mx-auto flex flex-wrap'>
        <section className='space-y-2.5 py-4 lg:py-0 md:px-2 basis-full md:basis-1/2 lg:basis-1/4'>
          <h2 className='text-base text-white font-semibold font-accent uppercase'>About us</h2>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapibus lacus. Duis nec vestibulum magna, et dapibus lacus.
          </p>
          <button className='text-white font-medium font-accent'>read more...</button>
        </section>
        <section className='space-y-2.5 py-4 lg:py-0 md:px-2 basis-full md:basis-1/2 lg:basis-1/4'>
          <h2 className='text-base text-white font-semibold font-accent uppercase'>Contact info</h2>
          <ul className='grid gap-2'>
            <li className='grid'>
              <span className='font-accent text-white font-medium uppercase'>Address:</span>
              <span>123 Street Name, City, England</span>
            </li>
            <li className='grid'>
              <span className='font-accent text-white font-medium uppercase'>Phone:</span>
              <span>(123) 456-7890</span>
            </li>
            <li className='grid'>
              <span className='font-accent text-white font-medium uppercase'>Email:</span>
              <span>mail@example.com</span>
            </li>
            <li className='grid'>
              <span className='font-accent text-white font-medium uppercase'>Working Days/Hours:</span>
              <span>Mon - Sun / 9:00 AM - 8:00 PM</span>
            </li>
          </ul>
        </section>
        <section className='space-y-2.5 py-4 lg:py-0 md:px-2 basis-full md:basis-1/2 lg:basis-1/4'>
          <h2 className='text-base text-white font-semibold font-accent uppercase'>Customer service</h2>
          <ul className='grid gap-2'>
            <li className='cursor-pointer transition-colors hover:text-white'>Help & FAQs</li>
            <li className='cursor-pointer transition-colors hover:text-white'>Order Tracking</li>
            <li className='cursor-pointer transition-colors hover:text-white'>Shipping & Delivery</li>
            <li className='cursor-pointer transition-colors hover:text-white'>Orders History</li>
            <li className='cursor-pointer transition-colors hover:text-white'>Advanced search</li>
            <li className='cursor-pointer transition-colors hover:text-white'>My Account</li>
            <li className='cursor-pointer transition-colors hover:text-white'>Careers</li>
            <li className='cursor-pointer transition-colors hover:text-white'>About Us</li>
            <li className='cursor-pointer transition-colors hover:text-white'>Corporate Sales</li>
            <li className='cursor-pointer transition-colors hover:text-white'>Privacy</li>
          </ul>
        </section>
        <section className='space-y-2.5 py-4 lg:py-0 md:px-2 basis-full md:basis-1/2 lg:basis-1/4'>
          <h2 className='text-base text-white font-semibold font-accent uppercase'>Popular tags</h2>
          <ul className='text-xs font-light font-accent flex flex-wrap gap-2'>
            <li className='cursor-pointer py-1 px-1.5 border border-neutral-600 transition-colors hover:text-white hover:border-current'>Bag</li>
            <li className='cursor-pointer py-1 px-1.5 border border-neutral-600 transition-colors hover:text-white hover:border-current'>Black</li>
            <li className='cursor-pointer py-1 px-1.5 border border-neutral-600 transition-colors hover:text-white hover:border-current'>Blue</li>
            <li className='cursor-pointer py-1 px-1.5 border border-neutral-600 transition-colors hover:text-white hover:border-current'>Clothes</li>
            <li className='cursor-pointer py-1 px-1.5 border border-neutral-600 transition-colors hover:text-white hover:border-current'>Fashion</li>
            <li className='cursor-pointer py-1 px-1.5 border border-neutral-600 transition-colors hover:text-white hover:border-current'>Hub</li>
            <li className='cursor-pointer py-1 px-1.5 border border-neutral-600 transition-colors hover:text-white hover:border-current'>Jean</li>
            <li className='cursor-pointer py-1 px-1.5 border border-neutral-600 transition-colors hover:text-white hover:border-current'>Shirt</li>
            <li className='cursor-pointer py-1 px-1.5 border border-neutral-600 transition-colors hover:text-white hover:border-current'>Skirt</li>
            <li className='cursor-pointer py-1 px-1.5 border border-neutral-600 transition-colors hover:text-white hover:border-current'>Sports</li>
            <li className='cursor-pointer py-1 px-1.5 border border-neutral-600 transition-colors hover:text-white hover:border-current'>Sweater</li>
            <li className='cursor-pointer py-1 px-1.5 border border-neutral-600 transition-colors hover:text-white hover:border-current'>Winter</li>
          </ul>
        </section>
      </div>
      <hr className='border-t-neutral-700 my-4' />
      <div className='w-11/12 max-w-7xl mx-auto text-center'>
        <small>&copy; Ecomm. &copy; {new Date().getFullYear()}. All Rights Reserved</small>
      </div>
    </footer>
  );
}

export default Footer;