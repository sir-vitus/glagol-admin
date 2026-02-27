// assets
import { IconDashboard, IconCalendar } from '@tabler/icons-react';

// constant
const icons = { IconDashboard, IconCalendar };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
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
      id: 'shows-availability',
      title: 'Планирование',
      type: 'item',
      url: '/dashboard/shows-availability',
      icon: icons.IconCalendar,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
