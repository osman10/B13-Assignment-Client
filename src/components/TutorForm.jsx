"use client";

import { useState } from "react";

const TutorForm = () => {
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
    Description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   const res = await fetch('http://localhost:5000/addtutor', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ...formData,
    HourlyFee: Number(formData.HourlyFee),
    TotalSlots: Number(formData.TotalSlots),
  }),
});

    const data = await res.json();
    // console.log("Response:", data);

    if (res.ok) {
      toast("Tutor added successfully!");
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
      });
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-center text-2xl font-bold">
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
          className="w-full rounded border p-2"
        >
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
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
          className="w-full rounded bg-black py-2 text-white hover:bg-gray-800"
        >
          Add Tutor
        </button>
      </form>
    </div>
  );
};

export default TutorForm;