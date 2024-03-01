import { Tooltip } from "react-tooltip";

export function RandomUsageTooltip() {
  return (
    <>
      <Tooltip id="random-usage-tooltip" className="tooltip" border="1px solid #343a40">
        <ul>
          <li>"RandomUsage": 35 means the system will select a random number between 0 and 35 and apply
            that percentage as damage to the item's maximum uses.
          </li>
          <li>In this scenario, with "InitialUsage": 5 and "RandomUsage": 35 having selected 15, our item
            will spawn with 16 out of 20 uses. This is calculated by first removing 5% of the maximum uses
            (which is 1 use from 20), and then removing an additional 15% of the maximum uses (which is 3
            uses from 20), resulting in 16 uses remaining (20 - 1 - 3 = 16).
          </li>
        </ul>
      </Tooltip>
    </>
  )
}
