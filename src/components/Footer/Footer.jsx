import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-[#C7AD7F] border-t-2 border-[#A57A5A]">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">

          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <p className="text-sm text-[#8C4411]/80">
                &copy; Copyright 2023. All Rights Reserved.
              </p>
            </div>
          </div>

          {/* Column */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-6 text-xs font-semibold uppercase text-[#8C4411]/70">
              Company
            </h3>
            <ul className="space-y-3">
              {["Features","Pricing","Affiliate Program","Press Kit"].map(i => (
                <li key={i}>
                  <Link className="text-[#8C4411] hover:text-[#AE6E4E]" to="/">
                    {i}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-6 text-xs font-semibold uppercase text-[#8C4411]/70">
              Support
            </h3>
            <ul className="space-y-3">
              {["Account","Help","Contact","Customer Support"].map(i => (
                <li key={i}>
                  <Link className="text-[#8C4411] hover:text-[#AE6E4E]" to="/">
                    {i}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <h3 className="mb-6 text-xs font-semibold uppercase text-[#8C4411]/70">
              Legals
            </h3>
            <ul className="space-y-3">
              {["Terms","Privacy","Licensing"].map(i => (
                <li key={i}>
                  <Link className="text-[#8C4411] hover:text-[#AE6E4E]" to="/">
                    {i}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Footer