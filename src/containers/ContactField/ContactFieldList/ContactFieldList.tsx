import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, Button } from '@mui/material';
import { useMutation } from '@apollo/client';

import { List } from 'containers/List/List';
import { InlineInput } from 'components/UI/Form/InlineInput/InlineInput';
import { COUNT_CONTACT_FIELDS, GET_ALL_CONTACT_FIELDS } from 'graphql/queries/ContactFields';
import { DELETE_CONTACT_FIELDS, UPDATE_CONTACT_FIELDS } from 'graphql/mutations/ContactFields';
import { ReactComponent as ContactVariableIcon } from 'assets/images/icons/ContactVariableDark.svg';
import { ReactComponent as EditIcon } from 'assets/images/icons/GreenEdit.svg';
import { ContactField } from '../ContactField';
import styles from './ContactFieldList.module.css';
import { setNotification } from 'common/notification';

interface EditItemShape {
  id: any;
  column: string;
}

const ContactFieldList = () => {
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState(false);
  const [itemToBeEdited, setItemToBeEdited] = useState<EditItemShape | any>(null);
  const [error, setError] = useState<any>(null);

  let dialog;

  if (openDialog) {
    dialog = (
      <Dialog
        open
        classes={{
          paper: styles.Dialogbox,
        }}
      >
        <DialogContent classes={{ root: styles.DialogContent }}>
          <ContactField setOpenDialog={setOpenDialog} />
        </DialogContent>
      </Dialog>
    );
  }

  const handleCloseModal = () => {
    setError(null);
    setItemToBeEdited(null);
  };

  const [updateContactField] = useMutation(UPDATE_CONTACT_FIELDS, {
    onCompleted: (response: any) => {
      const { errors: _errors } = response.updateContactsField;
      if (_errors?.length > 0) {
        const { key, message } = _errors[0];
        setError(`${key} ${message}`);
      } else {
        // Cleanup
        handleCloseModal();
      }
    },
    onError: () => {
      setNotification('Sorry! An error occured while updating the contact field', 'warning');
    },
  });

  const queries = {
    countQuery: COUNT_CONTACT_FIELDS,
    filterItemsQuery: GET_ALL_CONTACT_FIELDS,
    deleteItemQuery: DELETE_CONTACT_FIELDS,
  };

  const handleEditCallback = (row: any, updatedVal: string, column: string) => {
    if (!updatedVal) {
      setError('Required');
      return;
    }

    const payload = { [column]: updatedVal };

    const variables = {
      id: row.id,
      input: payload,
    };

    updateContactField({ variables });
  };

  const columnNames = [
    { name: 'name', label: t('Variable name') },
    { name: 'name', label: t('Input name') },
    { label: t('Shortcode') },
    { label: t('Actions') },
  ];

  const getName = (label: string) => (
    <div className={styles.LabelContainer}>
      <p className={styles.LabelText}>{label}</p>
    </div>
  );

  const getOtherColumn = (row: any, column: string) => {
    const { id } = row;
    const label: any = row[column];
    const showInline = itemToBeEdited?.id === id && itemToBeEdited?.column === column;
    const labelText = column === 'name' ? 'Input Name' : 'Shortcode';

    return (
      <div className={styles.OtherColumnContainer}>
        <p className={styles.OtherColumnText}>
          {label}
          <span>
            <Button onClick={() => setItemToBeEdited({ id, column })}>
              <EditIcon data-testid="edit-icon" />
            </Button>
          </span>
        </p>
        {showInline ? (
          <div className={styles.OtherColumnEditContainer}>
            <InlineInput
              key={itemToBeEdited}
              value={label}
              label={labelText}
              error={error}
              closeModal={() => handleCloseModal()}
              callback={(updatedColumnValue: string) =>
                handleEditCallback(row, updatedColumnValue, column)
              }
            />
          </div>
        ) : null}
      </div>
    );
  };

  const getColumns = (row: any) => ({
    variableName: getName(row.variable),
    name: getOtherColumn(row, 'name'),
    shortcode: getOtherColumn(row, 'shortcode'),
  });

  const columnAttributes = {
    columnNames,
    columns: getColumns,
    columnStyles: [styles.Label, styles.OtherColumn, styles.OtherColumn, styles.Actions],
  };

  const listIcon = <ContactVariableIcon className={styles.ContactFieldIcon} color="primary.dark" />;
  const dialogMessage = t('This action cannot be undone.');
  const dialogTitle = t('Are you sure you want to delete this contact field record?');

  return (
    <div className={styles.Container}>
      {dialog}
      <List
        title={t('Contact Variables')}
        listItem="contactsFields"
        listItemName="contactField"
        pageLink="contact-fields"
        listIcon={listIcon}
        button={{
          show: true,
          label: t('Add contact fields'),
          action: () => {
            setOpenDialog(true);
          },
        }}
        searchParameter={['name']}
        dialogMessage={dialogMessage}
        dialogTitle={dialogTitle}
        editSupport={false}
        backLinkButton={{ text: t('Back to flows'), link: '/flow' }}
        {...queries}
        {...columnAttributes}
      />
    </div>
  );
};

export default ContactFieldList;
