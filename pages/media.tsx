/* eslint-disable jsx-a11y/anchor-is-valid */

import Card from "../components/media-card";
import Footer from "../components/footer";

function App() {
  return (
    <div className="relative">
      {/* Header Section */}
      <div className="text-center p-14 bg-gradient-to-r from-blue-50 to-blue-1000">
        <h1 className="font-bold text-4xl text-white">
          OSFD Stickers and Emojis
        </h1>
      </div>

      {/* Sticker section */}
      <div className="w-3/4 flex flex-row gap-3 mx-auto mt-12">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      <div className="w-3/4 flex flex-row gap-3 mx-auto mt-24">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      {/* Traits section */}
      <section>
        <h2 className="font-bold text-2xl text-center mb-3 mt-36">Traits</h2>
        <div className="w-3/4 flex flex-row gap-7 m-auto justify-center">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </section>

      {/* Links section */}
      <section>
        <div className="flex flex-row items-center justify-between px-48 py-16 mt-28 mb-32 m-auto bg-gradient-to-r from-indigo-50 via-white to-indigo-50 border border-gray-50">
          <div className="flex flex-col basis-1/6 space-y-6">
            <h3 className="max-w-md text-xl font-semibold text-center leading-tight">
              Adding your own custom sticker packs to Discord
            </h3>
            <a
              href="https://www.makeuseof.com/how-to-use-stickers-on-discord/"
              target="_blank"
              className="p-2 px-12 pt-1 text-center font-bold text-white bg-gradient-to-r from-purple-900 via-purple-700 to-purple-900 rounded-xl baseline"
              rel="noreferrer"
            >
              How To
            </a>
          </div>
          <div className="flex flex-col basis-1/6 space-y-6">
            <h3 className="max-w-md text-xl font-semibold text-center">
              Adding your own custom sticker packs to Slack
            </h3>
            <a
              href="https://slack.com/help/articles/206870177-Add-custom-emoji-and-aliases-to-your-workspace"
              target="_blank"
              className="p-2 px-12 pt-1 text-center font-bold text-white bg-gradient-to-r from-purple-900 via-purple-700 to-purple-900 rounded-xl baseline"
              rel="noreferrer"
            >
              How To
            </a>
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="max-w-md text-xl font-semibold text-center mb-6">
              Cool links
            </h3>
            <a
              href="#"
              target="_blank"
              className="p-2 px-12 pt-1 font-bold text-white bg-gradient-to-r from-purple-900 via-purple-700 to-purple-900 rounded-xl baseline"
            >
              Slackmojis
            </a>
            <a
              href="#"
              target="_blank"
              className="p-2 px-12 pt-1 font-bold text-white bg-gradient-to-r from-purple-900 via-purple-700 to-purple-900 rounded-xl baseline"
            >
              Cool links 1
            </a>
            <a
              href="#"
              target="_blank"
              className="p-2 px-12 pt-1 font-bold text-white bg-gradient-to-r from-purple-900 via-purple-700 to-purple-900 rounded-xl baseline"
            >
              Cool links 2
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
