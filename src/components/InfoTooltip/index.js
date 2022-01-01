import React from "react";
import { dateFormat } from '../../common/utils'

const style = {
  padding: 6,
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  color: 'purple'
};

const InfoTooltip = props => {
  const { active, payload } = props;
  if (active && payload && payload.length) {
    return (
      <div className="area-chart-tooltip" style={style}>
        <p>
        {`${dateFormat(payload[0].payload.date)}`}
        </p>
        <p>
        {`Price: $${payload[0].payload.price}`}
        </p>
      </div>
    );
  }

  return null;
};

export default InfoTooltip;