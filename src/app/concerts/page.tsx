"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  OrangeLine,
  BlueLine,
  Search,
  SideArrow,
} from "../../components/svgIcons";

const concertData = [
  {
    name: "Summer Music Festival",
    imageUrl:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQJgAE0k0gDSS-HtqJUOGFFR2y6oo_9JSzt58jK-gtDyiax8CVNrdyBVzppOvdW",
    date: "2024-08-15",
    link: "/concert_inquiry",
    description:
      "Join us for an unforgettable evening of music with John Smith.",
    address: "The Fillmore Auditorium, 1999 Mori Blvd, Delhi",
    Pricing: "₹2,500",
  },
  {
    name: "Rock Legends Live",
    imageUrl:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQJgAE0k0gDSS-HtqJUOGFFR2y6oo_9JSzt58jK-gtDyiax8CVNrdyBVzppOvdW",
    date: "2024-09-10",
    link: "concert_inquiry",
    description:
      "Join us for an unforgettable evening of music with John Smith.",
    address: "The Fillmore Auditorium, 1999 Mori Blvd, Delhi",
    Pricing: "₹2,500",
  },
  {
    name: "Electronic Dance Night",
    imageUrl:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRxYB4j9DVUnQtw0h5rXPXeHVXo1H40n_z0aNvTZMmIG-a0ZtevxuKXVxdxkYtV",
    date: "2024-10-20",
    link: "concert_inquiry",
    description:
      "Join us for an unforgettable evening of music with John Smith.",
    address: "The Fillmore Auditorium, 1999 Mori Blvd, Delhi",
    Pricing: "₹2,500",
  },
  {
    name: "Classical Harmony",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6JNdh7NMTUZjc-lwuajcdNtoxeVHRAM3_2H04GxCPIPuoVinfsuVx_k8y4_W",
    date: "2024-11-05",
    link: "concert_inquiry",
    description:
      "Join us for an unforgettable evening of music with John Smith.",
    address: "The Fillmore Auditorium, 1999 Mori Blvd, Delhi",
    Pricing: "₹2,500",
  },
  {
    name: "Jazz Under the Stars",
    imageUrl:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSoH0QxDGjQkC2FB9PdGyB6N4_P8w0GyDhmktxNqHbo_2_jeJ3xe9vGTYxivBWe",
    date: "2024-12-15",
    link: "concert_inquiry",
    description:
      "Join us for an unforgettable evening of music with John Smith.",
    address: "The Fillmore Auditorium, 1999 Mori Blvd, Delhi",
    Pricing: "₹2,500",
  },
  {
    name: "Pop Extravaganza",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_1NLeWraoyI-qvf2r3I-24e1wktzEPn-7S5QY6sLUUcKc9dHETc4l_VnNFQZU",
    date: "2024-11-25",
    link: "concert_inquiry",
    description:
      "Join us for an unforgettable evening of music with John Smith.",
    address: "The Fillmore Auditorium, 1999 Mori Blvd, Delhi",
    Pricing: "₹2,500",
  },
  {
    name: "Indie Rock Fest",
    imageUrl:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSnG_c6zoch0NM1a4Sl3FsvrOG1DC6SvLaJP-Bgep4odRtpQYzpUUPdeFYwGE3Q",
    date: "2024-09-22",
    link: "concert_inquiry",
    description:
      "Join us for an unforgettable evening of music with John Smith.",
    address: "The Fillmore Auditorium, 1999 Mori Blvd, Delhi",
    Pricing: "₹2,500",
  },
  {
    name: "Country Music Gala",
    imageUrl:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSqjBFzatVELzg4Q4fXNurmX0kXzvk6iR_nWTKFPxCTjY0BLYXs5wNMioUEjI5J",
    date: "2024-08-30",
    link: "concert_inquiry",
    description:
      "Join us for an unforgettable evening of music with John Smith.",
    address: "The Fillmore Auditorium, 1999 Mori Blvd, Delhi",
    Pricing: "₹2,500",
  },
];

export default function Page() {
  const [filterDate, setFilterDate] = useState("");
  const [filterName, setFilterName] = useState("");

  const filteredConcerts = concertData.filter(
    (concert) =>
      (filterDate === "" || concert.date === filterDate) &&
      (filterName === "" ||
        concert.name.toLowerCase().includes(filterName.toLowerCase()))
  );

  return (
    <>
      {/* search Bar */}
      <div className="relative overflow-hidden bg-gradient-to-tl from-[#E2BFD9] via-purple-100 to-[#E2BFD9]">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 bg-gradient-to-tl from-[#E2BFD9] via-purple-100 to-[#E2BFD9]">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-800">
              Search Concerts
            </h1>
            <p className="mt-3 text-gray-600">
              Search your favorite Concerts and enjoy!
            </p>
            <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
              <form>
                <div className="relative z-10 flex gap-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100">
                  <div className="w-full">
                    <label
                      htmlFor="hs-search-article-1"
                      className="block text-sm text-gray-700 font-medium"
                    >
                      <span className="sr-only">Search for a Concert</span>
                    </label>
                    <input
                      type="text"
                      name="hs-search-article-1"
                      id="hs-search-article-1"
                      className="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Search for a Concert"
                      value={filterName}
                      onChange={(e) => setFilterName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Link
                      className="size-[46px] inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-[#674188] text-white hover:bg-[#674188] disabled:opacity-50 disabled:pointer-events-none"
                      href="#"
                    >
                      <Search />
                    </Link>
                  </div>
                </div>
              </form>
              <div className="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20">
                <OrangeLine />
              </div>
              <div className="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
                <BlueLine />
              </div>
            </div>
            <div className="mt-8">
              {/* search date */}
              <div className="m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-white">
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm transition bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Concerts section */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredConcerts.map((event, index) => (
            <div
              key={index}
              className="hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <Link
                className="relative flex flex-col w-full min-h-60 bg-center bg-cover rounded-xl"
                href={event.link}
                style={{ backgroundImage: `url(${event.imageUrl})` }}
              >
                <div className="flex-auto p-4 md:p-6">
                  <h3 className="text-xl text-white/90">
                    <span className="font-bold">{event.name}</span>
                    {event.date}
                  </h3>
                </div>
                <div className="pt-0 p-4 md:p-6">
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-white/90">
                    Explore
                    <SideArrow />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}