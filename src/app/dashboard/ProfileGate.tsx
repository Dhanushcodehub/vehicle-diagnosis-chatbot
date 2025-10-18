// app/dashboard/ProfileGate.tsx
"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, useFieldArray } from "react-hook-form";

type Vehicle = { number: string; model: string; company: string };
type Cycle = { type: "Gear" | "Non-Gear" | "Regular" | "Racing" };
type ProfileForm = {
  fullName: string;
  dob: string;
  bloodGroup: string;
  cars: Vehicle[];
  bikes: Vehicle[];
  cycles: Cycle[];
};

export default function ProfileGate() {
  const [open, setOpen] = useState(false);

  const form = useForm<ProfileForm>({
    defaultValues: {
      fullName: "",
      dob: "",
      bloodGroup: "",
      cars: [{ number: "", model: "", company: "" }],
      bikes: [{ number: "", model: "", company: "" }],
      cycles: [{ type: "Regular" }],
    },
    mode: "onBlur",
  });

  const cars = useFieldArray({ control: form.control, name: "cars" });
  const bikes = useFieldArray({ control: form.control, name: "bikes" });
  const cycles = useFieldArray({ control: form.control, name: "cycles" });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) return;
      const ref = doc(db, "users", u.uid);
      const snap = await getDoc(ref);
      const profile = snap.data();
      const incomplete = !profile || !profile.profileCompleted;
      setOpen(incomplete);
      if (profile) {
        form.reset({
          fullName: profile.fullName ?? "",
          dob: profile.dob ?? "",
          bloodGroup: profile.bloodGroup ?? "",
          cars: profile.cars?.length ? profile.cars : [{ number: "", model: "", company: "" }],
          bikes: profile.bikes?.length ? profile.bikes : [{ number: "", model: "", company: "" }],
          cycles: profile.cycles?.length ? profile.cycles : [{ type: "Regular" }],
        });
      }
    });
    return () => unsub();
  }, [form]);

  async function onSubmit(values: ProfileForm) {
    const u = auth.currentUser;
    if (!u) return;
    await setDoc(
      doc(db, "users", u.uid),
      {
        ...values,
        email: u.email,
        profileCompleted: true,
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Complete your profile</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormField name="fullName" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="dob" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Date of Birth</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="bloodGroup" control={form.control} render={({ field }) => (
                <FormItem className="md:col-span-2"><FormLabel>Blood Group</FormLabel><FormControl><Input placeholder="e.g., A+, B-, O+" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>

            {/* Cars */}
            <section className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Cars ({cars.fields.length})</h3>
                <Button type="button" variant="secondary" onClick={() => cars.append({ number: "", model: "", company: "" })}>Add Car</Button>
              </div>
              {cars.fields.map((f, i) => (
                <div key={f.id} className="grid grid-cols-12 gap-2 items-end">
                  <FormField name={`cars.${i}.number`} control={form.control} render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-3"><FormLabel>Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField name={`cars.${i}.model`} control={form.control} render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-5"><FormLabel>Model</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField name={`cars.${i}.company`} control={form.control} render={({ field }) => (
                    <FormItem className="col-span-10 md:col-span-3"><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <Button type="button" variant="destructive" className="col-span-2 md:col-span-1" onClick={() => cars.remove(i)}>Remove</Button>
                </div>
              ))}
            </section>

            {/* Bikes */}
            <section className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Bikes ({bikes.fields.length})</h3>
                <Button type="button" variant="secondary" onClick={() => bikes.append({ number: "", model: "", company: "" })}>Add Bike</Button>
              </div>
              {bikes.fields.map((f, i) => (
                <div key={f.id} className="grid grid-cols-12 gap-2 items-end">
                  <FormField name={`bikes.${i}.number`} control={form.control} render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-3"><FormLabel>Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField name={`bikes.${i}.model`} control={form.control} render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-5"><FormLabel>Model</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField name={`bikes.${i}.company`} control={form.control} render={({ field }) => (
                    <FormItem className="col-span-10 md:col-span-3"><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <Button type="button" variant="destructive" className="col-span-2 md:col-span-1" onClick={() => bikes.remove(i)}>Remove</Button>
                </div>
              ))}
            </section>

            {/* Cycles */}
            <section className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Cycles ({cycles.fields.length})</h3>
                <Button type="button" variant="secondary" onClick={() => cycles.append({ type: "Regular" })}>Add Cycle</Button>
              </div>
              {cycles.fields.map((f, i) => (
                <div key={f.id} className="grid grid-cols-12 gap-2 items-end">
                  <FormField name={`cycles.${i}.type`} control={form.control} render={({ field }) => (
                    <FormItem className="col-span-10 md:col-span-11">
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <select className="w-full rounded-md border p-2" {...field}>
                          <option>Gear</option>
                          <option>Non-Gear</option>
                          <option>Regular</option>
                          <option>Racing</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="button" variant="destructive" className="col-span-2 md:col-span-1" onClick={() => cycles.remove(i)}>Remove</Button>
                </div>
              ))}
            </section>

            <Button type="submit" className="w-full">Save preferences</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
