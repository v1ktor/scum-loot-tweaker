import { IconInfo } from "../../../components/icon-info/IconInfo.tsx";
import { Tooltip } from "react-tooltip";

export function RandomDamageTooltip() {
  return (
    <>
      <IconInfo dataTooltipId={'random-damage-tooltip'}/>
      <Tooltip id="random-damage-tooltip" className="tooltip" border="1px solid #343a40">
        <ul>
          <li>"RandomDamage": 35 means the system will choose a random number between 0 and 35 and apply
            that percentage as damage to the item's maximum durability.
          </li>
          <li>
            In this case, with "InitialDamage": 5 and "RandomDamage": 35 having selected 25, the item will
            spawn with 70% durability. This is calculated by subtracting the initial damage (5%) and the
            random damage (25%) from 100%, resulting in 70% (100 - 5 - 25 = 70).
          </li>
        </ul>
      </Tooltip>
    </>
  )
}
