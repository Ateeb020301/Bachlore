import { useQuery } from "@apollo/client";
import { Calendar } from "../../CalendarSystem/Calendar";
import { GET_SELLER_NAMES } from "../../../api/prospects/queries";
import { GetSellerNamesPayload } from "../../../api/prospects/payloads";
import React from "react";
import { SellerSection } from "./SellerSection";
import { v4 as uuidv4 } from "uuid";
import { Prospect } from "../../../logic/interfaces";

//GQL pagination skip const
const skipAmount = 0;
//GQL pagination take const
const takeAmount = 50;
export const ProspectsCalendarContainer = () => {
  const { loading, error, data } = useQuery<GetSellerNamesPayload>(
    GET_SELLER_NAMES,
    {
      variables: { skipAmount: skipAmount, takeAmount: takeAmount },
    }
  );
  let decodedId: string;
  return (
    <Calendar
      title={"Selgere"}
      render={(b: boolean) =>
        data?.sellers.items.map((seller) => {
          {
            decodedId = new TextDecoder().decode(
              Uint8Array.from(atob(seller.id), (c) => c.charCodeAt(0))
            );
          }
          return (
            <SellerSection
              id={parseInt(decodedId.replace(/[^0-9]/g, ""))}
              name={seller.fullName}
              showProspects={b}
              key={uuidv4()}
            />
          );
        })
      }
    ></Calendar>
  );
};
