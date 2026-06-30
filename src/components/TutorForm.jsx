"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TutorForm = () => {
  const [token, setToken] = useState("");
  const [userId, setUserId ]= useState("");


  const [addTutor, setAddTutor] = useState("Add Tutor");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    TutorName: "",
    PhotoURL: "",
    Subject: "",
    HourlyFee: "",
    TotalSlots: "",
    Available: "",
    SessionStartDate: "",
    SessionEndDate: "",
    Institution: "",
    Experience: "",
    Location: "",
    TeachingMode: "Online",
    Description: ""
  });

  // 1. Get session  info
  useEffect(() => {
    const initAuth = async () => {
      try {
        const session = await authClient.getSession();
        const { data: tokenData } = await authClient.token();
        setUserId(session.data.user.id || "")
        setToken(tokenData?.token || "");
      } catch (err) {
        console.error("Auth error:", err);
      }
    };
    initAuth();
  }, []);


  const handleChange = (e) => {
    setFormData({
      ...formData,     [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAddTutor("Adding tutor...");

    try {

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/addtutor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData, userId,
          HourlyFee: Number(formData.HourlyFee),
          TotalSlots: Number(formData.TotalSlots),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Tutor added successfully!");
        setFormData({
          TutorName: "",
          PhotoURL: "",
          Subject: "",
          HourlyFee: "",
          TotalSlots: "",
          Available: "",
          SessionStartDate: "",
          SessionEndDate: "",
          Institution: "",
          Experience: "",
          Location: "",
          TeachingMode: "Online",
          Description: "",
          userId,
        });
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setAddTutor("Add Tutor");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-8 text-center text-4xl font-extrabold bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
        Add New Tutor
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="TutorName"
          placeholder="Tutor Name"
          value={formData.TutorName}
          onChange={handleChange}
          className="w-full rounded border p-2"
          required
        />

        <input
          type="text"
          name="PhotoURL"
          placeholder="Photo URL"
          value={formData.PhotoURL}
          onChange={handleChange}
          className="w-full rounded border p-2"
          required
        />

        <input
          type="text"
          name="Subject"
          placeholder="Subject"
          value={formData.Subject}
          onChange={handleChange}
          className="w-full rounded border p-2"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="HourlyFee"
            placeholder="Hourly Fee"
            value={formData.HourlyFee}
            onChange={handleChange}
            className="w-full rounded border p-2"
            required
          />
          <input
            type="number"
            name="TotalSlots"
            placeholder="Total Slots"
            value={formData.TotalSlots}
            onChange={handleChange}
            className="w-full rounded border p-2"
            required
          />
        </div>

        <input
          type="text"
          name="Available"
          placeholder="Available Time"
          value={formData.Available}
          onChange={handleChange}
          className="w-full rounded border p-2"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="SessionStartDate"
            value={formData.SessionStartDate}
            onChange={handleChange}
            className="w-full rounded border p-2"
            required
          />
          <input
            type="date"
            name="SessionEndDate"
            value={formData.SessionEndDate}
            onChange={handleChange}
            className="w-full rounded border p-2"
            required
          />
        </div>

        <input
          type="text"
          name="Institution"
          placeholder="Institution"
          value={formData.Institution}
          onChange={handleChange}
          className="w-full rounded border p-2"
        />

        <input
          type="text"
          name="Experience"
          placeholder="Experience"
          value={formData.Experience}
          onChange={handleChange}
          className="w-full rounded border p-2"
        />

        <input
          type="text"
          name="Location"
          placeholder="Location"
          value={formData.Location}
          onChange={handleChange}
          className="w-full rounded border p-2"
        />

        <select
          name="TeachingMode"
          value={formData.TeachingMode}
          onChange={handleChange}
          className="w-full rounded border p-2 "
        >
          <option value="Online" className="dark:text-black">Online</option>
          <option value="Offline" className="dark:text-black">Offline</option>
          <option value="Both" className="dark:text-black">Both</option>
        </select>

        <textarea
          name="Description"
          placeholder="Description"
          value={formData.Description}
          onChange={handleChange}
          className="w-full rounded border p-2"
          rows={4}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full rounded py-2 text-white dark:bg-white dark:text-black dark:hover:bg-white/90 ${isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-gray-800"
            }`}
        >
          {addTutor}
        </button>
      </form>
    </div>
  );
};

export default TutorForm;