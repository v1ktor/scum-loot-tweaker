interface Props {
  probability?: number;
}

export function ProbabilityTooltip(props: Props) {
  const {probability} = props;
  const defaultProbability = '15';

  return (
    <ul>
      <li>
        "Probability": {probability || defaultProbability}, indicates
        a {probability || defaultProbability}% drop rate
        for the item,
        which should be adjusted by
        multiplying with the settings in your ServerSettings.ini and zone modifiers.
      </li>
      <li>If you desire a 100% drop chance, you can either remove the probability value or set it to
        0.
      </li>
      <li>
        If you set the probability to 100, the final drop chance won't be 100% because it still gets
        adjusted by the ServerSettings.ini and zone modifiers.
      </li>
    </ul>
  )
}
