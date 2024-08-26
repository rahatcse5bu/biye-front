/* eslint-disable react/prop-types */
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';
import { Square3Stack3DIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import BioDataFilter from '../BioDataFilter/BioDataFilter';
import BioDataInput from '../BioDataInput/BioDataInput';

export function BioDataTab({ setQuery }) {
  const data = [
    {
      label: 'ফিল্টার সমূহ',
      value: 'ফিল্টার সমূহ',
      icon: Square3Stack3DIcon,
      component: 'filter',
    },
    {
      label: 'বায়োডাটা নং',
      value: 'বায়োডাটা নং',
      icon: UserCircleIcon,
      component: 'biodataid',
    },
  ];
  return (
    <Tabs value="ফিল্টার সমূহ">
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            <div className="flex items-center gap-2">{label}</div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, component }) => (
          <TabPanel key={value} value={value}>
            {component === 'filter' ? (
              <BioDataFilter setQuery={setQuery} />
            ) : (
              <BioDataInput setQuery={setQuery} />
            )}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
