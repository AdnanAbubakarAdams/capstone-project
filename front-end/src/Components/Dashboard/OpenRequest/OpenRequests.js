//Dependencies
import React from "react";

//Components
import RequestCard from "../RequestCard/RequestCard";
import NoRequests from "../NoRequests/NoRequests";

//CSS
import "./OpenRequests.css";

const OpenRequests = ({ 
  openRequests, 
  date, 
  requestSearch,
  applicationUser,
  setLocation,
  setDashboardFilter
}) => {
  const search = requestSearch.toLowerCase()

  const dateConverter = (specifiedDate = '') => {

    const fullYear = specifiedDate?.getFullYear();
    const month = specifiedDate?.getMonth() + 1;
    const paddedMonth = month.toString().padStart(2,'0');
    const currentDate = specifiedDate?.getDate()
    const paddedDate = currentDate.toString().padStart(2,'0')

    const formattedDate = `${fullYear}-${paddedMonth}-${paddedDate}`
    
    return formattedDate
  };
 

  let currentDate = dateConverter(new Date());
  let selectedCalendarDate = dateConverter(date) 

  const requestFilter = openRequests
    .filter((request) =>
      selectedCalendarDate === currentDate &&
      request.title.toLowerCase().includes(search)
        ? request.req_date >= currentDate &&
          request.title.toLowerCase().includes(search)
        : selectedCalendarDate === request.req_date &&
          request.title.toLowerCase().includes(search)
    )
    .map((request, index) => {
      if (index < 4) {
     
        return (
          <RequestCard
            key={request.id}
            request={request}
            applicationUser={applicationUser}
            setDashboardFilter={setDashboardFilter}
          />
        );
      }
    });

  return (

    <>
      <h3 className="head">Open Requests</h3>
      <div
        className="openRequestPage__filter"
        onClick={() => setLocation("openRequests")}
      >
        {requestFilter.length > 0 ? requestFilter : <NoRequests />}
      </div>
    </>

  );
};
export default OpenRequests;



