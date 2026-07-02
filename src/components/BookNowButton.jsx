"use client";

import { useEffect, useState } from "react";
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

export default function BookNowButton({ TutorName, tutorInfo }) {
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [tutorName, setTutorName] = useState(TutorName || "");
  const [userId, setUserId] = useState("");

  const { SessionStartDate, SessionEndDate, TotalSlots } = tutorInfo;

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
        console.error(err);
      }
    };

    initAuth();
  }, [TutorName]);

  const handleBookNow = async (e) => {
    e.preventDefault();

    const form = e.target;

    const currentDate = new Date();
    const sessionStartDate = new Date(SessionStartDate);
    const sessionEndDate = new Date(SessionEndDate);
    const totalSlots = Number(TotalSlots);

    // console.log({
    //   currentDate,
    //   sessionStartDate,
    //   sessionEndDate,
    //   totalSlots,
    //   beforeStart: currentDate < sessionStartDate,
    //   afterEnd: currentDate > sessionEndDate,
    //   noSlots: totalSlots <= 0,
    // });

    if (
      isNaN(sessionStartDate.getTime()) ||
      isNaN(sessionEndDate.getTime())
    ) {
      toast.error("Invalid session date.");
      return;
    }

    if (currentDate < sessionStartDate) {
      toast.error("Booking is not available yet. The session has not started.");
      return;
    }

    if (currentDate > sessionEndDate) {
      toast.error("Booking is no longer available. The session has ended.");
      return;
    }

    if (totalSlots <= 0) {
      toast.error("Booking is no longer available. No slots left.");
      return;
    }

    const bookingData = {
      userId,
      userName: form.userName.value,
      userEmail: form.userEmail.value,
      tutorName: form.tutorName.value,
      phoneNumber: form.phoneNumber.value,
      status: "Booked",
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
      toast.error(error.message || "Something went wrong.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full mt-6">Book Now</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleBookNow}>
          <DialogHeader>
            <DialogTitle>Book Tutor</DialogTitle>
            <DialogDescription>
              Fill up the booking information below.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="mt-4 space-y-4">
            <Field>
              <Label htmlFor="userName">Name</Label>
              <Input
                id="userName"
                name="userName"
                defaultValue={userName}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="userEmail">Email</Label>
              <Input
                id="userEmail"
                name="userEmail"
                type="email"
                defaultValue={userEmail}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="tutorName">Tutor Name</Label>
              <Input
                id="tutorName"
                name="tutorName"
                defaultValue={tutorName}
                readOnly
              />
            </Field>

            <Field>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
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

            <Button type="submit">Confirm Booking</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}