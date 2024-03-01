import { IconInfo } from "../../../components/icon-info/IconInfo.tsx";
import { Tooltip } from "react-tooltip";

export function InitialDamageTooltip() {
  return (
    <>
      <IconInfo dataTooltipId={'initial-damage-tooltip'}/>
      <Tooltip id="initial-damage-tooltip" className="tooltip" border="1px solid #343a40">
        <p>
          "InitialDamage": 5 means that although the item spawns with 100% durability, the spawner
          preset
          will apply 5% durability damage to it. Therefore, you will receive the item at 95% durability.
        </p>
      </Tooltip>
    </>
  )
}
