import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContactListItem from '../ContactListItem/ContactListItem';

const List = styled.ul`
  width: 400px;
`;

const ContactList = ({ contacts, onDeleteContact }) => (
    <List>
        {contacts.map(contact => (
            <li key={contact.id}>
                <ContactListItem contact={contact} onDeleteContact={onDeleteContact}/>
            </li>
        ))}
    </List>
);

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
        })
    ),
    onDeleteContact:PropTypes.func.isRequired
};

export default ContactList;