"use client";

import Link from "next/link";
import { Button } from "@/app/ui/common/button/button";
import { associateAssetWithDesignated } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { Asset, Designated } from "@/app/lib/model/product";
import Multiselect from 'multiselect-react-dropdown';
import { useCallback, useMemo, useState } from "react";

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

  const designatedMapper = (designated: Designated) => ({
    name: `${designated.firstName} ${designated.lastName}`,
    id: designated.id,
  });
  const designatedOptions = useMemo(() => possibleDesignated.map(designatedMapper),[possibleDesignated]);
  console.log("----> OPTIONS:", designatedOptions);

  const existingDesignatedIds = useMemo(()=>asset.designatedList.map(designatedMapper),[asset.designatedList]);
  console.log("----> EXISTING: ", existingDesignatedIds);

  const [designatedIds, setDesignatedIds] = useState<string[]>(existingDesignatedIds.map(d => d.id));

  const onChange = useCallback((selectedList: any, selectedItem: any) => {
                  console.log("----> SELECTED: ", selectedList, selectedItem);
                  setDesignatedIds(selectedList.map((d: any) => d.id));
                }, []);

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
            <input type="hidden" name="designatedIds" value={designatedIds} />
            <div className="relative">
              <Multiselect
                options={designatedOptions}
                selectedValues={existingDesignatedIds}
                displayValue="name"
                onSelect={onChange}
                onRemove={onChange}
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
