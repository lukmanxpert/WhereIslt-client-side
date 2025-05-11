import React from 'react';

const Statistics = () => {
  const stats = [
    { label: "Items Recovered", value: 2350, icon: "📦" },
    { label: "Active Users", value: 1250, icon: "👥" },
    { label: "Lost Items", value: 320, icon: "🔍" },
    { label: "Found Items", value: 500, icon: "📢" },
  ];

  return (
    <section className="bg-blue-50 dark:bg-dark_bg py-10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Platform Statistics</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-dark_bg p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="text-4xl">{stat.icon}</div>
              <h3 className="text-xl font-semibold mt-2 dark:text-white">{stat.value}</h3>
              <p className="text-gray-600 dark:text-gray-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
