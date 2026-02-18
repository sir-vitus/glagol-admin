// assets
import { IconTypography, IconUsers, IconTheater } from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconUsers,
  IconTheater
};

// ==============================|| USERS MENU ITEMS ||============================== //

const admin = {
  id: 'users-group',
  title: 'Админ',
  type: 'group',
  children: [
    {
      id: 'users',
      title: 'Актеры',
      type: 'item',
      url: '/users',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    {
      id: 'shows',
      title: 'Спектакли',
      type: 'item',
      url: '/shows',
      icon: icons.IconTheater,
      breadcrumbs: false
    },
  ]
};

export default admin;
