export default function Loading() {
  return (
    <main className='flex min-h-screen items-center justify-center px-6 text-center'>
      <div className='flex w-full max-w-md flex-col items-center gap-6'>
        <p className='jamb-loading-wordmark text-7xl leading-none text-black'>Jamb.</p>
        <div className='h-px w-full overflow-hidden bg-jamb-line'>
          <div className='jamb-loading-line h-full w-full bg-black' />
        </div>
        <p className='text-xs font-medium tracking-[0.28em] uppercase text-jamb-ink-muted'>
          Curating the collection
        </p>
      </div>
    </main>
  );
}
