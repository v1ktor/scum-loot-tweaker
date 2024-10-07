import { IconInfo } from "../../../components/icon-info/IconInfo.tsx";
import { Tooltip } from "react-tooltip";

export function InitialUsageTooltip() {
  return (
    <>
      <IconInfo dataTooltipId={'initial-usage-tooltip'}/>
      <Tooltip id="initial-usage-tooltip" className="tooltip" border="1px solid #343a40">
        <p>
          "InitialUsage": 5 means that 5% of the maximum uses of an item are removed. If the item has 20
          uses, it will remove 1 use.
        </p>
      </Tooltip>
    </>
  )
}
