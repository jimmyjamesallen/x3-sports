import { useState } from "react";

const CLASSES = [
  {
    id: "mma",
    name: "MMA",
    description: "Mixed Martial Arts combining striking, grappling, and ground fighting.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    id: "boxing",
    name: "Boxing",
    description: "Classic boxing fundamentals — footwork, combos, and conditioning.",
    icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  },
  {
    id: "kickboxing",
    name: "Kickboxing",
    description: "High-energy striking with punches, kicks, knees, and elbows.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    id: "bjj",
    name: "Brazilian Jiu-Jitsu",
    description: "Ground-based grappling focused on submissions and positional control.",
    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
  },
] as const;

type ClassId = (typeof CLASSES)[number]["id"];

const TIME_SLOTS: Record<ClassId, { morning: string; evening: string }> = {
  mma: { morning: "10:00 AM", evening: "6:00 PM" },
  boxing: { morning: "9:00 AM", evening: "5:30 PM" },
  kickboxing: { morning: "10:30 AM", evening: "7:00 PM" },
  bjj: { morning: "11:00 AM", evening: "6:30 PM" },
};

const STEP_LABELS = ["Class", "Schedule", "Details", "Confirmed"];

function getNextDays(count: number) {
  const days: Date[] = [];
  const now = new Date();
  for (let i = 1; i <= count; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    days.push(d);
  }
  return days;
}

