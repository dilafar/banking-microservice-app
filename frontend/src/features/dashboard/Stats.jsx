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
        title='Accounts'
        value={3}
        color='blue'
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title='Saving'
        value={1000000}
        color='green'
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title='Loans'
        value={100000}
        color='indigo'
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title='Interest rate'
        value={14}
        color='yellow'
      />
    </>
  );
}

export default Stats;
