import { PencilIcon, PlusIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface CreateEntityProps {
  entity: string;
  label: string;
}

export const CreateEntity: React.FC<CreateEntityProps> = ({entity, label})=> (
  <Link
    href={`/dashboard/${entity}/create`}
    className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
  >
    <span className="hidden md:block">{`Create ${label}`}</span>{" "}
    <PlusIcon className="h-5 md:ml-4" />
  </Link>
);

interface UpdateEntityProps extends CreateEntityProps {
  id: string;
}

export const UpdateEntity: React.FC<UpdateEntityProps> = ({ id,entity }) => (
  <Link
    href={`/dashboard/${entity}/${id}/edit`}
    className="rounded-md border p-2 hover:bg-gray-100"
  >
    <PencilIcon className="w-5" />
  </Link>
);

interface DeleteEntityProps {
  id: string;
  action: (id: string) => void,
}

export const DeleteEntity: React.FC<DeleteEntityProps> = ({ id, action }) => {
  const deleteEntityWithId = action.bind(null, id);

  return (
    <form action={deleteEntityWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

interface AssociateAssetWithDesignatedProps {
  assetId: string;
}

export const AssociateAssetWithDesignated: React.FC<AssociateAssetWithDesignatedProps> = ({ assetId }) => (
  <Link
    href={`/dashboard/assets/${assetId}/associate`}
    className="rounded-md border p-2 hover:bg-gray-100"
  >
    <UserPlusIcon className="w-5" />
  </Link>
);
