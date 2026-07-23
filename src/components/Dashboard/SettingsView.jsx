import { HiOutlineUser, HiOutlineBell, HiOutlineShieldCheck } from 'react-icons/hi2'

const SETTINGS_SECTIONS = [
  {
    icon: HiOutlineUser,
    title: 'Recruiter profile',
    description: 'Your name and contact details as shown to candidates.',
  },
  {
    icon: HiOutlineBell,
    title: 'Notifications',
    description: 'Choose when you get notified about new submissions and status changes.',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Data & privacy',
    description: 'Manage how candidate data is stored and who on your team can view it.',
  },
]

export default function SettingsView() {
  return (
    <div className="max-w-2xl space-y-4">
      {SETTINGS_SECTIONS.map((section) => {
        const Icon = section.icon
        return (
          <div
            key={section.title}
            className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-5 shadow-soft"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Icon size={19} />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">{section.title}</p>
              <p className="mt-0.5 text-xs text-ink-soft">{section.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
