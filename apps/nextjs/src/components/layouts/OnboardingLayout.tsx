export function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen">
      <div className="flex min-h-full flex-col bg-tasman-300 pt-16 pb-12 h-full">
        <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
