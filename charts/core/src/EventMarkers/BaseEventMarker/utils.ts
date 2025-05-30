import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  fontFamilies,
  fontWeights,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

import { SeriesOption } from '../../Chart';

import { EventLevel, GetMarkConfigProps } from './BaseEventMarker.types';

const dataUriMap: Record<Theme, Record<EventLevel, string>> = {
  [Theme.Dark]: {
    info: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATESURBVHgBxVddTJtVGH7PV+haWkcn8S9ZoRAQsi1alswLooGpF85E0yVbpt6MxVsNeKXeKCNeaGIicyYmJmblQiOBxGaLk4upEJd5wQU1CuEvUMYMm5PRzZb+QHt2nkO/9mu/09F2S/YkTb/vPd857znvz/O+h1GJ6PL5XCmy+cRjJ+Pcy0nzEHHX9igLM0qHOLEgMRq3UDwwFgiES1mX7fRBl+8NTzrNezjTunMKS4Lfwuj0WOCHEFWyAZw4nbZ/zBnv1WW3I1FaC9+hcCRCieQmbaVSUl5lsZDDbiOn3U51rt1U63TkFHA2oGmx08UswtTKxak5/caJPHi/cWudrq7+S/FkkkqBzWql+qcepyce3aOLQsIah1XWMG2gw/eWt4qnf4TyuDjl9OIyRWMxqgTYyDMtTbTLWi03kWLa0SuB74NFN2A8+Y21dVr8ZzVr5koB9zzdsJfqanfLTRRaguWUC59z2ySUr92+I0/+IIFNZFwiNhFv12OiSv8gE3DS7HPL14ou5HTU0JHODmr2uOnJx+qkbCG0QgvLKzQ5NUfXb/6nnLd4bZVcTifc4YEuIXoPcmkBmD7FaQnPE1OzRYPt1PHX6NirL5OzpkY5HtnYoJGLl+jc8AXlODLlYFuLfBauaIQrLHhxtx74Qvx5Ee34qU799Scf0osdz5G1ujpP4S2RlhgHMObd10ovHGqnX/+YoOTmZt46m1tbZNtllelKnLPl2alR1uXrdqV4fP1ep//2s4+kyY24fnONTrzzgXz+6dwZk1Xglrff7zethcw4tL+VwJ4WFmvUUhQHvUqSUSmH2QuVS6vU2HOWiJrTFHNOHX/dJIcO6AKrgtqriFMnBhD5hUCQwecqwOxDX30q/u1FY+LYkZdoWMREJLqRJ4euDFt2aoyYV55iw3yKdmEq1eIwv3/kAo2OX6HLE0EqBj1jChH+Pyr/BU0L0svQbTQWN33Y3FCvXDg4PUu/T0xKP29/51a6SY4p5ImMq6Fb0yucivGaPXuVi74iTvXuyRPZd2RDMehcYUROF3dp9JChIR3wAM4uBHx9v1gImVk1p4uFRRBSCI/IT/PkFbpfzIeummR6CkO3JkLxT7zUPuIwffiziHKVfyEzbg51QGUtpF9wes4kByUDovYENRGJY3jJlEvTAiMXfzHJkXpnB4ey72f9QzIzCjEs5qqKk0HXeIaKE0uIyHKoeCfsTMUoSPE92ljAH2aMBiFAG6VCT//nZcUDvsUcFbI6GPnRE8hwbGw7MCNc0YsqBZpE1TICVe38pXE5q6XRnVcRjUBsfBcYpf4vvzFVQgCnR2MCiHJ8NDTzdzjbET3ve3NA9Ps9cMHkzELRVgzEgpLb4smxHwJwXpwa1FzI+zqQegfbmkVDYhWVmJ+5fH6od9sQGSAW0jwuWzL0BPfqiirBvqYGQ1+Ya8myTIhYEKRwGLmJ3g0TVORULrabUndBU5q7I+zQlifpr/mlku8DhXCImNrfVC/NTqW05Toe6sUkt4lu1xYl+hCYukxezUSWoHSjfzBezdDrocmAqY1XMwRclZboK+tqlr8R0TET9YnifZJKhrgts/Sg4PmBii+n5o1kr+ddoot6lnO4x3A9ZySu5xz+Let6fhfk1VEC+YDPBgAAAABJRU5ErkJggg==',
    warning:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAROSURBVHgBxVfNTxtHFH8zXrANBDYF8dFQsrghImkFTk9VVQmnl17dW9pL+Q/snnoEbr2VHnsCLlV6qtVbL60jVVVPDfQzaivikEQoUQgLMfgDeyfzG3vXi+NlJyRSftLC7Hh23se89+b3GGkilU6bdYql5XCOCZEUxC0iYTZ+ZTYjpyCIrROjGxEq5/K5nK2zLwtbkEpfsxxHZATj8y2BWliNMFrK564X6DQKwGLHiS8IJrLu3F7xgHbsfbKLRapUj6hWr6t5IxKh3niM+uJxGjT7aaCvtyVAsGXOS0tBHmGdhUurBf0kiCy8P3i8S1vbD6lcrZIOYt3dNDE2TCOvnXWnCtIbVzt54xkF3kt/kjSE8x2El6WVf2/eoYNSiU4DKDIzlaBod5dSos74R7/kvlkPVMBv+YOdXdq8v+25+bTA8Vw8P06DA/1KiXZPsJZweeYidhPCd/b2leUvE1CieSRSifIVNya4u0AFXNPt/965p7Xpl5cnaGV2Umvt5r1tFbgSFmS58xH8Ua4nuo7xzVv/U7VWC91wfnyIvpgep2R/D+0dOfSrXTxxvSOEyp6xoUH4/d3EpbfXCrf+tJUH6oKURoh2nUg3uwxauPi6946x2RUJ/e6gVFYylEJOI70jqfS8KaimrP9nc0sr6D5/c5TSo16KUSzCqSKjN7/zJPRbKHFueEh6gU8nLl34mtepjPKqioyO9VZPlLKJESqUqjT54+/qsWt1ylgjWl6ADMhCVUVp5yRoDj8g8nWwMCXdbRhSgYr3rO8dKuELU+e09vDJmuOMWBKj4mF4sYH1CL4gZCdH1Jow2E8O1H9ZppPcLbc4mzDA+jCszISnZaV51JDN3RsuLPiQbidZ7yI1eEY+/SeuackSJidN6BYcQMdTLjjIBAao2UGA5fCAH6YRvD7MCy1ZzJZBSAUMcXMFwV90XEAheAUPBLZjZdYK3K+vJ94QL2VzGYobeBk409txMay34p0jG8UoyFJ8k7VGO/4G8gJIsrOOLMjjpXldHkN7yfUDhejsD7/JQrShClEnBJVon6wbPEKxHM4CNKr9GDLWcKD1/hiwjzpfXhCenTzuBchwKRvIK8/nVm3GaA0ToFF+JAc6H4u7+e0PZmj3wyuBSgJzbfHhyWC0Ck5gYCzr8bJ0YgaE4f7DR15R+uyvLdrYP6QXwerdR94Y1rs8UfpvqaFHE++nP16WfD+DywKc4EWpWDuQeu9MX5D8sJuEEF/9/P236jr2CpFB0UWkBbRMjI/RywYoWbQRYwWDVxbdeU8BxIIsClehBNx0OXH+xOKkiwYpfaONlLZ6hBBaXqU//rut3Q+0o1c2Km8lJjzLQ2m5i1famLSUmDdrVFlEYLpzqjWTZAJZAv7gb81i0UZ+w9X+1gwBhzN/rtbsuCLXLClmUV7en5I2ZLfMnDVZ55dP3Zw+q4jXnqcki5qVLNs61p4zku25wPk+V3v+FLqi4Iq8Yg11AAAAAElFTkSuQmCC',
  },
  [Theme.Light]: {
    info: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAS6SURBVHgBxVfPUxxFFH49ULC7KJDgmgISloREkpAgYETzgwpzUOPFgvJqlR5zMnAxpbEEqmJpLrr+B8nBo8HyoClz2GDEqKWAWImibgIRSGkIAUp2lxQ77ft6d4fdmR6yS1KV7zIz3T39Xr/3+nvvCcoTkdHRyqJErIvIOCqFbCFL1pMQlWpSygUyxKSQYozIGkr6Ap+bra0L+ewr7iv4ypX6IiFOSCv5hi0wr43F2STRgHnw4OT667wE48Qr8T4pqSczVlleTlWbN1NFeQX5SkqouLhYja+urtJ/sRgtx5bpzvw8LSwtrQmQFE76/QNeFtEqgFMbJCP8Wo/vLcEghbZuI19pKeWDxMoKTU3/Tf/cvp0ZmrRImDpruBSIDA+3GIYYhHAI3Nu4mx4LBGgjgCLj166qp1KiqLjbbG8f81Qg++Rbgk9SQyhkm3mjgHsmrkeVa0hjCVsB+NxIxEchHH5ueqqRHiYmolF2yb8pJXz+1kxM2MdTAZc2e+OOBs+NYvE4Xf7hJ/bxLZpLnYrqams5Rqppz64d9AQrrwOsubi0CHfUF8XjfTzUi3FlgbTpb+C9vbXNM9gGv7pIFyKXWYmEdj7g99Exs4O6X35BO4+bMjL+i3pnV2yHKwx1eiJopKJdJxynPvVhmM5/eTFHeFnAR8GqTVnrEmrNqTNh9Y8TCGbIAAwp1fUWkUik0vCV3l3v9BB+c2Y2ZwyCP+p/W70ff+s9WnZYpW5rDb1/sse1F27Ej6MjsP2CVerfbhT5SrowAZLRCT/PZncKB5ZjawL9fr9r/ub0LA2yNZyAjAqWRZIUtReD2/FVpQkeBNnX7HMdYOLevg/U0ysmLlz6ll4yj3Bs5CqIQF0EWwrjKLuCEwvBn2WuDX7787rLtADMj0DreO4APdO8j7wA5b75/mfXeMXj5eopLauFLcBZjR2iY7up6Vntxrt3NrDgJr56Nel1M+ymW9q1OvfZrjYE3750htMx3tSMXgHwwKeffWF/BwJ+8sLcnXnXmC2L48CgRwxDFROU4mwngh6sVgjq0m7Khi2LryJbQEziPXHvnmthqLaaHhQhjQJgRAVLMhMKUtwInnai4/kDVMb06gQYMPtkodqaHEbMANdvzy53XkHhAgjDGDMEyUv4yCQW5wYvdna4xtv276PXXn3F/sY7boYTxzqP8J13K5ZOzZSUNJSi4tKSG7gNXlT87pmPVfYrBDD96fWomMFpeZNhmiaC8BwGUEbp8M6bx1W6LUQ4/tEhI0MIcRY1gbqGljDCeKKGswMkC3DF6ZO9iv3gfy9gDmtw8oAmdnD6TJ3I5h9QimQmh74bDrNaJ+CCtv3NnqXY3PxdpuiocgkYEMB1DW2rZmp+VisYwNUb+XVcKWFJ+sQ8dKgnR4F0WlYlGXJ2Y8NOepi4+sfEWl2YVZLZTIhYQMGIBTATftCRU6FQRWn0r9yiNKtHuG9Z3ry3Ke9+wAnE07WJ39fKckt2m4cPe5flthKPsjGxlUjxQz8CMzOWac1QOyB9Z7dmoHKwqbM1Q8BxydRfUGuWo0jKGv38+jrli1S3fM6SIrzh5tSlCDculEh0sTKdnMefVoVMdnvOSY3JZSzJ7TkV0J7/D7iAJAXxV4qDAAAAAElFTkSuQmCC',
    warning:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQQSURBVHgBxVdLT1NBFD4zrbRFKURFI2poNKFGo4ILEzVR79rE6C/Qf4AL98DaDe50pwvdSjSuKyboRgU1EGssKdGQ8JCUAn0Qesf5pp2hLfe2wyPxS5o7M3d6z3POfIeRJRLj4x2BQu4OEb8hmOglV8SIsQ71UogMcZZmgk0QuaOlcOuI09eXsfkuayr448dYgLF+4ZbuG4FWH2bPSkRDzpUr6cb7/ATD4mJ+QAh6oNc6olE6dPAgtUfbKdzSQsFgUK1vbGzQai5Ha7k1+ru0RJlsdlOAoOFSJDLk5xFPBWA1J5GQwxjmRzs7qfvESQqHQmSDQrFIM39+09zCgl5Ku8QcL29sUSAxNtbLOXsF4RB4Nn6GDrS20k4ARb5NTaqnUiIQvOtcvjzhq0C15Uc7j9Dp7m7j5p0C4UlOp1RoyMMTRgHEnBfy4xCOOJ/ridNeIplKyZDMl5UIR/p0TnC9AQlHFbfHT522+ujio0c0PzBgtRferORQLJDPmz8pBeB6ne0Xzp6zcnv29WvKvHxZfr540XQ/vol8AgSjB5BpFAgQKY2Q7TaZ7q6s0NLTp2aOMdaaAckMGUqwEMpgnkgkOgSJ+5jgqNkAlm/MztYoZOOFGhmc7qm8C4Rb7mCOImNjPQRDWLCri2Jv36ofb2tTStl4ATLapSwSpEo7R23HC2S+DZaePFGC9kkFgpVfKB7fEpZGOKxlMX5DhkJeLBL7W/c3/SOsz7554/senqkOjR/a26LqKVy3V3pA3mpEVtUO1jfDnMWxNKHmTBa+yg3X7OgVk8mG1mvkP31Sv0YwsmQecLKEbcEBbHMB4IpMULlm+wHFBh6oRqOMb+YFI4tRRvqCpeWwt7C+Tgd8wuBlERRSXpEl1EsYcgFH1AvgDmUrRFrmAH3FeDm77LkZ1vtl9moiQbnPnz3f6XrhBRAXgHE+wRmJd5gslq/LGjQ62zj/p96/N4XIC34lunI1U0nQKC8V1keQB8uSRlWIg0F9ya1XTsNPAa8SDRmGsoXDI9xxHCThc8xBo6pRn3j1H0/fukXT1683LD75uhBpGYyxZ+AEKutcxoflcegHhzt+rMsUpc6HDynU00O7QfT2bTOG9ZonSvcPKUX0y9EPY8NSrX5UqUvnL+yaitUDR+/L929KCVfQY+fq1fJ1rDe4xfVB+UhjQ2omTXsN8EJNTikSGdTrRgHkAggjNsBNkz+TDYuTLRQpTf2qJaVVPUJTWg6KZtsP1AMFZyr5Y5OWu+Kuc+2aPy03SvzPxsQoIakaD7UMIjH1mm7NwB1wUqpbM5RyVNP61gwJh5hvqzWrUaTsjUE5vEe2KHfLz13BhnfcnG5RRBJIKhQkhxM35T1+URGZ6vZcXmqyuEyUZHtO22jP/wHqFDCi+Qr9/wAAAABJRU5ErkJggg==',
  },
};

