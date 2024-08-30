import React, { useEffect, useState, useMemo } from 'react';
import { Button, IconButton, Menu, MenuItem } from '@material-tailwind/react';
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { useBio } from '../../contexts/useBio';
import { convertToQuery } from '../../utils/query';
import { useNavigate } from 'react-router-dom';

export function Pagination() {
  const { setQuery, setFilterFields, limit, size, page, query } = useBio();
  const [active, setActive] = useState(page);
  const [itemsPerPage, setItemsPerPage] = useState(limit);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const totalPage = size ? Math.ceil(size / itemsPerPage) : 0;

  const handleOpen = () => setOpen(!open);
  const handleSelect = (value) => {
    setItemsPerPage(value);
    setActive(1);
    setOpen(false);
  };

  useEffect(() => {
    const updateQuery = () => {
      setQuery((prev) => ({
        ...prev,
        user_status:
          import.meta.env.VITE_REACT_APP_NODE_ENV === 'development'
            ? 'in review'
            : 'active',
        page: active,
        limit: itemsPerPage,
      }));
      setFilterFields((prev) => ({
        ...prev,
        user_status:
          import.meta.env.VITE_REACT_APP_NODE_ENV === 'development'
            ? 'in review'
            : 'active',
        page: active,
        limit: itemsPerPage,
      }));

      const textString = convertToQuery({
        ...query,
        user_status:
          import.meta.env.VITE_REACT_APP_NODE_ENV === 'development'
            ? 'in review'
            : 'active',
        page: active,
        limit: itemsPerPage,
      });
      navigate(`/biodatas?${textString}`);
    };

    const debouncedUpdateQuery = setTimeout(updateQuery, 300);

    return () => clearTimeout(debouncedUpdateQuery);
  }, [active, itemsPerPage, setQuery, setFilterFields]);

  const getItemProps = (index) => ({
    variant: active === index ? 'filled' : 'text',
    color: 'gray',
    onClick: () => setActive(index),
    className: 'rounded-full',
  });

  const next = () => {
    if (active === totalPage) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  const goToFirst = () => {
    setActive(1);
  };

  const goToLast = () => {
    setActive(totalPage);
  };

  const visiblePages = useMemo(() => {
    if (totalPage <= 5) {
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }

    if (active <= 3) {
      return [1, 2, 3, 4, '...', totalPage];
    } else if (active >= totalPage - 2) {
      return [1, '...', totalPage - 3, totalPage - 2, totalPage - 1, totalPage];
    } else {
      return [1, '...', active - 1, active, active + 1, '...', totalPage];
    }
  }, [active, totalPage]);

  return (
    <div className="flex flex-col items-center gap-4 py-5">
      <div className="relative inline-block text-left">
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={handleOpen}
        >
          Items per page: {itemsPerPage}
          <ChevronDownIcon strokeWidth={2} className="w-4 h-4" />
        </Button>
        {open && (
          <Menu
            className="absolute z-10 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            onClose={() => setOpen(false)}
          >
            {[5, 10, 20, 30, 50, 100].map((item) => (
              <MenuItem
                key={item}
                className={`block px-4 py-2 text-sm cursor-pointer ${item === itemsPerPage ? 'font-bold text-blue-500' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => handleSelect(item)}
              >
                {item}
              </MenuItem>
            ))}
          </Menu>
        )}
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="text"
          className="flex items-center gap-2 rounded-full"
          onClick={goToFirst}
          disabled={active === 1}
        >
          <ChevronDoubleLeftIcon strokeWidth={2} className="w-4 h-4" />
          First
        </Button>
        <Button
          variant="text"
          className="flex items-center gap-2 rounded-full"
          onClick={prev}
          disabled={active === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="w-4 h-4" /> Previous
        </Button>
        <div className="flex items-center gap-2">
          {visiblePages.map((item, index) =>
            typeof item === 'string' ? (
              <span key={index} className="px-2">
                ...
              </span>
            ) : (
              <IconButton key={index} {...getItemProps(item)}>
                {item}
              </IconButton>
            )
          )}
        </div>
        <Button
          variant="text"
          className="flex items-center gap-2 rounded-full"
          onClick={next}
          disabled={active === totalPage || totalPage === 0}
        >
          Next
          <ArrowRightIcon strokeWidth={2} className="w-4 h-4" />
        </Button>
        <Button
          variant="text"
          className="flex items-center gap-2 rounded-full"
          onClick={goToLast}
          disabled={active === totalPage || totalPage === 0}
        >
          Last
          <ChevronDoubleRightIcon strokeWidth={2} className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
