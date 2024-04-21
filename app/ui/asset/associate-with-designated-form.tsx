"use client";

import Link from "next/link";
import { Button } from "@/app/ui/common/button/button";
import { associateAssetWithDesignated } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { Asset, Designated } from "@/app/lib/model/product";

export default function AssociateAssetWithDesignatedForm({
  asset,
  possibleDesignated
}: {
  asset: Asset,
  possibleDesignated: Designated[],
}) {
  const initialState = { message: null, errors: {} };
  const associateAssetWithDesignatedById = associateAssetWithDesignated.bind(null, asset.id);
  const [state, dispatch] = useFormState(associateAssetWithDesignatedById, initialState);

  const existingDesignatedIds = asset.designatedList.map((designated)=> designated.id).join(",");
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            <p>Asset category: <strong>{asset.category}</strong></p>
            <p>Asset name: <strong>{asset.name}</strong></p>
            <br/>
            to assign to designated below:
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="designatedIds"
                name="designatedIds"
                defaultValue={existingDesignatedIds}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="category-error"
              />
            </div>
          </div>
          <div id="designatedIds-error" aria-live="polite" aria-atomic="true">
            {state.errors?.designatedIds &&
              state.errors.designatedIds.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/assets"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
