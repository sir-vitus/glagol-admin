// assets
import { IconTypography, IconUsers, IconTheater, IconArchive } from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconUsers,
  IconTheater,
  IconArchive
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
    {
      id: 'archive',
      title: 'Архив',
      type: 'collapse',
      icon: icons.IconArchive,
      children: [
        {
          id: 'users',
          title: 'Актеры',
          icon: icons.IconUsers,
          type: 'item',
          url: '/archive/users',
        },
        {
          id: 'shows',
          title: 'Спектакли',
          icon: icons.IconTheater,
          type: 'item',
          url: '/archive/shows',
        }
      ]
    },
  ]
};

export default admin;
