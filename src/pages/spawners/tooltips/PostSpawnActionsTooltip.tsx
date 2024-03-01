import { IconInfo } from "../../../components/icon-info/IconInfo.tsx";
import { Tooltip } from "react-tooltip";

export function PostSpawnActionsTooltip() {
  return (
    <>
      <IconInfo dataTooltipId={'post-spawn-actions-tooltip'}/>
      <Tooltip id="post-spawn-actions-tooltip" className="tooltip" border="1px solid #343a40">
        <ul>
          <li>AB Keycard - if the item is a keycard, assign that it can open the closest bunker.</li>
          <li>Ammo Big Stash - if the item is ammo, sets the ammo count to 50-100% capacity of the caliber
            (example: cal_22 maximum number is 20, it will be 10-20/20).
          </li>
          <li>Ammo Small Stash - if the item is ammo, sets the ammo count to 0-35% capacity of the caliber
            (example: cal_22 maximum number is 20, it will be 0-7/20).
          </li>
          <li>Cash 200-500 - If the item is Cash, sets it's value to 200-500.</li>
          <li>Cash 50-200 - If the item is Cash, sets it's value to 50-200.</li>
          <li>Cash 1-100 - If the item is Cash, sets it's value to 1-100.</li>
          <li>Clothes Dirtiness 93%-96% - if the item is clothes, sets the dirtiness to 93-96%.</li>
          <li>Clothes Dirtiness 60%-85% - if the item is clothes, sets the dirtiness to 60-85%.</li>
          <li>Clothes Dirtiness 0%-20% - if the item is clothes, sets the dirtiness to 0-20%.</li>
          <li>0 Uses - All items with uses will spawn with 0 uses.</li>
          <li>KB Keycard Cargo - TBA.</li>
          <li>KB Keycard Police - TBA.</li>
          <li>KB Keycard Radiation - TBA.</li>
          <li>KB Keycard Sentry - TBA.</li>
        </ul>
      </Tooltip>
    </>
  )
}
