// assets
import { IconKey, IconTypography, IconPalette, IconShadow, IconWindmill, IconDashboard, IconBrandChrome } from '@tabler/icons-react';

// constant
const icons = {
  IconKey,
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconDashboard,
  IconBrandChrome
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Legacy Pages',
  caption: 'Pages Caption',
  icon: icons.IconKey,
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Authentication',
      type: 'collapse',
      icon: icons.IconKey,
      children: [
        {
          id: 'login',
          title: 'Login',
          type: 'item',
          url: '/pages/login',
          target: true
        },
        {
          id: 'register',
          title: 'Register',
          type: 'item',
          url: '/pages/register',
          target: true
        }
      ]
    },
    {
      id: 'other',
      title: 'Other',
      type: 'collapse',
      icon: icons.IconKey,
      children: [
        {
          id: 'default',
          title: 'Dashboard',
          type: 'item',
          url: '/dashboard/default',
          icon: icons.IconDashboard,
          breadcrumbs: false
        },
        {
          id: 'sample-page',
          title: 'Sample Page',
          type: 'item',
          url: '/sample-page',
          icon: icons.IconBrandChrome,
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'utilities',
      title: 'Utilities',
      type: 'collapse',
      children: [
        {
          id: 'util-typography',
          title: 'Typography',
          type: 'item',
          url: '/typography',
          icon: icons.IconTypography,
          breadcrumbs: false
        },
        {
          id: 'util-color',
          title: 'Color',
          type: 'item',
          url: '/color',
          icon: icons.IconPalette,
          breadcrumbs: false
        },
        {
          id: 'util-shadow',
          title: 'Shadow',
          type: 'item',
          url: '/shadow',
          icon: icons.IconShadow,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default pages;
