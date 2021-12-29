import PropTypes from 'prop-types';
import styled from 'styled-components';

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ContactInfo = styled.p`
  margin-right: 25px;
`;

const ContactName = styled.span`
  margin-right: 15px;
`;

const ContactNumber = styled.span`
  font-style: italic;
`;

const DeleteButton = styled.button`
  padding: 2px 4px;
  width: 100px;

  cursor: pointer;
  color: black;
  border: solid 1px black;
  background-color: white;
  border-radius: 4px;

  font-weight: 600;
  font-size: 14px;
  line-height: 1.475;
  align-items: center;
  text-align: center;

  :hover {
    color: white;
    background-color: red;
  }
`;

const ContactListItem = ({ contact, onDeleteContact }) => (
    <ItemWrapper>
        <ContactInfo>
            <ContactName>{contact.name}</ContactName>
            <ContactNumber>{contact.number}</ContactNumber>
        </ContactInfo>
        <DeleteButton onClick={() => onDeleteContact(contact.id)}>Delete</DeleteButton>
    </ItemWrapper>
)

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired
  }),
    onDeleteContact:PropTypes.func.isRequired
};

export default ContactListItem;