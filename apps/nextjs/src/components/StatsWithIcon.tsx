export default function StatsWithIcon() {
  const stats = [
    {
      id: 1,
      name: "Daily streak for Japanese",
      stat: "22 days",
      change: "122",
      changeType: "increase",
      emoji: "🇯🇵",
    },
    {
      id: 2,
      name: "Milestone passed for Web Dev",
      stat: "10,000 hours",
      change: "3",
      changeType: "increase",
      emoji: "👨‍💻",
    },
  ];
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                {item.emoji ? (
                  <span className="text-white text-2xl">{item.emoji}</span>
                ) : null}
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {item.stat}
              </p>
              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {" "}
                    View all<span className="sr-only"> {item.name} stats</span>
                  </a>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
