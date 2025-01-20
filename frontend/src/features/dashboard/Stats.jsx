/* eslint-disable react/prop-types */
import {
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineBanknotes,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';

function Stats() {
  // Stat 1)

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title='Bookings'
        value={10}
        color='blue'
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title='Sales'
        value={10}
        color='green'
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title='Check ins'
        value={12}
        color='indigo'
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title='Occupancy rate'
        value={14}
        color='yellow'
      />
    </>
  );
}

export default Stats;
