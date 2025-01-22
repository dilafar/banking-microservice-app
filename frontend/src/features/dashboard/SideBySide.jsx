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
  Pie,
  PieChart,
} from "recharts";

// Styled container for charts
const ChartsContainer = styled.div`
  display: flex;
  gap: 2rem; /* Space between the charts */
  justify-content: space-between; /* Ensure charts are evenly spaced */
  align-items: flex-start; /* Align charts at the top */
`;

// Chart box styles
const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 3.2rem;
  flex: 1; /* Equal width for both charts */

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-bar-rectangle {
    stroke-width: 2px;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const barChartData = [
  { duration: "1 night", value: 2, color: "#ef4444" },
  { duration: "2 nights", value: 4, color: "#f97316" },
  { duration: "3 nights", value: 5, color: "#eab308" },
  { duration: "4-5 nights", value: 0, color: "#84cc16" },
];

const startDataLight = [
  { duration: "Savings", value: 5, color: "#3b82f6" },
  { duration: "Current", value: 9, color: "#a855f7" },
  { duration: "Joint", value: 5, color: "#eab308" },
  { duration: "Salary", value: 1, color: "#84cc16" },
  { duration: "Fixed deposit", value: 6, color: "#22c55e" },
  { duration: "Student", value: 7, color: "#14b8a6" },
];

function DurationBarChart() {
  return (
    <ChartBox>
      <Heading as="h2">Stay duration summary (Bar Chart)</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <XAxis dataKey="duration" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" align="right" iconSize={10} />
          <Bar dataKey="value" name="Stay Duration" barSize={20}>
            {barChartData.map((entry) => (
              <Cell fill={entry.color} key={entry.duration} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

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
            cx="50%"
            cy="50%"
            paddingAngle={3}
          >
            {startDataLight.map((entry) => (
              <Cell fill={entry.color} stroke={entry.color} key={entry.duration} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="top" align="right" iconSize={10} />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

function ChartsSideBySide() {
  return (
    <ChartsContainer>
      <DurationBarChart />
      <DurationChart />
    </ChartsContainer>
  );
}

export default ChartsSideBySide;
