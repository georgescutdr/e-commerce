import { BarChart, Bar, PieChart, Pie, LineChart, Line, Tooltip, XAxis, YAxis, Legend, ResponsiveContainer, Cell } from 'recharts'
import { Card } from 'primereact/card'
import { FaUsers, FaShoppingCart, FaDollarSign } from "react-icons/fa"
import './dashboard.css';

const salesData = [
  { name: 'Jan', sales: 400 },
  { name: 'Feb', sales: 600 },
  { name: 'Mar', sales: 800 },
  { name: 'Apr', sales: 500 },
  { name: 'May', sales: 700 },
];

const userDistribution = [
  { name: 'New Users', value: 300 },
  { name: 'Returning Users', value: 200 },
];

const trendData = [
  { name: 'Week 1', revenue: 1000 },
  { name: 'Week 2', revenue: 1500 },
  { name: 'Week 3', revenue: 1200 },
  { name: 'Week 4', revenue: 1800 },
];

const colors = ["#8884d8", "#82ca9d"];

export const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Stat Cards */}
      <div className="grid-cards">
        <Card className="stat-card">
          <FaUsers className="icon text-blue" />
          <div>
            <h3 className="card-title">Total Users</h3>
            <p className="card-value">1,200</p>
          </div>
        </Card>
        
        <Card className="stat-card">
          <FaShoppingCart className="icon text-green" />
          <div>
            <h3 className="card-title">Total Orders</h3>
            <p className="card-value">850</p>
          </div>
        </Card>

        <Card className="stat-card">
          <FaDollarSign className="icon text-yellow" />
          <div>
            <h3 className="card-title">Revenue</h3>
            <p className="card-value">$24,000</p>
          </div>
        </Card>
      </div>

      {/* Sales Bar Chart */}
      <Card className="chart-card">
        <h3 className="chart-title">Monthly Sales</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={salesData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* User Distribution Pie Chart */}
      <Card className="chart-card">
        <h3 className="chart-title">User Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={userDistribution} dataKey="value" outerRadius={80} label>
              {userDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Revenue Line Chart */}
      <Card className="chart-card">
        <h3 className="chart-title">Revenue Trends</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trendData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};
