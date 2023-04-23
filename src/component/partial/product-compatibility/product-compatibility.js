import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import styled from "styled-components";
import React from "react";
const ScrollBar = styled.div`
  width: 100%;
  background-color: #f4f4f4;
  left: 0;
  top: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  overflow-y: scroll;
  height: 300px;
  &::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }
`;
const ProductCompatibility = ({ isClickProductCompatibility, ...props }) => {
  return (
    <>
      <>
        <h4>Compatibility</h4>
        {isClickProductCompatibility ? (
          <KeyboardArrowUpIcon />
        ) : (
          <ExpandMoreIcon />
        )}
      </>
      {isClickProductCompatibility ? (
        <List
          className="list-item"
          style={{
            padding: "0",
            width: "100%",
            position: "absolute",
            left: "0",
            top: "100%",
            overflow: "hidden",
            zIndex: "1",
          }}
        >
          <ScrollBar className="scroll-bar">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
              const labelId = `checkbox-list-label-${value}`;
              return (
                <ListItem
                  key={value}
                  disablePadding
                  style={{ width: "70%", backgroundColor: "#d7cece70" }}
                >
                  <ListItemButton role={undefined} dense>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={`Line item ${value + 1}`}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </ScrollBar>
        </List>
      ) : (
        ""
      )}
    </>
  );
};
export default ProductCompatibility;
