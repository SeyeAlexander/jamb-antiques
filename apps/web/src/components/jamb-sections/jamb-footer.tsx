export function JambFooter() {
  const dummyColumnsRow1 = [
    {
      title: "Fireplaces",
      links: [
        "Reproduction Fireplaces",
        "Antique Fireplaces",
        "Antique Chimneypieces",
        "Register Grates",
        "Fireplace Accessories",
      ],
    },
    {
      title: "Lighting",
      links: [
        "Reproduction Lighting",
        "Hanging Globes",
        "Hanging Lanterns",
        "Wall Lights",
        "Table & Floor Lamps",
        "Antique Lighting",
      ],
    },
    {
      title: "Furniture",
      links: [
        "Reproduction Furniture",
        "Seating",
        "Tables",
        "Mirrors",
        "Desks",
        "Antique Furniture",
      ],
    },
    { title: "Architectural", links: ["Panelling", "Doors", "Garden & Exterior", "Statuary"] },
    { title: "Accessories", links: ["Fire Dogs", "Fenders", "Logs and Coals", "Objets d'Art"] },
  ];
  const dummyColumnsRow2 = [
    { title: "Journal", links: ["Read the Journal", "Press", "Exhibitions", "Videos"] },
    {
      title: "About",
      links: ["Our Story", "The Founders", "Bespoke Services", "Showroom", "Workshop"],
    },
    {
      title: "Customer Care",
      links: ["Contact Us", "Delivery & Returns", "Terms & Conditions", "Privacy Policy"],
    },
  ];

  return (
    <footer className='mt-20 w-full bg-jamb-light py-10'>
      <div className='jamb-shell'>
        <div className='mb-20 grid grid-cols-1 gap-10 text-jamb-ink-soft md:grid-cols-5'>
          <div className='flex flex-col text-sm font-medium'>
            <p className='hover:text-black mb-1.5 cursor-pointer'>T +44 (0) 20 7730 2122</p>
            <p>95-97 Pimlico Road</p>
            <p>London, SW1W 8PH</p>
          </div>

          <div className='flex flex-col text-sm font-medium'>
            <a href='mailto:info@jamb.co.uk' className='hover:text-black/70'>
              hello@jamb.co.uk
            </a>
          </div>

          <div className='hidden md:block'></div>

          <div className='col-span-1 md:col-span-2 flex flex-col'>
            <h4 className='mb-2 border-none text-base font-medium'>Newsletter</h4>
            <div className='relative mt-2 flex w-full'>
              <input
                type='email'
                placeholder='Search'
                className='flex-1 border border-jamb-gray bg-white px-2 py-2.5 text-base focus:outline-none placeholder:text-jamb-ink-soft'
              />
              <button className='border border-jamb-gray bg-white px-2 text-base font-medium tracking-widest transition-colors hover:bg-black/70 hover:text-white'>
                Subscribe
              </button>
            </div>

            <label className='mt-4 flex cursor-pointer flex-row items-center gap-2 font-medium text-jamb-ink-muted hover:text-black'>
              <input
                className='h-4 w-4 appearance-none rounded border border-black/30 bg-jamb-light accent-black transition-colors checked:border-black checked:bg-black'
                type='checkbox'
              />
              <span>
                I agree to our <a href='#'>Privacy policy</a>.
              </span>
            </label>
          </div>
        </div>

        <div className='mb-16 grid grid-cols-2 gap-10 md:grid-cols-5'>
          {dummyColumnsRow1.map((col, i) => (
            <div key={i} className='flex flex-col'>
              <h4 className='mb-2.5 border-t border-jamb-gray pt-4 text-sm font-bold text-jamb-ink-soft'>
                {col.title}
              </h4>
              <ul className='flex flex-col gap-2.5'>
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href='#'
                      className='text-base text-jamb-gray hover:text-black transition-colors'
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='mb-16 grid grid-cols-2 gap-8 md:grid-cols-5'>
          {dummyColumnsRow2.map((col, i) => (
            <div key={i} className='flex flex-col'>
              <h4 className='mb-2.5 border-t border-jamb-gray pt-4 text-sm font-bold text-jamb-ink-soft'>
                {col.title}
              </h4>
              <ul className='flex flex-col gap-2.5'>
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href='#'
                      className='text-base text-jamb-gray hover:text-black transition-colors'
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
