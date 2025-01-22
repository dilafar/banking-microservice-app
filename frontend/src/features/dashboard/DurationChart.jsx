import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: "Savings",
    value: 5,
    color: "#3b82f6",
  },
  {
    duration: "Current",
    value: 9,
    color: "#a855f7",
  },
  {
    duration: "Joint",
    value: 5,
    color: "#eab308",
  },
  {
    duration: "Salary",
    value: 1,
    color: "#84cc16",
  },
  {
    duration: "Fixed deposit",
    value: 6,
    color: "#22c55e",
  },
  {
    duration: "Student",
    value: 7,
    color: "#14b8a6",
  },

];

function DurationChart() {

  return (
    <ChartBox>
      <Heading as="h2">Accounts Summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={startDataLight}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {startDataLight.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;