import { IconInfo } from "../../../components/icon-info/IconInfo.tsx";
import { Tooltip } from "react-tooltip";

export function AllowDuplicatesTooltip() {
  return (
    <>
      <IconInfo dataTooltipId={'allow-duplicates-tooltip'}/>
      <Tooltip id="allow-duplicates-tooltip" className="tooltip" border="1px solid #343a40">
        <ul>
          <li>
            "AllowDuplicates": false means you won't receive two of the same item. So, if the spawner
            decides to drop 7 items but 3 are duplicates, you'll only receive 4 unique items.
          </li>
          <li>
            "AllowDuplicates": true allows the spawner to spawn the same item multiple times.
          </li>
        </ul>
      </Tooltip>
    </>
  )
}
