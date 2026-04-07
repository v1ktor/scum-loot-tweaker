export function ShouldFilterItemsByZoneTooltip() {
    return (
        <ul>
            <li>
                This refers to the "Coastal," "Continental," and "Mountain" zone locations that are specified in the
                Parameters.json file.
            </li>
            <li>
                "ShouldFilterItemsByZone": true means that item spawning will be based on the zone locations set in the
                Parameters.json. If set to false, items can spawn in any location.
            </li>
        </ul>
    );
}
