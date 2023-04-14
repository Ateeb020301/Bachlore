import React, { useReducer, useState } from 'react';

export function getMonthName(month: number){
    const d = new Date();
    d.setMonth(month-1);
    const monthName = d.toLocaleString("en-us", {month: "long"});
    return monthName;
  }