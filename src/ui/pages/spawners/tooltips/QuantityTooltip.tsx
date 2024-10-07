import { IconInfo } from "../../../components/icon-info/IconInfo.tsx";
import { Tooltip } from "react-tooltip";

export function QuantityTooltip() {
  return (
    <>
      <IconInfo dataTooltipId={'quantity-tooltip'}/>
      <Tooltip id="quantity-tooltip" className="tooltip" border="1px solid #343a40">
        <p>
          If you set "QuantityMin" to 4 and "QuantityMax" to 9, the spawner will pick a number between 4
          and 9 to determine how many items are dropped.
        </p>
      </Tooltip>
    </>
  )
}
