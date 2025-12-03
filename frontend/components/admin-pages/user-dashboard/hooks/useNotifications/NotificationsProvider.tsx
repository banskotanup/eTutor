import * as React from 'react';
import Alert from '@mui/material/Alert';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import CloseIcon from '@mui/icons-material/Close';
import useSlotProps from '@mui/utils/useSlotProps';
import NotificationsContext from './NotificationsContext';
import type {
  CloseNotification,
  ShowNotification,
  ShowNotificationOptions,
} from './useNotifications';

const RootPropsContext = React.createContext<NotificationsProviderProps | null>(null);

interface NotificationProps {
  notificationKey: string;
  badge: string | null;
  open: boolean;
  message: React.ReactNode;
  options: ShowNotificationOptions;
}

function Notification({ notificationKey, open, message, options, badge }: NotificationProps) {
  const notificationsContext = React.useContext(NotificationsContext);
  if (!notificationsContext) throw new Error('Notifications context used without provider.');

  const { close } = notificationsContext;
  const { severity, actionText, onAction, autoHideDuration } = options;

  const handleClose = React.useCallback(
    (event: unknown, reason?: string) => {
      if (reason === 'clickaway') return;
      close(notificationKey);
    },
    [notificationKey, close]
  );

  const action = (
    <>
      {onAction && (
        <Button color="inherit" size="small" onClick={onAction}>
          {actionText ?? 'Action'}
        </Button>
      )}
      <IconButton size="small" aria-label="Close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const duration = autoHideDuration ?? 3000; // default 3 seconds

  const props = React.useContext(RootPropsContext);
  const snackbarSlotProps = useSlotProps({
    elementType: Snackbar,
    ownerState: props,
    externalSlotProps: {},
    additionalProps: { open, autoHideDuration: duration, onClose: handleClose, action },
  });

  return (
    <Snackbar key={notificationKey} {...snackbarSlotProps}>
      <Badge badgeContent={badge} color="primary" sx={{ width: '100%' }}>
        {severity ? (
          <Alert severity={severity} sx={{ width: '100%' }} action={action}>
            {message}
          </Alert>
        ) : (
          <SnackbarContent message={message} action={action} />
        )}
      </Badge>
    </Snackbar>
  );
}

interface NotificationQueueEntry {
  notificationKey: string;
  options: ShowNotificationOptions;
  open: boolean;
  message: React.ReactNode;
}

interface NotificationsState {
  queue: NotificationQueueEntry[];
}

interface NotificationsProps {
  state: NotificationsState;
}

function Notifications({ state }: NotificationsProps) {
  const currentNotification = state.queue[0] ?? null;
  return currentNotification ? (
    <Notification
      {...currentNotification}
      badge={state.queue.length > 1 ? String(state.queue.length) : null}
    />
  ) : null;
}

export interface NotificationsProviderProps {
  children?: React.ReactNode;
}

let nextId = 0;
const generateId = () => nextId++;

export default function NotificationsProvider({ children }: NotificationsProviderProps) {
  const [state, setState] = React.useState<NotificationsState>({ queue: [] });

  const show = React.useCallback<ShowNotification>((message, options = {}) => {
    const notificationKey = options.key ?? `notification-${generateId()}`;

    setState((prev) => {
      if (prev.queue.some((n) => n.notificationKey === notificationKey)) return prev;
      return {
        ...prev,
        queue: [...prev.queue, { message, options, notificationKey, open: true }],
      };
    });

    return notificationKey;
  }, []);

  const close = React.useCallback<CloseNotification>((key) => {
    setState((prev) => ({
      ...prev,
      queue: prev.queue.filter((n) => n.notificationKey !== key),
    }));
  }, []);

  const contextValue = React.useMemo(() => ({ show, close }), [show, close]);

  return (
    <RootPropsContext.Provider value={{ children }}>
      <NotificationsContext.Provider value={contextValue}>
        {children}
        <Notifications state={state} />
      </NotificationsContext.Provider>
    </RootPropsContext.Provider>
  );
}
