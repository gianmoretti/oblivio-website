import { Asset } from '../../lib/model/product';
import { fetchAllAssets } from "@/app/lib/data";
import { AssociateAssetWithDesignated, DeleteEntity, UpdateEntity } from "../common/crud-buttons";
import { deleteAsset } from '@/app/lib/actions';
import { format } from "date-fns";


export default async function AssetTable() {
  const assets = await fetchAllAssets();
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {assets?.map((asset: Asset) => (
              <div
                key={asset.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>Category: <strong>{asset.category}</strong></p>
                    </div>
                    <div className="mb-2 flex items-center">
                      <p>Name: <strong>{asset.name}</strong></p>
                    </div>
                    <p className="text-sm text-gray-500">{format(new Date(asset.updatedAt),"dd/MM/yyyy") }</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateEntity id={asset.id} entity="assets" label="Asset" />
                    <AssociateAssetWithDesignated assetId={asset.id} />
                    <DeleteEntity id={asset.id} action={deleteAsset} />
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                    <p className="text-sm font-extralight text-justify">
                      {asset.description}
                    </p>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Description
                </th>
                 <th scope="col" className="px-3 py-5 font-medium">
                  Update at
                </th>                
              </tr>
            </thead>
            <tbody className="bg-white">
              {assets?.map((asset) => (
                <tr
                  key={asset.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <span>{asset.category} - {asset.name}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="w-96 truncate">
                      {asset.description}
                   </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {format(new Date(asset.updatedAt),"dd/MM/yyyy") }
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateEntity id={asset.id} entity="assets" label="Asset" />
                      <AssociateAssetWithDesignated assetId={asset.id} />
                      <DeleteEntity id={asset.id} action={deleteAsset} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
