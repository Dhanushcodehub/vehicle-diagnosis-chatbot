// app/loading.tsx
export default function Loading() {
  return (
    
        <div className="fixed inset-0 z-50 grid place-items-center bg-white text-black">
      <div className="flex items-center gap-3">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-black border-t-transparent" />
        <span>Loading…</span>
      </div>
    </div>
    
  );
}
