import React from "react";

type Props = {
  data: {
    id: string;
    firstNameLastName: string;
    jobTitle: string;
    emailAddress: string;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
};

function PersonInfo(props: Props) {
  const { data, isSelected, onSelect } = props;
  const { id, firstNameLastName, jobTitle, emailAddress } = data;
  //TODO: add default photo for each contact
  return (
    <div
      onClick={() => onSelect(id)}
      style={{
        display: "flex",
        height: "100px",
        justifyContent: "center",
        flexDirection: "column",
        padding: "32px",
        boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.15)",
        margin: "10px 0",
        background: isSelected ? "#e3f2fd" : "#fff",
        cursor: "pointer",
      }}
      className="person-info"
    >
      <span>ID: {id} </span>
      <div className="firstNameLastName">{firstNameLastName}</div>
      <div className="jobTitle">{jobTitle}</div>
      <div className="emailAddress">{emailAddress}</div>
    </div>
  );
}

export default PersonInfo;
