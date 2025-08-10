import { useRef, useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { SettingLinks, SidebarLink } from '../../Utils/Sideber/SidebarLink';
import { IoSettings } from 'react-icons/io5';
import Button from './Button';
import { MdArrowForwardIos } from 'react-icons/md';
import { HiLogout } from 'react-icons/hi';
import logo from '../../assets/logo.png';
import { FaFileCsv } from 'react-icons/fa';
import { Modal } from 'antd';

import UploadCsv from './UploadCsv';
import { useUserProfile } from '../../hooks/useUserProfile';
import { LeagueSidebarLink } from '../../Utils/Sideber/LeagueSidebarLink';
const Sidebar = () => {
  const { user } = useUserProfile();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [openCsv, setOpenCsv] = useState(false);
  const [setting_active, set_setting_active] = useState(false);
  const navigate = useNavigate();

  const ref = useRef(null);
  const toggleHandler = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.querySelector('.active')) {
      setOpen(true);
      set_setting_active(true);
    } else {
      set_setting_active(false);
    }
  }, [ref, location.pathname]);

  return (
    <div className=" px-4 pb-10 flex justify-start flex-col gap-3 sidebar">
      {/* <p className='text-6xl text-center text-[var(--bg-white)] my-4 font-bold'>ilera</p> */}
      <img src={logo} alt="Protippz logo" />
      {user?.user?.role !== 'superAdmin' ? SidebarLink?.map((item) => (
        <NavLink
          onClick={() => {
            setOpen(false);
            set_setting_active(false);
          }}
          to={item?.path}
          style={{
            width: '100%',
            justifyContent: 'start',
            paddingLeft: '14px',
            paddingRight: '14px',
          }}
          className="button-white w-full whitespace-nowrap links"
          key={item?.path}
        >
          {item?.icon} {item?.label}
        </NavLink>
      )) : LeagueSidebarLink?.map((item) => (
        <NavLink
          onClick={() => {
            setOpen(false);
            set_setting_active(false);
          }}
          to={item?.path}
          style={{
            width: '100%',
            justifyContent: 'start',
            paddingLeft: '14px',
            paddingRight: '14px',
          }}
          className="button-white w-full whitespace-nowrap links"
          key={item?.path}
        >
          {item?.icon} {item?.label}
        </NavLink>
      ))}
      {user?.user?.role !== 'superAdmin' && <button
        onClick={() => {
          setOpenCsv(true);
        }}
        style={{
          width: '100%',
          justifyContent: 'start',
          paddingLeft: '14px',
          paddingRight: '14px',
          border: 'none',
        }}
        className="button-white w-full whitespace-nowrap links"
      >
        <FaFileCsv /> Upload CSV
      </button>}
      {user?.user?.role !== 'superAdmin' && <div className="relative">
        <Button
          handler={toggleHandler}
          style={{
            width: '100%',
            justifyContent: 'start',
            paddingLeft: '14px',
            paddingRight: '14px',
          }}
          classNames={`button-white w-full whitespace-nowrap links ${open || setting_active ? 'active' : ''
            } `}
          text="Setting"
          icon={<IoSettings size={24} />}
        />
        <MdArrowForwardIos
          size={24}
          className={`${open ? 'rotate-90' : 'rotate-0'
            } absolute right-1 top-[50%] translate-y-[-50%] transition-all`}
        />
      </div>}
      <div
        ref={ref}
        className={`flex justify-start flex-col gap-1 transition-all rounded-md duration-300 overflow-hidden`}
        style={{
          height: open ? `${ref.current.scrollHeight}px` : '0',
        }}
      >
        {user?.user?.role !== 'superAdmin' && SettingLinks?.map((item) => (
          <NavLink
            to={item?.path}
            key={item?.path}
            style={{
              width: '100%',
              justifyContent: 'start',
              paddingLeft: '14px',
              paddingRight: '14px',
              border: 'none',
            }}
            className="button-white overflow-hidden rounded-md w-full whitespace-nowrap links"
          >
            {item?.label}
          </NavLink>
        ))}
      </div>
      <button
        onClick={() => {
          localStorage.removeItem('token');
          return navigate(`/login`);
        }}
        style={{
          width: '100%',
          justifyContent: 'start',
          paddingLeft: '14px',
          paddingRight: '14px',
          border: 'none',
        }}
        className="button-white w-full whitespace-nowrap links"
      >
        <HiLogout /> Log Out
      </button>
      <Modal
        centered
        footer={null}
        open={openCsv}
        onCancel={() => setOpenCsv(false)}
        title="Upload CSV File"
      >
        <UploadCsv setOpenCsv={setOpenCsv} />
      </Modal>
    </div>
  );
};

export default Sidebar;
