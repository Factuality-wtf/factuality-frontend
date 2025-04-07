const Footer = () => {
  return (
    <footer>
      <div className="min-w-screen text-center p-12">
        <div className="flex flex-row items-end justify-between gap-y-4">
          <div className="flex flex-col justify-start text-left text-secondary text-2xl uppercase gap-y-4">
            <div className="text-3xl">
              Created by{" "}
              <a href="https://t0nylombardi.dev" className="hover:text-text">
                t0nylombardi
              </a>
            </div>
            <div className="text-3xl break-normal">
              <span>©</span> {new Date().getFullYear()} Factuality.WTF
            </div>
          </div>
          <div className="flex flex-col justify-end items-end text-right text-secondary text-2xl uppercase gap-y-4">
            <div className="text-3xl hover:text-text">
              <a href="https://t0nylombardi.com">Github</a>
            </div>
            <div className="text-3xl hover:text-text">
              <a href="">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
