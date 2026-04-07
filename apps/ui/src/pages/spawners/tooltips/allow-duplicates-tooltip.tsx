export function AllowDuplicatesTooltip() {
    return (
        <ul>
            <li>
                "AllowDuplicates": false means you won't receive two of the same item. So, if the spawner decides to
                drop 7 items but 3 are duplicates, you'll only receive 4 unique items.
            </li>
            <li>"AllowDuplicates": true allows the spawner to spawn the same item multiple times.</li>
        </ul>
    );
}
