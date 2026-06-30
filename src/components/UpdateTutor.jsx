"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaEdit } from "react-icons/fa";


export function UpdateTutor({ tutor,onUpdate }) {

  const [formData, setFormData] = useState({
    TutorName: tutor.TutorName,
    PhotoURL: tutor.PhotoURL,
    Subject: tutor.Subject,
    HourlyFee: tutor.HourlyFee,
    TotalSlots: tutor.TotalSlots,
    Available: tutor.Available,
    SessionStartDate: tutor.SessionStartDate,
    SessionEndDate: tutor.SessionEndDate,
    Institution: tutor.Institution,
    Experience: tutor.Experience,
    Location: tutor.Location,
    TeachingMode: tutor.TeachingMode,
    Description: tutor.Description,
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleUpdate = async () => {

    try {

      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;


      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${tutor._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );


      const data = await res.json();


if(res.ok){

  toast.success("Tutor updated successfully");


  onUpdate({
    ...tutor,
    ...formData,
    _id: tutor._id
  });


}else{

  toast.error(data.message);

}


    } catch(err){

      console.log(err);
      toast.error("Update failed");

    }

  };



  return (
    <Dialog>

      <form>

        <DialogTrigger asChild>

          <Button
            className="
            flex items-center gap-2 rounded-lg 
            bg-blue-600 px-4 py-4 text-white 
            hover:bg-blue-700"
          >
            <FaEdit />
            Update
          </Button>

        </DialogTrigger>



        <DialogContent className="sm:max-w-lg">


          <DialogHeader>

            <DialogTitle>
              Edit Tutor
            </DialogTitle>


            <DialogDescription>
              Update your tutor information.
            </DialogDescription>

          </DialogHeader>




          <div className="
          -mx-4 no-scrollbar 
          max-h-[50vh] overflow-y-auto px-4">


            <FieldGroup className="space-y-3">


              {[
                ["TutorName","Tutor Name"],
                ["PhotoURL","Photo URL"],
                ["Subject","Subject"],
                ["Available","Available"],
                ["Institution","Institution"],
                ["Experience","Experience"],
                ["Location","Location"],
                ["TeachingMode","Teaching Mode"],
                ["Description","Description"],
              ].map(([name,label]) => (

                <Field key={name}>

                  <Label>{label}</Label>

                  <Input
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                  />

                </Field>

              ))}



              <div className="grid grid-cols-2 gap-3">


                <Field>

                  <Label>Hourly Fee</Label>

                  <Input
                    type="number"
                    name="HourlyFee"
                    value={formData.HourlyFee}
                    onChange={handleChange}
                  />

                </Field>



                <Field>

                  <Label>Total Slots</Label>

                  <Input
                    type="number"
                    name="TotalSlots"
                    value={formData.TotalSlots}
                    onChange={handleChange}
                  />

                </Field>


              </div>




              <div className="grid grid-cols-2 gap-3">


                <Field>

                  <Label>Start Date</Label>

                  <Input
                    type="date"
                    name="SessionStartDate"
                    value={formData.SessionStartDate}
                    onChange={handleChange}
                  />

                </Field>



                <Field>

                  <Label>End Date</Label>

                  <Input
                    type="date"
                    name="SessionEndDate"
                    value={formData.SessionEndDate}
                    onChange={handleChange}
                  />

                </Field>


              </div>


            </FieldGroup>


          </div>




          <DialogFooter>


            <DialogClose asChild>

              <Button variant="outline">
                Cancel
              </Button>

            </DialogClose>



            <Button
              type="button"
              onClick={handleUpdate}
            >
              Save changes
            </Button>


          </DialogFooter>



        </DialogContent>


      </form>

    </Dialog>
  );
}