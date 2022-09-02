import React from "react";

const ChartTitle = ({ info }) => {
  const { sourceInfo } = info[0];

  const agencyCode = sourceInfo.siteCode[0].agencyCode;
  const id = sourceInfo.siteCode[0].value;

  const { timeZoneInfo } = sourceInfo;
  let timeZone;
  if (timeZoneInfo.siteUsesDaylightSavingsTime) {
    timeZone = `All times UTC ${timeZoneInfo.daylightSavingsTimeZone.zoneOffset} (${timeZoneInfo.daylightSavingsTimeZone.zoneAbbreviation})`;
  } else {
    timeZone = `All times UTC ${timeZoneInfo.defaultTimeZone.zoneOffset} (${timeZoneInfo.defaultTimeZone.zoneAbbreviation})`;
  }

  return (
    <React.Fragment>
      <h5>{sourceInfo.siteName}</h5>
      <a
        href={`https://waterdata.usgs.gov/nwis/inventory/?site_no=${id}&agency_cd=${agencyCode}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {agencyCode} Site No. {id}
      </a>
      <div className="text-small">{timeZone}</div>
    </React.Fragment>
  );
};

export default ChartTitle;
