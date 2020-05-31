import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Plus } from "../../components/plus.svg";
import { useQuery } from "react-apollo";
import styled from "styled-components";
import { GET_NOTES } from "../../queries";

const Header = styled.div`
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
`;

const Button = styled.div`
  margin-left: 10px;
  transform: scale(0.8);
  background-color: #eee;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
`;

const Subtitle = styled.h2`
  color: #a2a19e;
  font-weight: 400;
`;

const Notes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Note = styled.div`
  padding: 10px;
  padding-left: 5px;
  transition: background-color 0.1s linear;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 10px;
  &:hover {
    background-color: #eeeeee;
  }
`;

const NoteTitle = styled.span`
  padding-bottom: 5px;
  font-weight: 600;
  font-size: 20px;
`;

export default () => {
  const { loading, error, data } = useQuery(GET_NOTES);

  if (loading) {
    return <h1>Loading ...</h1>;
  }
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Header>
        <Title>
          Nomad Notes
          <Link to={"/add"}>
            <Button>
              <Plus />
            </Button>
          </Link>
        </Title>
        <Subtitle>Taking notes while we learn.</Subtitle>
      </Header>
      <Notes>
        {data.notes &&
          data.notes.map((note, index) => (
            <Link to={`/note/${note.id}`} key={index}>
              <Note>
                <NoteTitle>{note.title}</NoteTitle>
              </Note>
            </Link>
          ))}
      </Notes>
    </>
  );
};
