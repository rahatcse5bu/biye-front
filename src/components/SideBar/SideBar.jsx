import { BioDataTab } from "../BioDataTab/BioDataTab";

export function SideBar() {
  return (
    <aside className="h-full w-full overflow-y-auto bg-white px-2 pb-6 pt-2 lg:rounded-2xl lg:border lg:border-gray-200 lg:px-3 lg:pt-3 lg:shadow-sm">
      <BioDataTab />
    </aside>
  );
}
