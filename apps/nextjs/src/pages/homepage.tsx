import type { NextPage } from "next";

import Hero from "~/components/marketing/Hero";

const HomePage: NextPage = () => {
  return (
    <div className="bg-outer-space-800">
      <div className="max-w-[1512px] mx-auto p-2 lg:p-24">
        <Hero />
      </div>
    </div>
  );
};

export default HomePage;
