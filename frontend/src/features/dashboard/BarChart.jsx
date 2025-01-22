import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 1 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-bar-rectangle {
    stroke-width: 2px;
  }
`;

const barChartData = [
  {
    duration: "Home",
    value: 2,
    color: "#ef4444",
  },
  {
    duration: "Education",
    value: 4,
    color: "#f97316",
  },
  {
    duration: "Personal",
    value: 5,
    color: "#eab308",
  },
  {
    duration: "Auto",
    value: 1,
    color: "#84cc16",
  },

];

function DurationBarChart() {
  return (
        <ChartBox>
      <Heading as="h2">Loans Summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <XAxis dataKey="duration" />
          <YAxis />
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="10%"
            layout="vertical"
            iconSize={0}
            iconType="circle"
          />
          <Bar dataKey="value" name="   " barSize={20}>
            {barChartData.map((entry) => (
              <Cell fill={entry.color} key={entry.duration} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationBarChart;
