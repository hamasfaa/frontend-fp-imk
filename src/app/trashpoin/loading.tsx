export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Program Reward Poin</h1>
        <p className="text-muted-foreground">Memuat data reward...</p>
      </div>

      <div className="flex justify-center items-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    </div>
  )
}
