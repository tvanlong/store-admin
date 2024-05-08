export const sidebarTheme = {
  root: {
    base: 'h-full',
    collapsed: {
      on: 'w-16',
      off: 'w-64'
    },
    inner: 'h-full overflow-y-auto overflow-x-hidden rounded bg-[#1d374e] px-3 py-4'
  },
  collapse: {
    button:
      'group flex w-full items-center rounded-lg p-2 text-base font-normal text-white transition duration-75 hover:bg-[#2d5171]',
    icon: {
      base: 'h-6 w-6 text-white transition duration-75',
      open: {
        off: '',
        on: 'text-white'
      }
    },
    label: {
      base: 'ml-3 flex-1 whitespace-nowrap text-left',
      icon: {
        base: 'h-6 w-6 transition delay-0 ease-in-out',
        open: {
          on: 'rotate-180',
          off: ''
        }
      }
    },
    list: 'space-y-2 py-2'
  },
  cta: {
    base: 'mt-6 rounded-lg bg-gray-100 p-4',
    color: {
      blue: 'bg-cyan-50',
      failure: 'bg-red-50',
      gray: 'bg-alternative-50',
      green: 'bg-green-50',
      light: 'bg-light-50',
      red: 'bg-red-50',
      purple: 'bg-purple-50',
      success: 'bg-green-50',
      yellow: 'bg-yellow-50',
      warning: 'bg-yellow-50'
    }
  },
  item: {
    base: 'flex items-center justify-center rounded-lg p-2 text-base font-normal text-white hover:bg-[#2d5171]',
    active: 'bg-gray-100',
    collapsed: {
      insideCollapse: 'group w-full pl-8 transition duration-75',
      noIcon: 'font-bold'
    },
    content: {
      base: 'flex-1 whitespace-nowrap px-3'
    },
    icon: {
      base: 'h-6 w-6 flex-shrink-0 text-white transition duration-75 group-hover:text-white',
      active: 'text-gray-700'
    },
    label: '',
    listItem: ''
  },
  items: {
    base: ''
  },
  itemGroup: {
    base: 'mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0'
  },
  logo: {
    base: 'mb-5 flex items-center pl-2.5 text-white',
    collapsed: {
      on: 'hidden',
      off: 'self-center whitespace-nowrap text-xl font-semibold'
    },
    img: 'mr-3 h-6 sm:h-7'
  }
}

export const tableTheme = {
  root: {
    base: 'w-full text-left text-sm text-gray-500',
    shadow: 'h-full w-full rounded-lg bg-white drop-shadow-md',
    wrapper: ''
  },
  body: {
    base: 'group/body',
    cell: {
      base: 'px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg'
    }
  },
  head: {
    base: 'group/head text-xs uppercase text-gray-700',
    cell: {
      base: 'bg-gray-50 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg'
    }
  },
  row: {
    base: 'group/row',
    hovered: 'hover:bg-gray-50',
    striped: 'odd:bg-white even:bg-gray-50'
  }
}

export const modalTheme = {
  root: {
    base: 'fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full',
    show: {
      on: 'flex bg-opacity-50',
      off: 'hidden'
    },
    sizes: {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl',
      '6xl': 'max-w-6xl',
      '7xl': 'max-w-7xl'
    },
    positions: {
      'top-left': 'items-start justify-start',
      'top-center': 'items-start justify-center',
      'top-right': 'items-start justify-end',
      'center-left': 'items-center justify-start',
      center: 'items-center justify-center',
      'center-right': 'items-center justify-end',
      'bottom-right': 'items-end justify-end',
      'bottom-center': 'items-end justify-center',
      'bottom-left': 'items-end justify-start'
    }
  },
  content: {
    base: 'relative h-full w-full p-4 md:h-auto',
    inner: 'relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow'
  },
  body: {
    base: 'flex-1 overflow-auto p-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100',
    popup: 'pt-0'
  },
  header: {
    base: 'flex items-start justify-between rounded-t border-b p-5',
    popup: 'border-b-0 p-2',
    title: 'text-xl font-medium text-gray-900',
    close: {
      base: 'ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900',
      icon: 'h-5 w-5'
    }
  },
  footer: {
    base: 'flex items-center space-x-2 rounded-b border-gray-200 p-6',
    popup: 'border-t'
  }
}

export const fileInputTheme = {
  field: {
    base: 'w-full'
  }
}

export const textInputTheme = {
  field: {
    base: 'w-full'
  }
}
