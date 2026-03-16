export function IconClear(props: {
  onClick: () => void;
}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         className="icon"
         width="24"
         height="24"
         viewBox="0 -960 960 960"
         onClick={props.onClick}>
      <path
        d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z"/>
    </svg>
  )
}
