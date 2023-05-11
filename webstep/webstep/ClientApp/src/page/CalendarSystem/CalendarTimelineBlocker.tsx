import React from "react";
import { constants } from "../../logic/constants";

interface CalendarTimelineGridProps {}

export const CalendarTimelineBlocker = () => {
  // Simple solution, assumes you want to view rougly 2 years worth of time
  let weeks = constants.weeksToShow;
  let columnWidth = constants.calendarColumnWidth;
  let gridStyle = {
    position: "relative" as "relative",
    display: "grid",
    gridTemplateColumns: "repeat(" + weeks + ", " + columnWidth + "px)",
    gridAutoRows: "50px",
    backgroundColor: "#637081",
    height: "40px",
  };
  return (
    <div style={{ display: "flex" }}>
      <div style={gridStyle}></div>
    </div>
  );
};
