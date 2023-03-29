/* eslint-disable @next/next/no-img-element */

import { useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { animated, useSpring } from "react-spring";

const navigation: {
  name: string;
  href: string;
}[] = [];

/**
 * Inspired by: https://twitter.com/FonsMans/status/1569708218351247366
 * Ported from Svelte Project: https://twitter.com/laudis_io/status/1569751280905785347
 */
export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const svgRef = useRef<SVGSVGElement>(null);

  const [styles, api] = useSpring(() => ({
    transform: `translate(0px, 0px)`,
  }));

  function screenToSVG({ x: screenX, y: screenY }: { x: number; y: number }) {
    const svg = svgRef.current;
    const p = svg?.createSVGPoint();

    if (!p) return { x: 0, y: 0 };
    p.x = screenX;
    p.y = screenY;
    return p.matrixTransform(svg?.getScreenCTM()?.inverse());
  }

  return (
    <div className="max-w-[1512px] max-h-[982px] border border-black rounded-xl h-screen m-0 overflow-hidden ">
      <img
        src="/bright-rain.png"
        alt="noise"
        className="absolute left-0 top-0 min-w-full min-h-full mix-blend-overlay opacity-20 pointer-events-none"
      />
      <svg
        className="lg:min-w-full h-full"
        ref={svgRef}
        onMouseMove={(e) => {
          const coords = screenToSVG({ x: e.clientX, y: e.clientY });
          api.start({
            transform: `translate(${coords.x}px, ${coords.y}px)`,
            config: { mass: 0.1, tension: 50, friction: 15 },
          });
        }}
        viewBox="0 0 1512 982"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_878_1737)">
          <rect width="1512" height="982" fill="#1C1C1C" />
          <g filter="url(#filter0_f_878_1737)">
            <path
              d="M984 217.5C984 359 658.5 387.756 583 456.5C507.5 525.244 158.359 964 -19.5 964C-162.829 1141.33 -139 1008 -52.805 933.553C-174.626 933.553 -103.184 -0.252945 -103.184 -97.0044C-103.184 -193.756 355.031 -40.2318 476.852 -40.2318C763.466 -126.742 984 120.749 984 217.5Z"
              fill="#A390CE"
            />
          </g>
          <g filter="url(#filter1_f_878_1737)">
            <ellipse
              cx="983.5"
              cy="-15.5"
              rx="332.5"
              ry="263.5"
              fill="#8EADD9"
            />
          </g>

          <animated.g
            id="mouse-input"
            style={{ mixBlendMode: "color-dodge", ...styles }}
            filter="url(#filter2_f_878_1737)"
          >
            <path
              d="M145.315 -7.65351C122.208 154.962 385.107 134.277 519.445 103.607C555.57 82.7502 509.545 -26.117 443.829 -95.7139C378.113 -165.311 548.881 -294.712 484.481 -387.158C420.081 -479.603 174.199 -210.923 145.315 -7.65351Z"
              fill="#F838CD"
            />
            <path
              d="M233.221 -116.853C162.602 -177.782 -362.623 426.665 -182.463 523.08C-19.1196 610.495 401.825 195.226 451.222 153.295C512.968 100.882 321.496 -40.6913 233.221 -116.853Z"
              fill="#7A81BD"
            />
            <path
              d="M98.7067 -164.626C43.8658 -288.255 -143.801 -301.321 -235.873 -301.321C-327.946 -301.321 -513.6 -280.817 -519.637 -198.8C-527.184 -96.2787 -414.484 -88.7404 -414.484 128.363C-414.484 345.467 -216.754 206.259 23.2375 206.259C215.231 206.259 153.548 -40.9977 98.7067 -164.626Z"
              fill="#F1972C"
            />
          </animated.g>
        </g>
        <defs>
          <filter
            id="filter0_f_878_1737"
            x="-424"
            y="-429"
            width="1708"
            height="1780.99"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="50"
              result="effect1_foregroundBlur_878_1737"
            />
          </filter>
          <filter
            id="filter1_f_878_1737"
            x="351"
            y="-579"
            width="1265"
            height="1127"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="50"
              result="effect1_foregroundBlur_878_1737"
            />
          </filter>
          <filter
            id="filter2_f_878_1737"
            x="-960"
            y="-845.921"
            width="1932.12"
            height="1821.06"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="160"
              result="effect1_foregroundBlur_878_1737"
            />
          </filter>
          <clipPath id="clip0_878_1737">
            <rect width="1512" height="982" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <div className="isolate absolute left-0 top-0 min-w-full min-h-full pointer-events-none">
        <div className="px-6 pt-6 lg:px-8">
          <nav
            className="flex items-center justify-between"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <span className="font-medium text-xl text-white">Wove</span>
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </nav>
          <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <span className="font-medium text-xl text-white">Wove</span>
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                    >
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </div>
        <main>
          <div className="relative px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
              <div className="hidden sm:mb-8 lg:mb-24 sm:flex sm:justify-center">
                {/* <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-200 ring-1 ring-white/10 hover:ring-white/20">
                  Announcing our next round of funding.{" "}
                  <a href="#" className="font-semibold text-white">
                    <span className="absolute inset-0" aria-hidden="true" />
                    Read more <span aria-hidden="true">&rarr;</span>
                  </a>
                </div> */}
              </div>
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white/70 sm:text-6xl">
                  Teach yourself anything
                </h1>
                <p className="mt-6 text-lg leading-8 text-white/70">
                  Wove is the world&apos;s first AI-powered personal learning
                  assistant. Effectively reach your goals, navigate through new
                  domains, and automatically organize your knowledge.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-md bg-white px-3.5 py-1.5 text-base pointer-events-auto font-semibold leading-7 text-gray-800 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                  >
                    Request access
                  </a>
                  <a
                    href="#"
                    className="text-base font-semibold leading-7 lg:text-white text-gray-600 pointer-events-auto"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
