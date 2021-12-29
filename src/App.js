import './App.css';
import styled from 'styled-components';
import Phonebook from './Components/Phonebook/Phonebook';

const Container = styled.div`
  margin: 0 auto;
  padding: 0 15px;
  width: 430px;
`;

function App() {
    return (
      <Container>
        <Phonebook />
      </Container>
    );

}

export default App;
