import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { api } from "~/utils/api";
import { OnboardingLayout } from "~/components/layouts/OnboardingLayout";
import Button, { ButtonType } from "~/components/primitives/Button";

const OnboardingCollections: NextPage = () => {
  const router = useRouter();
  const [domain, setDomain] = useState<string>("");
  const [domains, setDomains] = useState<string[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const { mutate } = api.collection.createMany.useMutation({
    async onSuccess() {
      setDomain("");
      await router.push("/app");
    },
  });

  return (
    <OnboardingLayout>
      <div className="flex w-full items-center justify-center py-16">
        <div className="w-full max-w-2xl">
          <div className="overflow-hidden sm:rounded-lg">
            <div className="flex flex-col gap-6 bg-white px-4 py-5 sm:p-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  What are you currently learning?
                </h1>
                <p className="mt-3 text-gray-500">
                  Add domains that you either have expertise in or are currently
                  learning.
                </p>
              </div>
              <div>
                <ul className="flex flex-wrap gap-2">
                  {domains.map((domain) => (
                    <li key={domain} className="flex gap-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-gigas-100 text-gigas-800">
                        {domain}

                        <button
                          type="button"
                          className="ml-2.5 inline-flex text-gigas-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gigas-100 focus:ring-gigas-500"
                          onClick={() => {
                            setDomains(domains.filter((d) => d !== domain));
                          }}
                        >
                          <span className="sr-only">Remove</span>
                          <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <form
                className="my-4 grid grid-cols-6 gap-12"
                onSubmit={(e) => {
                  e.preventDefault();
                  setDomains([...domains, domain]);
                  setDomain("");
                }}
              >
                <div className="col-span-6">
                  <label
                    htmlFor="custom-role"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Press enter to add a domain
                  </label>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    name="custom-role"
                    id="custom-role"
                    placeholder="e.g. Rust, Data Science, Skateboarding, etc."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gigas-500 focus:ring-gigas-500 sm:text-sm"
                  />
                </div>
              </form>

              <div className="mx-auto inline-flex w-full gap-4">
                <Button
                  type={ButtonType.Secondary}
                  onClick={(e) => {
                    e.preventDefault();
                    void router.push("/onboarding/goal");
                  }}
                >
                  Back
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleNext();
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );

  function handleNext() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    mutate({
      names: domains,
    });
  }
};

export default OnboardingCollections;
