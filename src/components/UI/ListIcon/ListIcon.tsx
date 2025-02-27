import { useLocation } from 'react-router-dom';
import { Badge } from '@mui/material';

import chatIcon from 'assets/images/icons/Chat/Unselected.svg';
import broadcastIcon from 'assets/images/icons/Broadcast/Unselected.svg';
import flowIcon from 'assets/images/icons/Flow/Unselected.svg';
import searchIcon from 'assets/images/icons/Search/Unselected.svg';
import goalsIcon from 'assets/images/icons/Goals/Unselected.svg';
import analyticsIcon from 'assets/images/icons/Analytics/Unselected.svg';
import speedSendIcon from 'assets/images/icons/SpeedSend/Unselected.svg';
import templateIcon from 'assets/images/icons/Template/Unselected.svg';
import chatSelectedIcon from 'assets/images/icons/Chat/Selected.svg';
import broadcastSelectedIcon from 'assets/images/icons/Broadcast/Selected.svg';
import flowSelectedIcon from 'assets/images/icons/Flow/Selected.svg';
import searchSelectedIcon from 'assets/images/icons/Search/Selected.svg';
import analyticsSelectedIcon from 'assets/images/icons/Analytics/Selected.svg';
import interactiveMessageIcon from 'assets/images/icons/InteractiveMessage/Unselected.svg';
import interactiveMessageSelectedIcon from 'assets/images/icons/InteractiveMessage/Selected.svg';
import speedSendSelectedIcon from 'assets/images/icons/SpeedSend/Selected.svg';
import templateSelectedIcon from 'assets/images/icons/Template/Selected.svg';
import triggerSelectedIcon from 'assets/images/icons/Trigger/Selected.svg';
import triggerIcon from 'assets/images/icons/Trigger/Unselected.svg';
import notificationIcon from 'assets/images/icons/Notification/Unselected.svg';
import notificationSelectedIcon from 'assets/images/icons/Notification/Selected.svg';
import sheetsIcon from 'assets/images/icons/Sheets/Light.svg';
import contactVariableIcon from 'assets/images/icons/ContactVariable.svg';
import webhookLogsIcon from 'assets/images/icons/Webhook/WebhookLight.svg';
import supportAgentIcon from 'assets/images/icons/Ticket/Ticket.svg';
import helpIcon from 'assets/images/icons/Help.svg';
import styles from './ListIcon.module.css';

export interface ListIconProps {
  icon: string;
  count?: number;
  showBadge?: boolean;
}

export const ListIcon = ({ icon, count, showBadge }: ListIconProps) => {
  const location = useLocation();
  const stringsToIcons: { [iconName: string]: string } = {
    chat: chatIcon,
    broadcast: broadcastIcon,
    flow: flowIcon,
    search: searchIcon,
    goal: goalsIcon,
    analytics: analyticsIcon,
    'speed-send': speedSendIcon,
    template: templateIcon,
    trigger: triggerIcon,
    notification: notificationIcon,
    'interactive-message': interactiveMessageIcon,
    help: helpIcon,
    sheets: sheetsIcon,
    tickets: supportAgentIcon,
    webhook: webhookLogsIcon,
    fields: contactVariableIcon,
  };

  const stringsToSelectedIcons: { [iconName: string]: string } = {
    chat: chatSelectedIcon,
    broadcast: broadcastSelectedIcon,
    flow: flowSelectedIcon,
    search: searchSelectedIcon,
    analytics: analyticsSelectedIcon,
    'speed-send': speedSendSelectedIcon,
    template: templateSelectedIcon,
    trigger: triggerSelectedIcon,
    notification: notificationSelectedIcon,
    'interactive-message': interactiveMessageSelectedIcon,
    sheets: sheetsIcon,
    tickets: supportAgentIcon,
    webhook: webhookLogsIcon,
    fields: contactVariableIcon,
  };

  const iconImage = (
    <img
      src={
        location.pathname.startsWith(`/${icon}`)
          ? stringsToSelectedIcons[icon]
          : stringsToIcons[icon]
      }
      alt={'Selected '.concat(icon)}
      data-testid="listIcon"
      style={{ marginRight: 0 }}
    />
  );

  return (
    <div>
      {showBadge && count ? (
        <Badge badgeContent={count} color="warning" classes={{ badge: styles.Badge }}>
          {iconImage}
        </Badge>
      ) : (
        iconImage
      )}
    </div>
  );
};

export default ListIcon;
