"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export default function BookNowButton({ TutorName, }) {
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [tutorName, setTutorName] = useState(TutorName || "");
  const[userId, setUserId] = useState("");


  // 1. Get session  info
  useEffect(() => {
    const initAuth = async () => {
      try {
        const session = await authClient.getSession();
        const { data: tokenData } = await authClient.token();
        setUserId(session?.data?.user?.id || "");
        setToken(tokenData?.token || "");
        setUserName(session?.data?.user?.name || "");
        setUserEmail(session?.data?.user?.email || "");
        setTutorName(TutorName || "");



      } catch (err) {
        console.error("Auth error:", err);
      }
    };
    initAuth();
  }, []);

 


  const handleBookNow = async (e) => {
    e.preventDefault();
    const form = e.target;

    const bookingData = {
      userId: userId,
      userName: form.userName.value,
      userEmail: form.userEmail.value,
      tutorName: form.tutorName.value,
      phoneNumber: form.phoneNumber.value,
      status: "Booked"
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to create booking!");
        return;
      }

      toast.success("Booking created successfully!");

      form.reset();
    } catch (error) {
      toast.error(
        error.message || "An error occurred while creating the booking."
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full mt-6">
          Book Now
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleBookNow}>
          <DialogHeader>
            <DialogTitle>
              Book Tutor
            </DialogTitle>

            <DialogDescription>
              Fill up the booking information below.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="mt-4 space-y-4">
            {/* Name */}
            <Field>
              <Label htmlFor="userName">
                Name
              </Label>

              <Input
                id="userName"
                name="userName"
                defaultValue={userName}
                placeholder="Enter your name"
                required
              />
            </Field>

            {/* Email */}
            <Field>
              <Label htmlFor="userEmail">
                Email
              </Label>

              <Input
                id="userEmail"
                name="userEmail"
                type="email"
                defaultValue={userEmail}
                placeholder="Enter your email"
                required
              />
            </Field>

            {/* Tutor Name */}
            <Field>
              <Label htmlFor="tutorName">
                Tutor Name
              </Label>

              <Input
                id="tutorName"
                name="tutorName"
                defaultValue={tutorName}
                placeholder="Tutor name"
                readOnly
                required
              />
            </Field>

            {/* Phone Number */}
            <Field>
              <Label htmlFor="phoneNumber">
                Phone Number
              </Label>

              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="Enter phone number"
                required
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit">
              Confirm Booking
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}