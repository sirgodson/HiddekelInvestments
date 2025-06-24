export default function Preloader() {
  return (
    <div className="fixed inset-0 bg-hiddekel-gray z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-hiddekel-gold border-t-transparent mb-4"></div>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-hiddekel-gold rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">H</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">HIDDEKEL</h1>
            <p className="text-gray-400 text-sm">INVESTMENTS</p>
          </div>
        </div>
        <p className="text-white text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
}
