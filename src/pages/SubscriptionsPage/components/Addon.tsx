import React from 'react'
import type { SubscriptionProduct } from '../../../services/api/Payment/types'

const fmt = (n: number) =>
  n.toLocaleString(undefined, {
    maximumFractionDigits: 0,
  })

export const Addon = ({
  isActive,
  checked,
  sub,
  anySubActive,
  onChangeAddon,
}: {
  isActive?: boolean
  checked: boolean
  sub: SubscriptionProduct
  anySubActive: boolean
  onChangeAddon?: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void | Promise<void>
}) => {
  return (
    <div className="w-full rounded-2xl bg-gray-100 p-6">
      <div className="flex w-full flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center justify-center">
            <img
              src={sub.image}
              className="w-20 h-20 object-contain"
              alt={`${sub.name}_image`}
            />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-lg font-semibold text-gray-900">
              AI settings to suit your brand style
            </h4>
            <p className="text-sm text-gray-500">
              Customize the AI response style to match your brand tone or
              support approach.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            <span className="text-lg font-semibold text-gray-900">
              +{`$${fmt(parseInt(sub.price, 10))}`}
            </span>
            /month
          </span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isActive || checked}
              onChange={onChangeAddon}
              disabled={isActive || anySubActive}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600" />
          </label>
        </div>
      </div>
    </div>
  )
}
