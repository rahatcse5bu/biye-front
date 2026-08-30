import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import BioDataFilter from "../BioDataFilter/BioDataFilter";
import BioDataInput from "../BioDataInput/BioDataInput";

export function BioDataTab() {
  const data = [
    {
      label: "ফিল্টার সমূহ",
      value: "ফিল্টার সমূহ",
      component: "filter",
    },
    {
      label: "বায়োডাটা নং",
      value: "বায়োডাটা নং",
      component: "biodataid",
    },
  ];
  return (
    <Tabs value="ফিল্টার সমূহ" className="w-full">
      <TabsHeader className="rounded-xl bg-gray-100 p-1 shadow-none">
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            className="min-h-11 rounded-lg px-2 text-sm font-bold text-gray-700"
          >
            <div className="flex items-center justify-center">{label}</div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className="overflow-visible">
        {data.map(({ value, component }) => (
          <TabPanel key={value} value={value} className="px-0 pb-0 pt-3">
            {component === "filter" ? <BioDataFilter /> : <BioDataInput />}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
