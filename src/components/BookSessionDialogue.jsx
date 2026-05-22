import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const BookSessionDialogue = () => {
return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Book Session</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Book Session</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when your're done. 
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>


            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </Field>

            <Field>
              <Label htmlFor="username-1">Phone Number</Label>
              <Input id="username-1" name="phonenumber" defaultValue="@peduarte" />
            </Field>

            <Field>
              <Label htmlFor="username-1">Tutor Name</Label>
              <Input id="username-1" name="tutorname" defaultValue="@peduarte" />
            </Field>

            <Field>
              <Label htmlFor="username-1">Email</Label>
              <Input id="username-1" name="email" defaultValue="@peduarte" />
            </Field>


          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Confirm Booking</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default BookSessionDialogue;