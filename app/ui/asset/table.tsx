import { Asset } from '../../lib/model/product';
import { fetchAllAssets } from "@/app/lib/data";
import { DeleteEntity, UpdateEntity } from "../common/crud-buttons";
import { deleteAsset } from '@/app/lib/actions';

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
                      
                      <p>{asset.category}</p>
                      <p>{asset.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{asset.updatedAt}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {asset.description}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateEntity id={asset.id} entity={'assets'} label={'Asset'} />
                    <DeleteEntity id={asset.id} action={deleteAsset} />
                  </div>
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
                  Update at
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Description
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
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
                    <p>{asset.category}</p>
                    <p>{asset.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {asset.updatedAt}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                   {asset.description}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateEntity id={asset.id} entity={'assets'} label={'Asset'} />
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