function formatDay(d: Date) {
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

const socialIcons: Record<string, { path: string; url: string }> = {
  Facebook: {
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    url: "#",
  },
  Instagram: {
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
    url: "#",
  },
  YouTube: {
    path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    url: "#",
  },
  Twitter: {
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    url: "#",
  },
};

export default function BookingWizard() {
  const [step, setStep] = useState(0);
  const [selectedClass, setSelectedClass] = useState<ClassId | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const dates = getNextDays(5);
  const classInfo = CLASSES.find((c) => c.id === selectedClass);
  const timeSlots = selectedClass ? TIME_SLOTS[selectedClass] : null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: API call to submit booking would go here
    setStep(3);
  }

  return (
    <div>
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-10">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                  i <= step
                    ? "bg-[#dc2626] border-[#dc2626] text-white"
                    : "border-[#262626] text-[#a3a3a3]"
                }`}
              >
                {i < step ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`text-xs mt-1.5 font-medium ${
                  i <= step ? "text-[#f5f5f5]" : "text-[#a3a3a3]"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 mt-[-1.25rem] ${
                  i < step ? "bg-[#dc2626]" : "bg-[#262626]"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Choose a Class */}
      {step === 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Choose a Class</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CLASSES.map((cls) => (
              <button
                key={cls.id}
                onClick={() => {
                  setSelectedClass(cls.id);
                  setSelectedTime(null);
                }}
                className={`text-left p-5 rounded-xl border-2 transition-colors ${
                  selectedClass === cls.id
                    ? "border-[#dc2626] bg-[#1a1a1a]"
                    : "border-[#262626] bg-[#141414] hover:border-[#a3a3a3]"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-[#dc2626]/10 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[#dc2626]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={cls.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#f5f5f5]">{cls.name}</h3>
                    <p className="text-sm text-[#a3a3a3] mt-1">{cls.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <button
              disabled={!selectedClass}
              onClick={() => setStep(1)}
              className="bg-[#dc2626] hover:bg-[#b91c1c] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Pick Date & Time */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Pick a Date &amp; Time</h2>

          {/* Date pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
            {dates.map((d) => {
              const isSelected =
                selectedDate && d.toDateString() === selectedDate.toDateString();
              return (
                <button
                  key={d.toISOString()}
                  onClick={() => setSelectedDate(d)}
                  className={`shrink-0 px-4 py-2.5 rounded-full text-sm font-medium border transition-colors ${
                    isSelected
                      ? "bg-[#dc2626] border-[#dc2626] text-white"
                      : "border-[#262626] text-[#a3a3a3] hover:border-[#a3a3a3]"
                  }`}
                >
                  {formatDay(d)}
                </button>
              );
            })}
          </div>

          {/* Time slots */}
          {selectedDate && timeSlots && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(["morning", "evening"] as const).map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(timeSlots[slot])}
                  className={`p-5 rounded-xl border-2 text-left transition-colors ${
                    selectedTime === timeSlots[slot]
                      ? "border-[#dc2626] bg-[#1a1a1a]"
                      : "border-[#262626] bg-[#141414] hover:border-[#a3a3a3]"
                  }`}
                >
                  <div className="text-xs uppercase tracking-wider text-[#a3a3a3] mb-1">
                    {slot === "morning" ? "Morning" : "Evening"}
                  </div>
                  <div className="text-lg font-semibold text-[#f5f5f5]">{timeSlots[slot]}</div>
                </button>
              ))}
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep(0)}
              className="border border-[#262626] hover:border-[#a3a3a3] text-[#f5f5f5] font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Back
            </button>
            <button
              disabled={!selectedDate || !selectedTime}
              onClick={() => setStep(2)}
              className="bg-[#dc2626] hover:bg-[#b91c1c] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Contact Info */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Details</h2>

          {/* Booking summary */}
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-5 mb-6">
            <h3 className="text-sm uppercase tracking-wider text-[#a3a3a3] mb-3">Booking Summary</h3>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-[#a3a3a3]">Class</span>
                <span className="text-[#f5f5f5] font-medium">{classInfo?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a3a3a3]">Date</span>
                <span className="text-[#f5f5f5] font-medium">
                  {selectedDate && formatDay(selectedDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a3a3a3]">Time</span>
                <span className="text-[#f5f5f5] font-medium">{selectedTime}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#a3a3a3] mb-1.5">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#141414] border border-[#262626] rounded-lg px-4 py-3 text-[#f5f5f5] placeholder-[#a3a3a3]/50 focus:outline-none focus:border-[#dc2626] transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#a3a3a3] mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#141414] border border-[#262626] rounded-lg px-4 py-3 text-[#f5f5f5] placeholder-[#a3a3a3]/50 focus:outline-none focus:border-[#dc2626] transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#a3a3a3] mb-1.5">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#141414] border border-[#262626] rounded-lg px-4 py-3 text-[#f5f5f5] placeholder-[#a3a3a3]/50 focus:outline-none focus:border-[#dc2626] transition-colors"
                placeholder="(404) 555-0123"
              />
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="border border-[#262626] hover:border-[#a3a3a3] text-[#f5f5f5] font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Book Free Trial
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 3 && (
        <div className="text-center">
          <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold mb-2">You're All Set!</h2>
          <p className="text-[#a3a3a3] mb-8">
            Your free trial class has been booked. We'll send a confirmation to{" "}
            <span className="text-[#f5f5f5] font-medium">{email}</span>.
          </p>

          {/* Booking details */}
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-5 mb-8 max-w-sm mx-auto text-left">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#a3a3a3]">Class</span>
                <span className="text-[#f5f5f5] font-medium">{classInfo?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a3a3a3]">Date</span>
                <span className="text-[#f5f5f5] font-medium">
                  {selectedDate && formatDay(selectedDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a3a3a3]">Time</span>
                <span className="text-[#f5f5f5] font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a3a3a3]">Name</span>
                <span className="text-[#f5f5f5] font-medium">{name}</span>
              </div>
            </div>
          </div>

          {/* Social follow */}
          <div className="mb-8">
            <h3 className="text-sm uppercase tracking-wider text-[#a3a3a3] mb-4">Follow Us</h3>
            <div className="flex items-center justify-center gap-4">
              {Object.entries(socialIcons).map(([platform, { path, url }]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#141414] border border-[#262626] flex items-center justify-center text-[#a3a3a3] hover:text-[#dc2626] hover:border-[#dc2626] transition-colors"
                  aria-label={platform}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* App download */}
          <div className="mb-8">
            <h3 className="text-sm uppercase tracking-wider text-[#a3a3a3] mb-4">
              Get the X3 Sports App
            </h3>
            <div className="flex items-center justify-center gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-[#141414] border border-[#262626] hover:border-[#a3a3a3] rounded-lg px-5 py-3 transition-colors"
              >
                <svg className="w-6 h-6 text-[#f5f5f5]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] text-[#a3a3a3]">Download on the</div>
                  <div className="text-sm font-semibold text-[#f5f5f5]">App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-[#141414] border border-[#262626] hover:border-[#a3a3a3] rounded-lg px-5 py-3 transition-colors"
              >
                <svg className="w-6 h-6 text-[#f5f5f5]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.4l2.834 1.64a1 1 0 010 1.74l-2.834 1.64-2.532-2.533 2.532-2.486zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] text-[#a3a3a3]">Get it on</div>
                  <div className="text-sm font-semibold text-[#f5f5f5]">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          <a
            href="/"
            className="inline-block border border-[#262626] hover:border-[#a3a3a3] text-[#f5f5f5] font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Back to Home
          </a>
        </div>
      )}
    </div>
  );
}
