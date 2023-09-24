import React from 'react';
import Heading from './Heading';

export const footerListItem = 'cursor-pointer transition-colors hover:text-white';
export const badgeItem = 'py-1 px-1.5 border border-neutral-600 hover:border-current';

function Footer() {
  return (
    <footer className='py-12 bg-neutral-800 text-sm text-neutral-300'>
      <div className='w-11/12 max-w-7xl mx-auto flex flex-wrap'>
        <section className='space-y-2.5 py-4 lg:py-0 md:px-2 basis-full md:basis-1/2 lg:basis-1/4'>
          <Heading
            as='h2'
            variant='sm'
            label='About us'
            color='white'
            isUppercase={true}
          />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapibus lacus. Duis nec vestibulum magna, et dapibus lacus.</p>
          <button className='text-white font-medium font-accent'>read more...</button>
        </section>
        <section className='space-y-2.5 py-4 lg:py-0 md:px-2 basis-full md:basis-1/2 lg:basis-1/4'>
          <Heading
            as='h2'
            variant='sm'
            label='Contact info'
            color='white'
            isUppercase={true}
          />
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
          <Heading
            as='h2'
            variant='sm'
            label='Customer service'
            color='white'
            isUppercase={true}
          />
          <ul className='grid gap-2'>
            <li className={footerListItem}>Help & FAQs</li>
            <li className={footerListItem}>Order Tracking</li>
            <li className={footerListItem}>Shipping & Delivery</li>
            <li className={footerListItem}>Orders History</li>
            <li className={footerListItem}>Advanced search</li>
            <li className={footerListItem}>My Account</li>
            <li className={footerListItem}>Careers</li>
            <li className={footerListItem}>About Us</li>
            <li className={footerListItem}>Corporate Sales</li>
            <li className={footerListItem}>Privacy</li>
          </ul>
        </section>
        <section className='space-y-2.5 py-4 lg:py-0 md:px-2 basis-full md:basis-1/2 lg:basis-1/4'>
          <Heading
            as='h2'
            variant='sm'
            label='Popular tags'
            color='white'
            isUppercase={true}
          />
          <ul className='text-xs font-light font-accent flex flex-wrap gap-2'>
            <li className={`${footerListItem} ${badgeItem}`}>Bag</li>
            <li className={`${footerListItem} ${badgeItem}`}>Black</li>
            <li className={`${footerListItem} ${badgeItem}`}>Blue</li>
            <li className={`${footerListItem} ${badgeItem}`}>Clothes</li>
            <li className={`${footerListItem} ${badgeItem}`}>Fashion</li>
            <li className={`${footerListItem} ${badgeItem}`}>Hub</li>
            <li className={`${footerListItem} ${badgeItem}`}>Jean</li>
            <li className={`${footerListItem} ${badgeItem}`}>Shirt</li>
            <li className={`${footerListItem} ${badgeItem}`}>Skirt</li>
            <li className={`${footerListItem} ${badgeItem}`}>Sports</li>
            <li className={`${footerListItem} ${badgeItem}`}>Sweater</li>
            <li className={`${footerListItem} ${badgeItem}`}>Winter</li>
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