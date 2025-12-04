import CssBaseline from '@mui/material/CssBaseline';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import UserShow from './components/UserShow';
import EmployeeCreate from './components/UserCreate';
import UserEdit from './components/UserEdit';
import NotificationsProvider from './hooks/useNotifications/NotificationsProvider';
import DialogsProvider from './hooks/useDialogs/DialogsProvider';
import AppTheme from '../../shared-theme/AppTheme';
import {
  dataGridCustomizations,
  datePickersCustomizations,
  sidebarCustomizations,
  formInputCustomizations,
} from './theme/customizations';
import UserList from './components/UserList';

const router = createHashRouter([
  {
    children: [
      {
        path: '/',
        Component: UserList,
      },
      {
        path: '/users/:userId',
        Component: UserShow,
      },
      {
        path: '/employees/new',
        Component: EmployeeCreate,
      },
      {
        path: '/users/:userId/edit',
        Component: UserEdit,
      },
      // Fallback route for the example routes in dashboard sidebar items
      {
        path: '*',
        Component: UserList,
      },
    ],
  },
]);

const themeComponents = {
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...sidebarCustomizations,
  ...formInputCustomizations,
};

export default function UserDashboard(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props} themeComponents={themeComponents}>
      <CssBaseline enableColorScheme />
      <NotificationsProvider>
        <DialogsProvider>
          <RouterProvider router={router} />
        </DialogsProvider>
      </NotificationsProvider>
    </AppTheme>
  );
}
