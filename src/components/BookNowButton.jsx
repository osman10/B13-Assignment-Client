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

export default function BookNowButton({ TutorName, id }) {
  const { data: session } = authClient.useSession();

  const userName = session?.user?.name || "";
  const userEmail = session?.user?.email || "";
  const tutorName = TutorName || "";

  const handleBookNow = async (e) => {
    e.preventDefault();

    const form = e.target;

    const bookingData = {
      userName: form.userName.value,
      userEmail: form.userEmail.value,
      tutorName: form.tutorName.value,
      phoneNumber: form.phoneNumber.value,
      status: "Confirmed"
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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