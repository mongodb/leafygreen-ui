import { borderRadius, spacing } from '@leafygreen-ui/tokens';
import { TooltipComponentFormatterCallbackParams } from 'echarts';
import { update } from 'lodash';
import React, { useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import { useChartContext } from '../ChartContext';

/**
 * Styles can't rely on emotion because this component is rendered in a different context
 * that doesn't have access to the emotion cache. So we need to use inline styles.
 */
const toolTipStyles = {
  color: 'white',
  padding: '12px',
  borderRadius: '5px',
  fontFamily: 'Euclid Circular A Light, sans-serif',
  fontWeight: 'lighter',
};

const toolTipCaptionStyles = {
  textAlign: 'left',
  display: 'block',
  marginBottom: '8px',
};

const toolTipGridStyles = {
  display: 'grid',
  gridTemplateColumns: 'auto auto',
  rowGap: '8px',
  columnGap: '24px',
};

const toolTipSeriesStyles = {
  textAlign: 'left',
};

const toolTipValueStyles = {
  textAlign: 'right',
  fontFamily: 'Euclid Circular A, sans-serif',
  fontWeight: 'bold',
};

const iconStyles = {
  display: 'inline-block',
  marginRight: '5px',
  borderRadius: '50%',
  width: '10px',
  height: '10px',
};

function TooltipComponent(params: TooltipComponentFormatterCallbackParams) {
  return null;
  // const data = Array.isArray(params) ? params[0].data : params.data;

  // if (data) {
  //   const date = new Date(data[0]);
  //   const formattedDate = `${date.getFullYear()}/${String(
  //     date.getMonth() + 1,
  //   ).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${String(
  //     date.getHours(),
  //   ).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(
  //     date.getSeconds(),
  //   ).padStart(2, '0')}`;
  // }

  // if (!Array.isArray(params)) {
  //   params = [params];
  // }

  // params.sort((a, b) => b.data[1] - a.data[1]);

  // return (
  //   <div style={toolTipStyles}>
  //     <div style={toolTipCaptionStyles}>{formattedDate}</div>
  //     <div style={toolTipGridStyles}>
  //       {params.map(({ seriesName, data, color }) => (
  //         <React.Fragment key={seriesName}>
  //           <div style={{ ...toolTipSeriesStyles }}>
  //             <span style={{ ...iconStyles, backgroundColor: color }}></span>
  //             {seriesName}
  //           </div>
  //           <div style={toolTipValueStyles}>{data[1].toFixed(0) + ' GB'}</div>
  //         </React.Fragment>
  //       ))}
  //     </div>
  //   </div>
  // );
}

export function Tooltip({
  sortDirection = 'desc',
  sortValue = 'value',
}: {
  sortDirection?: 'asc' | 'desc';
  sortValue?: 'name' | 'value';
}) {
  const { updateChartOptions } = useChartContext();

  useEffect(() => {
    let sortOrder: 'valueDesc' | 'valueAsc' | 'seriesDesc' | 'seriesAsc' =
      'valueDesc';

    if (sortDirection === 'asc') {
      if (sortValue === 'name') {
        sortOrder = 'seriesAsc';
      }
      sortOrder = 'valueAsc';
    } else {
      if (sortValue === 'name') {
        sortOrder = 'seriesDesc';
      }
    }

    updateChartOptions({
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#001E2B',
        borderRadius: borderRadius[200],
        padding: spacing[150],
        enterable: true,
        order: sortOrder,
        // formatter: (params: TooltipComponentFormatterCallbackParams) =>
        //   renderToString(<TooltipComponent {...params} />),
      },
    });
  }, []);
  return null;
}