/**
 * PNG symbols gotten from designs. Custom Echarts symbols have to be image
 * URLs, data URIs, or vector paths.
 */
const generateSymbolDataUri = (level: EventLevel, theme: Theme) => {
  return `image://${dataUriMap[theme][level]}`;
};

export function getMarkConfig({
  name,
  theme,
  label,
  message,
  level,
  position,
  type,
}: GetMarkConfigProps): SeriesOption {
  const labelConfig = {
    borderRadius: borderRadius[200],
    backgroundColor:
      color[theme].background[Variant.InversePrimary][InteractionState.Default],
    color: color[theme].text[Variant.InversePrimary][InteractionState.Default],
    distance: type === 'line' ? [0, -spacing[1400]] : undefined,
    fontFamily: fontFamilies.default,
    fontSize: 12,
    fontWeight: fontWeights.regular,
    formatter: label
      ? `{label|${label}}\n{message|${message}}`
      : `{message|${message}}`,
    lineHeight: 15,
    padding: spacing[150],
    position: type === 'line' ? 'start' : 'bottom',
    rich: {
      label: {
        color:
          color[theme].text[Variant.InverseSecondary][InteractionState.Default],
        align: 'left',
      },
      message: {
        align: 'left',
      },
    },
    show: false, // Needed so it only shows on hover (aka emphasis)
  };

  const commonConfig = {
    animation: false,
    name,
    type: 'line', // Requires a type even though it's not an actual series
  };

  if (type === 'line') {
    return {
      ...commonConfig,
      markLine: {
        label: labelConfig,
        data: [
          {
            name: name,
            xAxis: position as string | number,
          },
        ],
        emphasis: {
          focus: 'series', // Allows other markers and series to be de-emphasized on this marker over
          label: {
            show: true,
          },
          lineStyle: {
            width: 2,
          },
        },
        lineStyle: {
          color:
            level === EventLevel.Warning
              ? color[theme].icon[Variant.Error][InteractionState.Default]
              : color[theme].icon[Variant.Secondary][InteractionState.Default],
          type: 'solid',
          width: 1,
        },
        symbol: [generateSymbolDataUri(level, theme), 'none'],
        symbolSize: [16, 16],
        symbolRotate: 360, // Icon shows upside down without this
      },
    } as SeriesOption;
  } else {
    return {
      ...commonConfig,
      markPoint: {
        label: labelConfig,
        data: [
          {
            name: name,
            coord: position as [string | number, string | number],
          },
        ],
        emphasis: {
          focus: 'series', // Allows other markers and series to be de-emphasized on this marker over
          label: {
            show: true,
          },
        },
        symbolSize: [16, 16],
        symbol: generateSymbolDataUri(level, theme),
      },
    } as SeriesOption;
  }
}
