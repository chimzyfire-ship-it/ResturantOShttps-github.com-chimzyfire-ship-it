import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiLogout,
} from '@mdi/js'

export const menuAsideMain = [
  {
    to: '/dashboard',
    icon: mdiMonitor,
    label: 'Central Command',
  },
  {
    to: '/tables',
    label: 'Branch Monitor',
    icon: mdiTable,
  },
  {
    to: '/forms',
    label: 'Branch Terminal',
    icon: mdiSquareEditOutline,
  },
  {
    to: '/ui',
    label: 'Inventory Control',
    icon: mdiTelevisionGuide,
  },
  {
    to: '/finance',
    label: 'Finance & Recon',
    icon: mdiResponsive,
  },
  {
    to: '/login',
    label: 'Staff Portal',
    icon: mdiLock,
  },
]

export const menuAsideBottom = [
  {
    label: 'Abort Session',
    icon: mdiLogout,
    color: 'danger',
    isLogout: true,
  },
]
