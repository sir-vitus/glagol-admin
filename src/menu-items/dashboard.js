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
      id: 'shows-availability',
      title: 'Планирование',
      type: 'item',
      url: '/dashboard/shows-availability',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'shows-availability-table',
      title: 'Таблица спектаклей',
      type: 'item',
      url: '/dashboard/shows-availability-table',
      icon: icons.IconCalendar,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
