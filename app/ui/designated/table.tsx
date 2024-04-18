import Image from "next/image";
import { fetchAllDesignated } from "@/app/lib/data";
import { Designated } from '../../lib/model/product';
import { deleteDesignated } from "@/app/lib/actions";
import { DeleteEntity, UpdateEntity } from "../common/crud-buttons";

export default async function DesignatedTable() {
  const designateds = await fetchAllDesignated();
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {designateds?.map((designated: Designated) => (
              <div
                key={designated.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {designated.imageUrl && (<Image
                        src={designated.imageUrl}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${designated.firstName}'s profile picture`}
                      />)}
                      <p>{designated.firstName} {designated.lastName}</p>
                    </div>
                    <p className="text-sm text-gray-500">{designated.email}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {designated.fiscalCode}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateEntity id={designated.id} entity={'designated'} label={'Designated'} />
                    <DeleteEntity id={designated.id} action={deleteDesignated} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Designated
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Fiscal code
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {designateds?.map((designated) => (
                <tr
                  key={designated.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {designated.imageUrl && (
                      <Image
                        src={designated.imageUrl}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${designated.firstName} ${designated.lastName}'s profile picture`}
                      />
                    )}
                    <p>{designated.firstName} {designated.lastName}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {designated.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                   {designated.fiscalCode}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateEntity id={designated.id} entity={'designateds'} label={'Designated'} />
                      <DeleteEntity id={designated.id} action={deleteDesignated} />
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
