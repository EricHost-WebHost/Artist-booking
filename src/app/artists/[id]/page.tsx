"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface Artist {
  _id: string;
  username: string;
  bio: string;
  videoLink1: string;
  videoLink2?: string;
  videoLink3?: string;
  avatar: { url: string; public_id: string };
}

export default function ArtistDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    occasion: "",
    date: "",
    city: "",
    budget: "",
    guestCount: "",
    name: "",
    email: "",
    contactNumber: "",
    message: "",
    artistId: params.id,
  });
  const { data: session } = useSession();
  const user = session?.user;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/artist/${params.id}`);
        if (response.data.success) {
          setArtist(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching artist details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArtist();
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("/api/enquiry", formData);
      if (response.data.success) {
        setSuccess("Inquiry submitted successfully!");
        setFormData({
          occasion: "",
          date: "",
          city: "",
          budget: "",
          guestCount: "",
          name: "",
          email: "",
          contactNumber: "",
          message: "",
          artistId: params.id,
        });
      } else {
        setError(response.data.message || "Failed to submit the inquiry.");
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "An error occurred while submitting the inquiry."
      );
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#CE1446]"></div>
      </div>
    );
  }

  if (!artist) {
    return <div>Artist not found</div>;
  }

  return (
    <>
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-sm shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 relative overflow-hidden">
                <img
                  src={artist.avatar.url}
                  alt={artist.username}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="md:w-2/3 p-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  {artist.username}
                </h1>
                <p className="text-gray-600 mb-6 leading-relaxed hover:text-gray-800 transition-colors duration-300 text-justify">
                  {artist.bio}
                </p>
                <p className="text-black font-bold mb-6 leading-relaxed hover:text-gray-800 transition-colors duration-300">
                  Some Previous Performances of {artist.username}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {artist.videoLink1 && (
                    <Link
                      href={artist.videoLink1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#CE1446] text-white py-3 px-6 rounded-sm hover:bg-[#A01234] transition duration-300 text-center shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                      Watch Now !
                    </Link>
                  )}
                  {artist.videoLink2 && (
                    <Link
                      href={artist.videoLink2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#CE1446] text-white py-3 px-6 rounded-sm hover:bg-[#A01234] transition duration-300 text-center shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                      Watch Now !
                    </Link>
                  )}
                  {artist.videoLink3 && (
                    <Link
                      href={artist.videoLink3}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#CE1446] text-white py-3 px-6 rounded-sm hover:bg-[#A01234] transition duration-300 text-center shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                      Watch Now !
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {user?._id! != params.id && (
        <div className="flex justify-center items-center w-full min-h-screen p-4">
          <form onSubmit={handleSubmit} className="w-full max-w-4xl">
            <div className="bg-white px-6 sm:px-10 py-8 rounded-sm shadow-md w-full">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-semibold">
                    Inquire Now
                  </h1>
                  <p className="text-gray-400 text-sm sm:text-base">
                    Send an inquiry to {artist.username}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="occasion"
                      className="block mb-2 text-gray-600 text-sm font-medium"
                    >
                      Occasion
                    </label>
                    <div className="relative">
                      <select
                        id="occasion"
                        name="occasion"
                        value={formData.occasion}
                        onChange={handleChange}
                        className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 pr-8 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300 appearance-none"
                        required
                      >
                        <option value="" disabled>
                          Select an occasion
                        </option>
                        <option value="wedding">Wedding</option>
                        <option value="birthday">Birthday</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="concert">Concert</option>
                        <option value="festival">Festival</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="date"
                      className="block mb-2 text-gray-600 text-sm font-medium"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block mb-2 text-gray-600 text-sm font-medium"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
                      placeholder="Enter city"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="budget"
                      className="block mb-2 text-gray-600 text-sm font-medium"
                    >
                      Budget
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        ₹
                      </span>
                      <input
                        type="number"
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full rounded-sm border border-gray-300 bg-transparent py-2 pl-8 pr-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
                        placeholder="Enter your budget"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="guestCount"
                      className="block mb-2 text-gray-600 text-sm font-medium"
                    >
                      Guest Count
                    </label>
                    <input
                      type="number"
                      id="guestCount"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
                      placeholder="Enter guest count"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-gray-600 text-sm font-medium"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-gray-600 text-sm font-medium"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
                      placeholder="Enter Email Address"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contactNumber"
                      className="block mb-2 text-gray-600 text-sm font-medium"
                    >
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      id="contactNumber"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
                      placeholder="Enter contact number"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-gray-600 text-sm font-medium"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
                      placeholder="Enter your message"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
              {error && (
                <div className="mt-4 text-red-500 text-sm">{error}</div>
              )}
              {success && (
                <div className="mt-4 text-green-500 text-sm">{success}</div>
              )}
              <button
                type="submit"
                className="mt-6 w-full bg-[#CE1446] text-white py-2 px-4 rounded-sm text-sm sm:text-base font-medium tracking-wide hover:bg-[#B01238] transition-colors duration-200"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Inquiry"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
