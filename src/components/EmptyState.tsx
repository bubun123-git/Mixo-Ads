interface EmptyStateProps {
  title?: string
  message: string
  action?: {
    label: string
    onClick: () => void
  }
}

export default function EmptyState({ 
  title = 'No Data', 
  message, 
  action 
}: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-4">📭</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        {action && (
          <button
            onClick={action.onClick}
            className="btn btn-primary"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  )
}
