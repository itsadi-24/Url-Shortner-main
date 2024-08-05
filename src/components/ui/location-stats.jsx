import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

export default function Location({ stats }) {
  const cityCount = stats.reduce((acc, item) => {
    if (acc[item.city]) {
      acc[item.city] += 1;
    } else {
      acc[item.city] = 1;
    }
    return acc;
  }, {});

  const cities = Object.entries(cityCount).map(([city, count]) => ({
    city,
    count,
  }));

  return (
    <div className='w-full h-[300px]'>
      <ResponsiveContainer>
        <LineChart width={700} height={300} data={cities.slice(0, 5)}>
          <XAxis
            dataKey='city'
            tick={{ fill: '#ffffff', fontSize: 12 }}
            stroke='#ffffff'
          />
          <YAxis tick={{ fill: '#ffffff', fontSize: 12 }} stroke='#ffffff' />
          <Tooltip
            labelStyle={{ color: '#000000' }}
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #cccccc',
            }}
          />
          <Legend wrapperStyle={{ color: '#ffffff' }} />
          <Line
            type='monotone'
            dataKey='count'
            stroke='#8884d8'
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
