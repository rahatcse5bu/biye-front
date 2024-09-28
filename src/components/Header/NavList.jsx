import { Link } from 'react-router-dom';
import SubLinks from './Sublinks';
import { Typography } from '@material-tailwind/react';
import ProfileDropdown from './ProfileDropdown';
const NavList = ({ navData, setOpenNav, user }) => (
  <ul className="box-border z-50 border-none nav-list-ul py-3 pt-6 pl-[10px] flex flex-col lg:flex-row  justify-between ">
    <div className="hidden lg:block">
      <Link to="/">
        <img src="/assets/icons/logo.png" alt="Logo" />
      </Link>
    </div>
    <div>
      {navData.map((item, index) =>
        item.subLinks ? (
          <SubLinks key={index} navItem={item} setOpenNav={setOpenNav} />
        ) : (
          <Typography
            key={index}
            as="li"
            variant="small"
            color="white"
            className={`text-lg font-semibold ${
              item.title === 'Dashboard'
                ? 'h-full py-[11px] px-[15px] w-[120px] bg-[#FFD66C] hover:bg-[#01503b] hover:text-[#fff]'
                : 'nav-item-primary'
            }`}
          >
            <Link to={item.path} onClick={() => setOpenNav(false)}>
              {item.title}
            </Link>
          </Typography>
        )
      )}
    </div>
    <div className="hidden lg:block">
      {!user ? (
        <Typography
          as="li"
          variant="small"
          color="white"
          className="text-lg font-semibold nav-item-primary"
        >
          <Link to="/login">লগইন</Link>
        </Typography>
      ) : (
        <ProfileDropdown user={user} />
      )}
    </div>
  </ul>
);

export default NavList;
