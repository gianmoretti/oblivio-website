"use client";

import Link from "next/link";
import { Button } from "@/app/ui/common/button/button";
import { editDesignated } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { Designated } from "@/app/lib/model/product";

export default function EditDesignatedForm({
  designated,
}: {
  designated: Designated,
}) {
  const initialState = { message: null, errors: {} };
  const editDesignatedWithId = editDesignated.bind(null, designated.id);
  const [state, dispatch] = useFormState(editDesignatedWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
            First Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="firstName"
                name="firstName"
                defaultValue={designated.firstName}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="firstName-error"
              />
            </div>
          </div>
          <div id="firstName-error" aria-live="polite" aria-atomic="true">
            {state.errors?.firstName &&
              state.errors.firstName.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
            Last Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="lastName"
                name="lastName"
                defaultValue={designated.lastName}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="lastName-error"
              />
            </div>
          </div>
          <div id="lastName-error" aria-live="polite" aria-atomic="true">
            {state.errors?.lastName &&
              state.errors.lastName.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                defaultValue={designated.email}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="email-error"
              />
            </div>
          </div>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="fiscalCode" className="mb-2 block text-sm font-medium">
            Fiscal Code
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="fiscalCode"
                name="fiscalCode"
                defaultValue={designated.fiscalCode}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="fiscalCode-error"
              />
            </div>
          </div>
          <div id="fiscalCode-error" aria-live="polite" aria-atomic="true">
            {state.errors?.fiscalCode &&
              state.errors.fiscalCode.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="birthPlace" className="mb-2 block text-sm font-medium">
            Birth Place
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="birthPlace"
                name="birthPlace"
                defaultValue={designated.birthPlace}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="birthPlace-error"
              />
            </div>
          </div>
          <div id="birthPlace-error" aria-live="polite" aria-atomic="true">
            {state.errors?.birthPlace &&
              state.errors.birthPlace.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="birthDate" className="mb-2 block text-sm font-medium">
            Birth Date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                defaultValue={designated.birthDate}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="birthDate-error"
              />
            </div>
          </div>
          <div id="birthDate-error" aria-live="polite" aria-atomic="true">
            {state.errors?.birthDate &&
              state.errors.birthDate.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

         <div className="mb-4">
          <label htmlFor="residence" className="mb-2 block text-sm font-medium">
            Residence
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="residence"
                name="residence"
                defaultValue={designated.residence}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="residence-error"
              />
            </div>
          </div>
          <div id="residence-error" aria-live="polite" aria-atomic="true">
            {state.errors?.residence &&
              state.errors.residence.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="mb-2 block text-sm font-medium">
            Phone Number
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="phoneNumber"
                name="phoneNumber"
                defaultValue={designated.phoneNumber}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="residence-error"
              />
            </div>
          </div>
          <div id="phoneNumber-error" aria-live="polite" aria-atomic="true">
            {state.errors?.phoneNumber &&
              state.errors.phoneNumber.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/designated"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
