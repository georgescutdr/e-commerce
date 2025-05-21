import React, { useState, useRef } from 'react';
import { Avatar } from 'primereact/avatar';
import { TieredMenu } from 'primereact/tieredmenu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/auth-context';
import { isLoggedIn } from '../../../../utils/auth-helpers';

export const UserMenu = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const { user, logout } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);

  const menuItems = isLoggedIn() ? [
        {
          label: 'My Profile',
          icon: 'pi pi-user',
          command: () => navigate('/account'),
        },
        {
          label: 'Orders',
          icon: 'pi pi-list',
          command: () => navigate('/orders'),
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => logout(),
        },
      ] : [
        {
          label: 'Login',
          icon: 'pi pi-sign-in',
          command: () => navigate('/login'),
        },
        {
          label: 'Register',
          icon: 'pi pi-user-plus',
          command: () => navigate('/register'),
        },
      ];

  const handleMouseEnter = (e) => {
    if (!menuVisible && menuRef.current) {
      menuRef.current.show(e);
      setMenuVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      try {
        const menu = menuRef.current;
        if (menu && typeof menu.getElement === 'function' && menu.getElement()) {
          menu.hide();
        }
      } catch (err) {
        console.warn('Menu hide failed:', err);
      }
    }, 0);
    setMenuVisible(false);
  };

  return (
    <div
      className="user-menu"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block', position: 'relative' }}
    >
      <Avatar
        className="avatar"
        shape="circle"
        icon="pi pi-user"
        size="large"
        style={{ backgroundColor: '#007bff', color: '#ffffff' }}
      />
      <TieredMenu model={menuItems} popup ref={menuRef} />
    </div>
  );
};

export default UserMenu;
