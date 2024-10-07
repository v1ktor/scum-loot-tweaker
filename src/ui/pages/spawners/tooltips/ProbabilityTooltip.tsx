import { IconInfo } from "../../../components/icon-info/IconInfo.tsx";
import { Tooltip } from "react-tooltip";
import { ProbabilityTooltipProps } from "./Tooltip.types.ts";

export function ProbabilityTooltip(props: ProbabilityTooltipProps) {
  const { probabilityValue } = props;

  return (
    <>
      <IconInfo dataTooltipId={'probability-tooltip'}/>
      <Tooltip id="probability-tooltip" className="tooltip" border="1px solid #343a40">
        <ul>
          <li>
            "Probability": {probabilityValue || '15'}, indicates
            a {probabilityValue || '15'}% drop rate
            for the item,
            which should be adjusted by
            multiplying with the settings in your ServerSettings.ini and zone modifiers.
          </li>
          <li>If you desire a 100% drop chance, you can either remove the probability value or set it to
            0.
          </li>
          <li>
            If you set the probability to 100, the final drop chance won't be 100% because it still gets
            adjusted by the ServerSettings.ini and zone modifiers.
          </li>
        </ul>
      </Tooltip>
    </>
  )
}
